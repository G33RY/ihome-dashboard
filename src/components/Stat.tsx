import Icon, {IconProps} from "./Icon.js";



interface StatProps {
    title: string;
    value?: number|string|null;
    desc: string;
    icon: IconProps['name'];
}

function Stat({title, value, desc, icon}: StatProps) {

    return (
        <div class="stat">
            <div class="stat-figure text-primary">
                <Icon name={icon} />
            </div>
            <div class="stat-title text-sm">{title}</div>
            <div class="stat-value text-xl">
                {value ?? '-'}
            </div>
            <div class="stat-desc text-xs">{desc}</div>
        </div>
    )
}

export default Stat
