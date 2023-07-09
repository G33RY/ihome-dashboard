import {createSignal, For} from "solid-js";
import Stat from "../components/Stat";
import Icon, {IconProps} from "~/components/Icon";
import Shortcut from "~/components/Shortcut";
import {SHORTCUT_ACTIONS} from "~/shortcuts";


interface ShortcutsStats {
    className?: string;
}




export default function Shortcuts({className = ""}: ShortcutsStats) {


    return (<>
        <div class={`flex flex-col gap-8 justify-center ${className}`}>
            <For each={SHORTCUT_ACTIONS}>
                {({title, icon, actions}) => (
                    <div class="flex flex-col gap-4">
                        <h3 class="text-xl font-bold gap-2 flex items-center justify-center">
                            <Icon name={icon} className={"text-primary"} />
                            {title}
                        </h3>
                        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
                            <For each={actions}>
                                {({title, file, icon, action}) => (
                                    <Shortcut title={title} file={file} icon={icon} onClick={action} />
                                )}
                            </For>
                        </div>
                    </div>
                )}
            </For>
        </div>
    </>)
}

