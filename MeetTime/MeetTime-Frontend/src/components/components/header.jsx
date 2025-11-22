import { LogoBesar } from "@/assets"

export default function Header(){
    return(
        <header className="min-h-[60px] flex items-center fixed w-full flex justify-between px-10">
            <img src={LogoBesar} alt="Logo Meet Time" width={'400px'}/>
            <div className="bg-[var(--warna-netral-abu)] px-8 text-center font-semibold rounded-xl text-gray-900 cursor-pointer select-none">
                <h1>Doni Rivaldo Simamora</h1>
                <h1>241401037</h1>
            </div>
        </header>
    );
}