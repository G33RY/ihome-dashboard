import {createSignal} from "solid-js";
import Stat from "../components/Stat";
import Icon from "~/components/Icon";


interface StatsState {
    cpuTemp: number;
    fanSpeed: number;
    powerConsumption: number;
    cpuUsage: number;
    memoryUsage: number;
    torrentsDownloading: number;
    torrentsSeeding: number;
    torrentsError: number;
    containersRunning: number;
    containersMemoryUsage: number;
}

function Stats() {

    const [stats] = createSignal<StatsState>({
        cpuTemp: 23,
        fanSpeed: 31,
        powerConsumption: 71,
        cpuUsage: 12,
        memoryUsage: 3.6,
        torrentsDownloading: 2,
        torrentsSeeding: 1,
        torrentsError: 0,
        containersRunning: 20,
        containersMemoryUsage: 3.2,
    });

    return (<>
        <div class="gap-2  flex justify-center w-full pl-6 items-center text-base-content/30 mt-5">
            <Icon name={"server"} />
            <h6 class="m-0">System Stats</h6>
        </div>
        <div class="stats stats-vertical md:stats-horizontal">
            <Stat title={"CPU Temp"} value={stats().cpuTemp} icon={"temperature-three-quarters"} desc={"Degrees (°C)"} />
            <Stat title={"Fan Speed"} value={stats().fanSpeed} icon={"fan"} desc={"Percentage (%)"} />
            <Stat title={"Power Consumption"} value={stats().powerConsumption} icon={"bolt"} desc={"Watts (W)"} />
            <Stat title={"CPU Usage"} value={stats().cpuUsage} icon={"microchip"} desc={"Percentage (%)"} />
            <Stat title={"Memory Usage"} value={stats().memoryUsage} icon={"memory"} desc={"Gigabytes (GB)"} />
        </div>
        <div class="gap-2  flex justify-center w-full pl-6 items-center text-base-content/30 mt-5">
            <Icon name={"download"} />
            <h6 class="m-0">Torrent Stats</h6>
        </div>
        <div class="stats stats-vertical md:stats-horizontal">
            <Stat title={"Torrents Downloading"} value={stats().torrentsDownloading} icon={"download"} desc={""} />
            <Stat title={"Torrents Seeding"} value={stats().torrentsSeeding} icon={"upload"} desc={""} />
            <Stat title={"Torrents Paused"} value={stats().torrentsSeeding} icon={"pause"} desc={""} />
            <Stat title={"Torrents Errored"} value={stats().torrentsError} icon={"circle-exclamation"} desc={""} />
        </div>
        <div class="gap-2  flex justify-center w-full pl-6 items-center text-base-content/30 mt-5">
            <Icon name={"docker"} prefix={"fab"} />
            <h6 class="m-0">Docker Stats</h6>
        </div>
        <div class="stats stats-vertical md:stats-horizontal">
            <Stat title={"Containers Running"} value={stats().containersRunning} icon={"box"} desc={""} />
            <Stat title={"Containers Memory Usage"} value={stats().containersMemoryUsage} icon={"memory"} desc={"Gigabytes (GB)"} />
        </div>
    </>)
}

export default Stats
