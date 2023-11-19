
import { Logo } from "./logo"


export const Header = ()=>{

    return (
        <header className="bg-white flex justify-between p-3 border-2">
            <Logo/>
            {/* <AvatarMenu/> */}
        </header>
    )
}