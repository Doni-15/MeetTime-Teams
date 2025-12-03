import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CalendarDaysIcon, PlusIcon, MagnifyingGlassIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline'; // Ganti ke Outline biar konsisten

import { useGroup } from '../../hooks/useGroup';
import { useDebounce } from '../../hooks/useDebounce';

import { KembaliDashboard } from '../../components/components/GlobalComponents';
import { GroupTabs, MemberCard, ChatContainer } from '../../components/components/GroupPages';

export function GroupsPages() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    
    const { 
        fetchMembers, 
        fetchMyGroups, 
        groupMembers, 
        myGroups, 
        kickMember,
        deleteGroup,
        loading 
    } = useGroup();

    const [activeTab, setActiveTab] = useState('anggota');
    
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (groupId) {
            fetchMembers(groupId);
            fetchMyGroups();
        }
    }, [groupId, fetchMembers, fetchMyGroups]);

    const currentGroup = useMemo(() => {
        return myGroups.find(g => g.id === groupId);
    }, [myGroups, groupId]);

    const namaGrup = currentGroup ? currentGroup.nama_group : "Memuat...";
    const deskripsi = currentGroup ? currentGroup.deskripsi : "Sedang mengambil data grup...";
    const isAdmin = currentGroup?.role === 'admin';

    const filteredMembers = useMemo(() => {
        return groupMembers.filter(member => {
            const query = debouncedSearch.toLowerCase();
            return (
                member.name.toLowerCase().includes(query) ||
                member.nim.toLowerCase().includes(query)
            );
        });
    }, [groupMembers, debouncedSearch]);

    const handleDeleteGroup = () => {
        deleteGroup(groupId, navigate);
    };

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-10">
            <div className="flex flex-col gap-2">
                <KembaliDashboard 
                    judul={namaGrup} 
                    keterangan={deskripsi}
                />
            </div>

            <section className="bg-netral-putih rounded-3xl shadow-xl border border-base-200 overflow-hidden flex flex-col min-h-[600px] relative">
                <div className="border-b border-base-200 bg-white px-6 pt-6">
                   <GroupTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                
                <div className="flex-1 flex flex-col relative bg-base-400/10">
                    {activeTab === 'anggota' && (
                        <>
                            <div className="p-6 bg-white border-b border-base-200 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-10">
                                <div className="relative w-full md:max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-neutral/40" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2.5 border border-base-200 rounded-xl leading-5 bg-base-100/50 placeholder-neutral/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                        placeholder="Cari anggota (NIM / Nama)..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {isAdmin && (
                                    <div className="flex gap-3 w-full md:w-auto justify-end">
                                        <button
                                            onClick={handleDeleteGroup}
                                            className="px-4 py-2.5 bg-error/10 text-error hover:bg-error hover:text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
                                            title="Hapus Grup"
                                        >
                                            <TrashIcon className="size-5" />
                                            <span className="hidden sm:inline">Bubarkan</span>
                                        </button>

                                        <button
                                            onClick={() => navigate(`/pages/groups/${groupId}/add-member`)}
                                            className="px-5 py-2.5 bg-primary text-white hover:bg-primary/90 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                                        >
                                            <PlusIcon className="size-5" />
                                            <span>Undang</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-neutral/40">
                                        <span className="loading loading-spinner loading-md mb-3"></span>
                                        <p>Memuat data anggota...</p>
                                    </div>
                                ) : groupMembers.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-neutral/40 border-2 border-dashed border-base-200 rounded-2xl">
                                        <UserGroupIcon className="size-10 mb-2 opacity-30"/>
                                        <p className="italic">Belum ada anggota.</p>
                                    </div>
                                ) : filteredMembers.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-neutral/40">
                                        <p className="italic">Tidak ditemukan anggota "{searchQuery}"</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredMembers.map((member) => (
                                            <MemberCard 
                                                key={member.id}
                                                name={member.name}
                                                nim={member.nim}
                                                role={member.role}
                                                status="confirmed"
                                                onKick={isAdmin && member.role !== 'admin' 
                                                    ? () => kickMember(groupId, member.id) 
                                                    : null
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-white border-t border-base-200">
                                <button 
                                    onClick={() => navigate(`/pages/groups/${groupId}/waktu-kosong`)}
                                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] hover:-translate-y-1"
                                >
                                    <CalendarDaysIcon className="size-6" />
                                    Cari Slot Waktu Tersedia
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === 'obrolan' && (
                        <div className="h-full bg-white">
                            <ChatContainer groupId={groupId} isAdmin={isAdmin} />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}