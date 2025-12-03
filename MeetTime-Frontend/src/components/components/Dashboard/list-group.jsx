import { ArrowRightIcon, UserGroupIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { useGroup } from '../../../hooks/useGroup';
import { InputBox } from '../../components/GlobalComponents'; 

export function ListGroup() {
    const { myGroups, loading, joinGroup } = useGroup();
    const safeGroups = Array.isArray(myGroups) ? myGroups : [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [kodeUndangan, setKodeUndangan] = useState("");
    const [isJoining, setIsJoining] = useState(false);

    const formatRole = (role) => {
        if (!role || typeof role !== 'string') return '-';
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    const handleJoinSubmit = async (e) => {
        e.preventDefault();
        if (!kodeUndangan) return;

        setIsJoining(true);
        try {
            const success = await joinGroup(kodeUndangan); 
            
            if (success) {
                setKodeUndangan("");
                setIsModalOpen(false);
                toast.success("Berhasil bergabung ke grup!");
            }
        } catch (err) {
            toast.error("Gagal bergabung. Cek kode undangan.");
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <>
            <section className="h-full w-full bg-netral-putih rounded-3xl p-6 shadow-lg border border-base-200 flex flex-col relative overflow-hidden">
                
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-utama tracking-tight">Grup Saya</h2>
                        <p className="text-xs text-neutral/60 font-medium">Daftar tim & kolaborasi</p>
                    </div>
                    
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold group"
                    >
                        <PlusCircleIcon className="size-5" />
                        <span className="hidden md:inline">Gabung</span>
                    </button>
                </div>

                <section className='flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-3'>
                    
                    {loading && (
                        <div className="flex flex-col items-center justify-center h-full text-neutral/40 animate-pulse">
                            <span className="loading loading-spinner loading-md mb-2"></span>
                            <p className="text-xs font-medium">Menyinkronkan data...</p>
                        </div>
                    )}

                    {!loading && safeGroups.length > 0 && (
                        safeGroups.map((item, index) => (
                            <Link key={item?.id || index} to={`/pages/groups/${item?.id}`}>
                                <div className="group w-full p-4 rounded-xl border border-transparent bg-base-400/30 cursor-pointer transition-all duration-300 ease-out
                                    hover:bg-white hover:border-primary/20 hover:shadow-md hover:scale-[1.01]">
                                    
                                    <div className="flex justify-between items-center">
                                        <div className='flex flex-col gap-1'>
                                            <h3 className="font-bold text-base text-custom-text line-clamp-1 group-hover:text-primary transition-colors">
                                                {item?.nama_group || "Tanpa Nama"}
                                            </h3>
                                            
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider
                                                    ${item?.role === 'admin' 
                                                        ? 'bg-orange-100 text-orange-600 border border-orange-200' 
                                                        : 'bg-blue-100 text-blue-600 border border-blue-200'
                                                    }`}>
                                                    {formatRole(item?.role)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <ArrowRightIcon className="size-5 text-neutral/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}

                    {!loading && safeGroups.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-base-200 rounded-xl bg-base-100/20 p-6">
                            <div className="p-3 bg-base-200 rounded-full mb-3">
                                <UserGroupIcon className="size-8 text-base-200"/>
                            </div>
                            <p className="font-bold text-sm text-neutral/80">Belum ada grup</p>
                            <p className="text-xs text-neutral/50 mb-4 max-w-[200px]">
                                Bergabunglah dengan grup temanmu untuk mulai mengatur jadwal.
                            </p>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="text-xs font-bold text-primary hover:underline underline-offset-2"
                            >
                                Gabung Sekarang
                            </button>
                        </div>
                    )}
                </section>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-utama/60 backdrop-blur-sm p-4 transition-all duration-300">
                    <div className="bg-netral-putih rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 animate-in fade-in zoom-in duration-200 border border-white/20">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-utama">Gabung Grup</h3>
                                <p className="text-sm text-neutral/60">Masukkan kode undangan yang valid.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-base-200 text-neutral/60 hover:text-error transition-colors">
                                <XMarkIcon className="size-6" />
                            </button>
                        </div>

                        <form onSubmit={handleJoinSubmit}>
                            <div className="mb-6">
                                <InputBox 
                                    variant="bold"
                                    judul="Kode Undangan"
                                    placeholder="Contoh: 550e8400-e29b..."
                                    value={kodeUndangan}
                                    onChange={(e) => setKodeUndangan(e.target.value)}
                                    autoFocus
                                />
                                <p className="text-xs text-neutral/50 mt-2 italic">
                                    *Pastikan kode yang anda masukkan benar.
                                </p>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-semibold text-neutral/70 bg-base-200 rounded-xl hover:bg-base-300 transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isJoining || !kodeUndangan}
                                    className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 flex items-center gap-2 transition-all"
                                >
                                    {isJoining && <span className="loading loading-spinner loading-xs"></span>}
                                    {isJoining ? "Memproses..." : "Gabung Grup"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}