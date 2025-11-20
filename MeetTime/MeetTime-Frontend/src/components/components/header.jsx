import { LogoBesar } from "@/assets"

export default function Header(){
    return(
        <header className="min-h-[60px] flex items-center">
            <img src={LogoBesar} alt="Logo Meet Time" height={"100px"}/>
            <h1>Ini adalah header</h1>
        </header>
    );
}