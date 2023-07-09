import Icon, {IconProps} from "./Icon.js";



interface StatProps {
    title: string;
    value?: number|string|null;
    desc: string;
    icon: IconProps['name'];
}

function Stat(props: StatProps) {

    return (
        <div class="stat">
            <div class="stat-figure text-primary">
                <Icon name={props.icon} />
            </div>
            <div class="stat-title text-sm">{props.title}</div>
            <div class="stat-value text-xl">
                {props.value ?? '-'}
            </div>
            <div class="stat-desc text-xs">{props.desc}</div>
        </div>
    )
}

export default Stat
