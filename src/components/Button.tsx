import Icon, {IconProps} from './Icon';
import {JSX} from "solid-js";



export type ButtonProps = {
    type?: 'button'|'submit',
    color?: 'neutral'|'primary'|'secondary'|'accent'|'info'|'success'|'warning'|'error'|'ghost'|'link'|'outline'|'transparent',
    size?: 'lg'|'md'|'sm'|'xs',
    title?: string,
    text?: string,
    icon?: (IconProps & {
        align?: 'left'|'right',
    }) | IconProps['name'],
    className?: string,
    processing?: boolean,
    disabled?: boolean,
    onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>,
    onMouseDown?: JSX.EventHandler<HTMLButtonElement, MouseEvent>,
    noStyle?: boolean,
    style?: JSX.CSSProperties,
    ariaLabel?: string,
}


export default function Button({
    type = 'button', color="primary", size="md", title="", text="",
    icon, className = '', processing = false, disabled = false, onClick, noStyle = false, style, onMouseDown, ariaLabel
}: ButtonProps) {
    let iconAlign = 'left';
    let iconProps: IconProps|null = null;

    if (icon && typeof icon === 'string') {
        iconProps = {name: icon};
    }
    else {
        iconProps = icon ?? null;
        iconAlign = icon?.align ?? 'left';
    }
    return (
        <>
            <button
                type={type}
                class={noStyle ? `${className} relative` :  `
                        btn gap-2 whitespace-nowrap
                        ${color == "primary" ? 'btn-primary': ''}
                        ${color == "secondary" ? 'btn-secondary': ''}
                        ${color == "accent" ? 'btn-accent': ''}
                        ${color == "info" ? 'btn-info': ''}
                        ${color == "success" ? 'btn-success': ''}
                        ${color == "warning" ? 'btn-warning': ''}
                        ${color == "error" ? 'btn-error': ''}
                        ${color == "ghost" ? 'btn-ghost': ''}
                        ${color == "link" ? 'btn-link': ''}
                        ${color == "outline" ? 'btn-outline': ''}
                        ${color == "transparent" ? 'btn-ghost hover:bg-transparent': ''}
                        ${size == "lg" ? 'btn-lg': ''}
                        ${size == "md" ? 'btn-md': ''}
                        ${size == "sm" ? 'btn-sm': ''}
                        ${size == "xs" ? 'btn-xs': ''}
                        ${processing ? 'loading': ''}
                        ${disabled ? 'btn-disabled': ''}
                        ${className}
                        relative
                    `}
                onClick={processing || disabled ? undefined: onClick }
                onMouseDown={processing || disabled ? undefined: onMouseDown}
                style={style}
                aria-label={ariaLabel ?? title ?? text}
            >
                {iconAlign == "left" && iconProps &&! processing && <Icon {...iconProps} />}
                {!processing && text && <span>{text}</span>}
                {iconAlign == "right" && iconProps && !processing && <Icon {...iconProps} />}
            </button>
        </>
    );
}
