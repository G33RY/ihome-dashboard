import server$ from 'solid-start/server'
import axios from "axios";
import * as https from "https";
import * as repl from "repl";
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
    const [cpuTemp, fanSpeed, powerConsumption] = await Promise.all([
        getCpuTemp(),
        getFanSpeed(),
        getPowerConsumption()
    ])

    return {
        cpuTemp,
        fanSpeed,
        powerConsumption,
    }
});


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


