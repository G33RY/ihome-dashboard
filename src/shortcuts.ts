import {IconProps} from "~/components/Icon";

interface ShortcutAction {
    file?: string;
    icon?: IconProps['name'];
    title: string;
    action: () => void;
}

interface ShortcutCategory {
    title: string;
    icon?: IconProps['name'];
    actions: ShortcutAction[];
}

export const SHORTCUT_ACTIONS: ShortcutCategory[] = [
    {
        title: "General",
        icon: "home",
        actions: [
            {
                title: "nCore",
                file: "/icons/ncore.png",
                action: () => {
                    let form = window.document.createElement("form")
                    form.setAttribute("method", "post")
                    form.setAttribute("action", "https://ncore.pro/login.php")
                    form.setAttribute("target", "_blank")
                    let input = window.document.createElement("input")
                    input.setAttribute("type", "hidden")
                    input.setAttribute("name", "nev")
                    input.setAttribute("value", "G33RY")
                    form.appendChild(input)
                    input = window.document.createElement("input")
                    input.setAttribute("type", "hidden")
                    input.setAttribute("name", "pass")
                    input.setAttribute("value", "pemnuv-wufbA0-wacdoh")
                    form.appendChild(input)
                    window.document.body.appendChild(form)
                    form.submit()
                    window.document.body.removeChild(form)
                }
            },
            {
                title: "Home Assistant",
                file: "/icons/ha.png",
                action: () => {
                    window.open("http://192.168.0.5:8123")
                }
            },
        ]
    },
    {
        title: "Home Theater",
        icon: "tv",
        actions: [
            {
                title: "Plex",
                file: "/icons/plex.png",
                action: () => {
                    window.open("http://plex.ihome/")
                }
            },
            {
                title: "Radarr",
                file: "/icons/radarr.png",
                action: () => {
                    window.open("http://radarr.ihome")
                }
            },
            {
                title: "Sonarr",
                file: "/icons/sonarr.png",
                action: () => {
                    window.open("http://sonarr.ihome")
                }
            },
            {
                title: "Transmission",
                file: "/icons/transmission.png",
                action: () => {
                    window.open("http://torrent.ihome/")
                }
            },
        ]
    },
    {
        title: "System",
        icon: "server",
        actions: [
            {
                title: "iLO",
                file: "/icons/hp.png",
                action: () => {
                    window.open("http://ilo.ihome/")
                }
            },
            {
                title: "Proxmox",
                file: "/icons/proxmox.png",
                action: () => {
                    window.open("http://192.168.0.6:8006/")
                }
            },
            {
                title: "Portainer",
                file: "/icons/docker.png",
                action: () => {
                    window.open("https://192.168.0.5:9443")
                }
            },
            {
                title: "Nginx Manager",
                file: "/icons/nginx.png",
                action: () => {
                    window.open("http://nginx.ihome/")
                }
            },
            {
                title: "PiHole",
                file: "/icons/pihole.png",
                action: () => {
                    window.open("http://pihole.ihome/")
                }
            },
        ]
    },
]