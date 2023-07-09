import server$ from 'solid-start/server'
import axios from "axios";
import * as https from "https";
import {proxmoxApi} from "~/proxmoxApi";
import {Transmission} from "kkito-transmission-rpc";
import * as process from "process";


export interface StatsState {
    cpuTemp?: number;
    fanSpeed?: number;
    powerConsumption?: number;
    cpuUsage?: number;
    memoryUsage?: number;
    torrentsDownloading?: number;
    torrentsSeeding?: number;
    torrentsError?: number;
    containersRunning?: number;
    containersMemoryUsage?: number;
}



export const getStats = server$(async (): Promise<StatsState> => {
    const [
        cpuTemp,
        fanSpeed,
        powerConsumption,
        [cpuUsage, memoryUsage],
        [torrentsDownloading, torrentsSeeding, torrentsError],
        [containersRunning, containersMemoryUsage]
    ] = await Promise.all([
        getCpuTemp(),
        getFanSpeed(),
        getPowerConsumption(),
        getNodeCpuUsageAndMemoryUsage(),
        getTorrentStats(),
        getContainersStats(),
    ])

    return {
        cpuTemp,
        fanSpeed,
        powerConsumption,
        cpuUsage,
        memoryUsage,
        torrentsDownloading,
        torrentsSeeding,
        torrentsError,
        containersRunning,
        containersMemoryUsage
    }
});

async function getNodeCpuUsageAndMemoryUsage(): Promise<[number|undefined, number|undefined]> {
    //@ts-ignore
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

    const promox = proxmoxApi({
        host: process.env.PROXMOX_IP ?? '',
        tokenID: process.env.PROXMOX_TOKENID ?? '',
        tokenSecret: process.env.PROXMOX_SECRET ?? '',
        port: Number(process.env.PROXMOX_PORT ?? 8006),
    })

    const node = promox.nodes.$(process.env.PROXMOX_NODE ?? '')
    try{
        const info = await node.status.$get()
        const cpuUsage = Math.round(info.cpu * 1000) / 10
        const memoryUsage = Math.round(info.memory.used / Math.pow(1024, 3) * 10) / 10
        return [cpuUsage, memoryUsage]
    }catch (e) {
        return [undefined, undefined]
    }
}

async function getCpuTemp(): Promise<number | undefined> {
    const response = await callILO("/json/health_temperature")
    if(!response) {
        return undefined
    }


    let cpuTemps: number[] = []

    for (const t of response.temperature) {
        if(!t?.currentreading || !t?.location) {
            continue
        }
        if(t?.location == "CPU") {
            cpuTemps.push(t.currentreading)
        }
    }

    return Math.max(...cpuTemps)
}

async function getFanSpeed(): Promise<number | undefined> {
    const response = await callILO("/json/health_fans")
    if(!response) {
        return undefined
    }


    let fanSpeeds: number[] = []

    for (const f of response.fans) {
        fanSpeeds.push(f.speed)
    }

    return Math.round(fanSpeeds.reduce((a, b) => a + b, 0) / fanSpeeds.length)
}

async function getPowerConsumption(): Promise<number | undefined> {
    const response = await callILO("/json/power_summary")
    if(!response) {
        return undefined
    }

    return response.last_5min_avg
}

async function getTorrentStats(): Promise<[number|undefined, number|undefined, number|undefined]> {
    const transmission = new Transmission({
        host: process.env.TRANSMISSION_IP ?? '',
        port: Number(process.env.TRANSMISSION_PORT ?? 9091),
        auth: {
            username: process.env.TRANSMISSION_USERNAME ?? '',
            password: process.env.TRANSMISSION_PASSWORD ?? '',
        }
    })
    let torrents = await transmission.getTorrents()
    if(!torrents) {
        return [undefined, undefined, undefined]
    }

    let torrentsDownloading = 0
    let torrentsSeeding = 0
    let torrentsError = 0

    for (const torrent of torrents) {
        if(!torrent.percentDone) continue
        if(torrent.percentDone == 1) {
            torrentsSeeding++
        }
        else if(torrent.percentDone < 1) {
            torrentsDownloading++
        }

        if(torrent.rateDownload == 0 && torrent.rateUpload == 0 && torrent.percentDone < 1 && torrent.percentDone > 0) {
            torrentsError++
        }
    }

    return [torrentsDownloading, torrentsSeeding, torrentsError]
}

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});
async function callILO(path: string, method: string = "GET", data?: any) {
    const url = `${process.env.ILO_URL}${path}`
    const response = await axios({
        method, url, data,
        httpsAgent,
        timeout: 2000,
        auth: {
            username: process.env.ILO_USERNAME ?? '',
            password: process.env.ILO_PASSWORD ?? '',
        },
        headers: {
            "Content-Type": "application/json",
            "OData-Version": "4.0",
        }
    }).catch((e) => {
        console.error(`Failed to call iLO at ${url}`, JSON.stringify(e.response?.data ?? e.response))
        return null
    });
    if (!response) {
        return null
    }

    return response?.data
}

async function getPortainerToken() {
    const portainerToken = process.env.PORTAINER_TOKEN
    const portainerTokenUpdated = Number(process.env.PORTAINER_TOKEN_UPDATED)

    if (portainerToken && portainerTokenUpdated && (portainerTokenUpdated + 1000 * 60 * 5) > new Date().getTime()) {
        return portainerToken
    }

    console.log("Getting new portainer token")

    const response = await axios({
        method: "post",
        timeout: 2000,
        url: `${process.env.PORTAINER_URL}/api/auth`,
        data: {
            username: process.env.PORTAINER_USERNAME ?? '',
            password: process.env.PORTAINER_PASSWORD ?? '',
        },
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((e) => {
        console.error(`Failed to get portainer token`, JSON.stringify(e.response?.data ?? e.response))
        return null
    });

    if (!response) return null

    process.env["PORTAINER_TOKEN"] = response.data.jwt
    process.env["PORTAINER_TOKEN_UPDATED"] = new Date().getTime() + ""
    return portainerToken
}
async function getContainersStats(): Promise<[number | undefined, number | undefined]> {
    const token = await getPortainerToken()
    if (!token) {
        return [undefined, undefined]
    }

    const response = await axios({
        method: "GET",
        url: `${process.env.PORTAINER_URL}/api/endpoints`,
        timeout: 2000,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }).catch((e) => {
        console.log(e)
        console.error(`Failed to get portainer containers`, JSON.stringify(e.response?.data ?? e.response))
        return null
    });
    if (!response) {
        return [undefined, undefined]
    }

    let containersRunning = 0
    let containersMemoryUsage = 0
    for (const endpoint of response.data) {
        let runningContainerCount = endpoint.Snapshots?.[0]?.RunningContainerCount
        if (!runningContainerCount) continue

        containersRunning += runningContainerCount
        const containers = endpoint.Snapshots?.[0]?.DockerSnapshotRaw?.Containers
        if (!containers) continue


        let memoryUsagePromises: Promise<number | undefined>[] = []

        for (const container of containers) {
            memoryUsagePromises.push(getContainerMemoryUsage(endpoint.Id, container.Id))
        }

        const memoryUsages = await Promise.all(memoryUsagePromises)
        for (const memoryUsage of memoryUsages) {
            if(memoryUsage) {
                containersMemoryUsage += memoryUsage
            }
        }

    }

    return [containersRunning, Math.round(containersMemoryUsage * 10) / 10]
}

async function getContainerMemoryUsage(nodeId: string, id: string): Promise<number | undefined> {
    const token = await getPortainerToken()
    if (!token) {
        return undefined
    }

    const response = await axios({
        method: "GET",
        timeout: 3000,
        url: `${process.env.PORTAINER_URL}/api/endpoints/${nodeId}/docker/containers/${id}/stats?stream=false`,
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }).catch((e) => {
        console.log(e)
        console.error(`Failed to get portainer containers`, JSON.stringify(e.response?.data ?? e.response))
        return null
    });
    if (!response) {
        return undefined
    }

    return response.data.memory_stats.usage / 1024 / 1024 / 1024
}


