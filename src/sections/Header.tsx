

interface HeaderProps {
    class?: string;
}
function Header(props: HeaderProps) {
    return (
        <div class={`${props.class ?? ''} text-center`}>
            <h1 class="text-5xl font-bold">
                <span class="text-primary">i</span>
                Home
            </h1>
            <h2 class={"text-xl text-primary"}>
                Dashboard
            </h2>
        </div>
    )
}

export default Header
