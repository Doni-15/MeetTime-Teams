import { LogoBesar } from "@/assets"
import { useState, useEffect } from "react";
import { DetailUser } from '@/components'

export default function Header({ user, setUser }){
    const [open, setOpen] = useState(false);
    const [nama, setNama] = useState("");

    const maxNama = 22;

    useEffect(() => {
        if (user?.name) {
            setNama(user.name.length > maxNama 
                ? user.name.slice(0, maxNama) + "..." 
                : user.name
            );
        }
    }, [user]);

    return(
        <>
            <header className="min-h-[60px] flex items-center fixed w-full justify-between px-10 z-50">
                <img src={LogoBesar} alt="Logo Meet Time" width={'400px'}/>
                <div 
                    onClick={() => setOpen(!open)} 
                    className="bg-[var(--warna-netral-putih)] w-70 px-8 text-center font-semibold rounded-xl text-gray-900 cursor-pointer select-none"
                >
                    
                    <h1 className="text-lg/6 pt-1">{nama|| "Memuat Nama..."}</h1>
                    <h1 className="text-base/6 pb-1 text-gray-700">{user?.nim || "Memuat NIM..."}</h1>
                </div>
            </header>
            
            <DetailUser user={user} setUser={setUser} isOpen={open} />
        </>
    );
}