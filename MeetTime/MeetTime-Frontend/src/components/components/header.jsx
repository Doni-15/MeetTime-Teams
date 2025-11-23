import { LogoBesar } from "@/assets"

export default function Header({ user }){
    return( 
        <header className="min-h-[60px] flex items-center fixed w-full flex justify-between px-10">
            <img src={LogoBesar} alt="Logo Meet Time" width={'400px'}/>
            <div className="bg-[var(--warna-netral-abu)] px-8 text-center font-semibold rounded-xl text-gray-900 cursor-pointer select-none">
                <h1>{user?.name || "Memuat Nama..."}</h1>
                <h1>{user?.nim || "Memuat NIM..."}</h1>
            </div>
        </header>
    );
}