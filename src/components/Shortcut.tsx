import {createSignal} from "solid-js";
import Stat from "./Stat.js";
import Icon, {IconProps} from "~/components/Icon";
import Button from "~/components/Button";


interface ShortcutProps {
    icon?: IconProps['name'];
    file?: string;
    title: string;
    onClick: () => void;
}

export default function Shortcut({icon, file, title, onClick}: ShortcutProps) {

    return (<>
        <button class="btn btn-primary btn-outline btn-lg " onclick={onClick}>
            {icon && <Icon name={icon} className={""}/>}
            {file && <img src={file} alt={title} class="w-8" />}
            <div class="text-sm">{title}</div>
        </button>
    </>)
}

