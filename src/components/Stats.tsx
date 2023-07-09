import {createSignal} from "solid-js";
import Stat from "./Stat.tsx";


interface StatsState {
    cpuTemp: number;
    fanSpeed: number;
    powerConsumption: number;
}

function Stats() {

    const [stats] = createSignal<StatsState>({
        cpuTemp: 23,
        fanSpeed: 31,
        powerConsumption: 71,
    });

    return (
        <div class="stats">
            <Stat title={"CPU Temp"} value={stats().cpuTemp} icon={"microchip"} desc={"Degrees (°C)"} />
            <Stat title={"Fan Speed"} value={stats().fanSpeed} icon={"fan"} desc={"Percentage (%)"} />
            <Stat title={"Power Consumption"} value={stats().powerConsumption} icon={"bolt"} desc={"Watts (W)"} />
            <Stat title={"Power Consumption"} value={stats().powerConsumption} icon={"bolt"} desc={"Watts (W)"} />
        </div>
    )
}

export default Stats
