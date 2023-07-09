import {SizeProp} from '@fortawesome/fontawesome-svg-core';
import SolidIcons from '@fortawesome/free-solid-svg-icons';
import RegularIcons from '@fortawesome/free-regular-svg-icons';
import BrandIcons from '@fortawesome/free-brands-svg-icons';
import {JSX} from "solid-js";




export type IconProps = Omit<JSX.HTMLAttributes<HTMLElement>, "class"> & {
    name?: SolidIcons.IconName & BrandIcons.IconName & RegularIcons.IconName,
    size?: SizeProp,
    prefix?: 'fas'|'fab'|'far',
    className?: string,
}


export default function Icon({ name, prefix = 'fas', size = "1x", className = "", ...props } : IconProps) {
    return (
        <i
            class={`${prefix} fa-${name} fa-${size} ${className}`}
            {...props}
        />
    );
}
