import {createSignal} from "solid-js";
import Stat from "../components/Stat";
import Icon from "~/components/Icon";
import {StatsState} from "~/services/stats";





interface StatsProps {
    stats: StatsState;
}
function Stats(props: StatsProps) {


    return (<>
        <div class="gap-2  flex justify-center w-full pl-6 items-center text-base-content/30 mt-5">
            <Icon name={"server"} />
            <h6 class="m-0">System Stats </h6>
        </div>
        <div class="stats stats-vertical md:stats-horizontal">
            <Stat title={"CPU Temp"} value={props.stats.cpuTemp} icon={"temperature-three-quarters"} desc={"Degrees (°C)"} />
            <Stat title={"Fan Speed"} value={props.stats.fanSpeed} icon={"fan"} desc={"Percentage (%)"}  />
            <Stat title={"Power Consumption"} value={props.stats.powerConsumption} icon={"bolt"} desc={"Watts (W)"} />
            <Stat title={"CPU Usage"} value={props.stats.cpuUsage} icon={"microchip"} desc={"Percentage (%)"} />
            <Stat title={"Memory Usage"} value={props.stats.memoryUsage} icon={"memory"} desc={"Gigabytes (GB)"} />
        </div>
        <div class="gap-2  flex justify-center w-full pl-6 items-center text-base-content/30 mt-5">
            <Icon name={"download"} />
            <h6 class="m-0">Torrent Stats</h6>
        </div>
        <div class="stats stats-vertical md:stats-horizontal">
            <Stat title={"Torrents Downloading"} value={props.stats.torrentsDownloading} icon={"download"} desc={""} />
            <Stat title={"Torrents Seeding"} value={props.stats.torrentsSeeding} icon={"upload"} desc={""} />
            <Stat title={"Torrents Paused"} value={props.stats.torrentsSeeding} icon={"pause"} desc={""} />
            <Stat title={"Torrents Errored"} value={props.stats.torrentsError} icon={"circle-exclamation"} desc={""} />
        </div>
        <div class="gap-2  flex justify-center w-full pl-6 items-center text-base-content/30 mt-5">
            <Icon name={"docker"} prefix={"fab"} />
            <h6 class="m-0">Docker Stats</h6>
        </div>
        <div class="stats stats-vertical md:stats-horizontal">
            <Stat title={"Containers Running"} value={props.stats.containersRunning} icon={"box"} desc={""} />
            <Stat title={"Containers Memory Usage"} value={props.stats.containersMemoryUsage} icon={"memory"} desc={"Gigabytes (GB)"} />
        </div>
    </>)
}

export default Stats
