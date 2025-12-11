import { UserPlusIcon, CheckIcon, UserIcon, MagnifyingGlassIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGroup } from '../../hooks/useGroup';
import { useDebounce } from '../../hooks/useDebounce'; 
import { KembaliDashboard, InputBox } from '../../components/components/GlobalComponents';

export function AddMemberGrup() {
    const { groupId } = useParams(); 
    const navigate = useNavigate();
    
    const {
        addMember,
        fetchMembers,
        groupMembers,
        searchCandidate,
        searchResults,
        clearSearch,
        loading
    } = useGroup();

    const [nim, setNim] = useState("");
    const debouncedNim = useDebounce(nim, 500);

    useEffect(() => {
        if (groupId) fetchMembers(groupId);
    }, [groupId, fetchMembers]);

    useEffect(() => {
        if (debouncedNim) {
            searchCandidate(debouncedNim);
        } else {
            clearSearch();
        }
    }, [debouncedNim]);

    const handleAdd = async (targetNim) => {
        const success = await addMember(groupId, targetNim);
        if (success) {
            setNim("");
            clearSearch();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-10">
            <div className="flex flex-col gap-2">
                <KembaliDashboard 
                    judul="Tambah Anggota" 
                    keterangan="Cari dan undang mahasiswa ke dalam grup anda."
                />
            </div>

            <section className="bg-netral-putih rounded-3xl p-6 md:p-8 shadow-lg border border-base-200 relative z-20 overflow-visible">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <UserPlusIcon className="size-6" />
                    </div>
                    <h2 className="text-lg font-bold text-utama">Cari Mahasiswa</h2>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="relative"> 
                    <InputBox 
                        variant="bold"
                        judul="NIM / Nama"
                        name="nim"
                        placeholder="Ketik NIM atau Nama Mahasiswa..."
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                        autoComplete="off"
                        autoFocus
                    />
                    <div className="absolute right-4 top-[42px] text-neutral/40 pointer-events-none">
                        {loading ? <span className="loading loading-spinner loading-xs"></span> : <MagnifyingGlassIcon className="size-5"/>}
                    </div>
                </form>

                {nim && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-xs font-bold text-neutral/50 uppercase tracking-wider mb-3 ml-1">
                            Hasil Pencarian
                        </p>

                        {searchResults.length === 0 ? (
                            <div className="text-center py-8 text-neutral/50 bg-base-400/30 rounded-xl border border-dashed border-base-200">
                                <p className="italic text-sm">Tidak ditemukan mahasiswa dengan kata kunci "{nim}"</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                {searchResults.map((user) => {
                                    const isAlreadyMember = groupMembers.some(m => m.nim === user.nim);

                                    return (
                                        <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-base-200 p-4 rounded-xl hover:border-primary/50 hover:shadow-md transition-all gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-base-200 p-3 rounded-full text-neutral/60">
                                                    <UserIcon className="size-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-utama text-base md:text-lg leading-tight">
                                                        {user.name}
                                                    </span>
                                                    <span className="text-xs font-semibold text-primary mb-0.5">
                                                        {user.jurusan}
                                                    </span>
                                                    <span className="text-sm font-medium text-neutral/60">
                                                        {user.nim}
                                                    </span>
                                                </div>
                                            </div>

                                            {isAlreadyMember ? (
                                                <span className="flex items-center justify-center gap-1 text-success bg-success/10 px-4 py-2 rounded-xl text-sm font-bold border border-success/20 select-none w-full sm:w-auto">
                                                    <CheckIcon className="size-5" />
                                                    Anggota
                                                </span>
                                            ) : (
                                                <button 
                                                    onClick={() => handleAdd(user.nim)}
                                                    disabled={loading}
                                                    className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20 w-full sm:w-auto"
                                                >
                                                    {loading ? (
                                                        <span className="loading loading-spinner loading-xs"></span>
                                                    ) : (
                                                        <UserPlusIcon className="size-4" />
                                                    )}
                                                    Undang
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </section>

            <section className="bg-netral-putih rounded-3xl p-6 shadow-lg border border-base-200 relative z-10 flex flex-col min-h-[300px]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-base-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                            <UserGroupIcon className="size-6" />
                        </div>
                        <h2 className="text-lg font-bold text-utama">Anggota Grup</h2>
                    </div>
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-bold">
                        {groupMembers.length} Orang
                    </span>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px] pr-1 hide-scrollbar">
                    {groupMembers.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-40 text-neutral/40">
                            <UserGroupIcon className="size-10 mb-2 opacity-30"/>
                            <p className="italic text-sm">Belum ada anggota yang bergabung.</p>
                        </div>
                    )}
                    
                    {groupMembers.map((member) => (
                        <div key={member.id} className="group flex justify-between items-center p-3 rounded-xl bg-base-400/30 transition-colors border border-base-200">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full flex items-center justify-center text-sm font-bold bg-white transition-colors border border-base-200 text-utama">
                                    {member.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-custom-text text-sm md:text-base">
                                        {member.name}
                                    </span>
                                    <div className="flex flex-col md:flex-row md:gap-2 md:items-center text-xs text-neutral/50">
                                        <span className="font-semibold text-secondary/80">{member.jurusan}</span>
                                        <span className="hidden md:inline">•</span>
                                        <span>{member.nim}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-4 border-t border-base-200 flex justify-end">
                    <button 
                        onClick={() => navigate(`/groups/${groupId}`)}
                        className="w-full md:w-auto bg-utama hover:bg-neutral text-white font-bold text-base px-10 py-3 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <CheckIcon className="size-5" />
                        Selesai & Lihat Grup 
                    </button>
                </div>
            </section>

        </div>
    );
}