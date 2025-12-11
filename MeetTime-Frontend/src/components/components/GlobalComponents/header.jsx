import { LogoBesar } from "../../../assets";
import { useState, useEffect, useRef } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

import { useAgenda } from "@/hooks/useAgenda"; 
import { DetailUser } from "./detail-user";
import { NotificationList } from "./NotificationDropdown";

export default function Header({ user, setUser }) {
    const [openUser, setOpenUser] = useState(false);
    const [openNotif, setOpenNotif] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const prevNotifCount = useRef(0);
    const { deletedHistory, fetchHistory } = useAgenda();
    const [displayList, setDisplayList] = useState([]);

    const [nama, setNama] = useState("");
    const notifRef = useRef(null);
    const maxNama = 22;

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    useEffect(() => {
        setDisplayList(deletedHistory);

        if (deletedHistory.length > prevNotifCount.current) {
            setHasUnread(true);
        }
        prevNotifCount.current = deletedHistory.length;
    }, [deletedHistory]);

    useEffect(() => {
        if (user?.name) {
            setNama(user.name.length > maxNama
                ? user.name.slice(0, maxNama) + "..."
                : user.name
            );
        }
    }, [user]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setOpenNotif(false);
                setOpenUser(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [notifRef]);

    const handleNotifClick = () => {
        setOpenNotif(!openNotif);
        setOpenUser(false);

        if (!openNotif) {
            fetchHistory();
            setHasUnread(false);
        }
    };

    const handleDeleteItem = (id) => {
        setDisplayList(prev => prev.filter(item => item.id !== id));
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 w-full h-[80px] bg-utama shadow-md px-4 md:px-8 flex items-center justify-between transition-all duration-300">
                <div className="flex-shrink-0">
                    <img src={LogoBesar} alt="Logo Meet Time" className="h-20 w-auto object-contain" />
                </div>

                <div className="flex items-center gap-4 md:gap-6" ref={notifRef}>
                    <div className="relative">
                        <button 
                            onClick={handleNotifClick}
                            className="relative p-2.5 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95 outline-none"
                        >
                            <BellIcon className="size-6 md:size-7" />
                            
                            {hasUnread && displayList.length > 0 && (
                                <span className="absolute top-2 right-2.5 flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error border border-utama"></span>
                                </span>
                            )}
                        </button>
                    </div>

                    <div
                        onClick={() => {
                            setOpenUser(!openUser);
                            setOpenNotif(false);
                        }}
                        className="group flex items-center gap-3 bg-netral-putih px-4 py-2 md:px-6 md:py-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-out select-none"
                    >
                        <div className="flex flex-col text-right">
                            <h1 className="text-sm md:text-base font-bold text-utama leading-tight">
                                {nama || "Memuat..."}
                            </h1>
                            <h2 className="text-xs md:text-sm font-medium text-neutral/60">
                                {user?.nim || "..."}
                            </h2>
                        </div>

                        <div className="flex items-center gap-2 pl-2 border-l border-neutral/20">
                            <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-base-200 flex items-center justify-center text-netral-abu group-hover:bg-primary group-hover:text-white transition-colors">   
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className={`hidden md:block transition-transform duration-300 text-neutral ${openUser ? 'rotate-180' : 'rotate-0'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
            </header>

            <div className="h-[80px] w-full bg-base-400"></div>
            <DetailUser user={user} setUser={setUser} isOpen={openUser} />
            {openNotif && (
                <NotificationList 
                    data={displayList} 
                    onDeleteItem={handleDeleteItem} 
                />
            )}
        </>
    );
}