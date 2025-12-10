import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CalendarDaysIcon, XMarkIcon, UserIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';

import { KembaliDashboard } from '../../components/components/GlobalComponents';
import { useGroup } from '../../hooks/useGroup'; 
import { groupService } from '../../services/groupService'; 

export function CariWaktuKosong() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { fetchMyGroups, myGroups } = useGroup();

    const [scheduleData, setScheduleData] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        if (groupId) {
            fetchMyGroups();
            const loadSchedules = async () => {
                try {
                    setLoading(true);
                    const res = await groupService.getSchedules(groupId);
                    setScheduleData(res.schedules || []);
                    setTotalMembers(res.total_members || 0);
                } catch (err) {
                    
                } finally {
                    setLoading(false);
                }
            };
            loadSchedules();
        }
    }, [groupId, fetchMyGroups]);

    const currentGroup = useMemo(() => {
        return myGroups.find(g => g.id === groupId);
    }, [myGroups, groupId]);

    const namaGrup = currentGroup ? currentGroup.nama_group : "...";

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
    ];
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const getAvailability = (day, hourStart) => {
        if (totalMembers === 0) return { busyCount: 0, availableCount: 0, busyUsers: [] };
        
        const hourEnd = hourStart + 1;

        const parseTime = (t) => {
            if (!t) return 0;
            const parts = t.split(':');
            if (parts.length < 2) return 0; 
            return parseFloat(parts[0]) + parseFloat(parts[1]) / 60;
        };

        const conflictingSchedules = scheduleData.filter(item => {
            if (!item.nama_hari || item.nama_hari.toLowerCase() !== day.toLowerCase()) 
                return false;

            const start = parseTime(item.waktu_mulai);
            const end = parseTime(item.waktu_selesai);

            return start < hourEnd && end > hourStart;
        });

        const busyUsersMap = new Map();
        conflictingSchedules.forEach(item => {
            if (!busyUsersMap.has(item.user_id)) {
                busyUsersMap.set(item.user_id, {
                    name: item.nama_user,
                    activity: item.tipe
                });
            }
        });

        const busyUsersList = Array.from(busyUsersMap.values());

        return {
            busyCount: busyUsersList.length,
            availableCount: totalMembers - busyUsersList.length,
            busyUsers: busyUsersList
        };
    };

    const getCellColor = (available, total) => {
        if (total === 0) return "bg-gray-100 text-gray-400 pointer-events-none"; 

        const percentage = available / total;
        
        if (percentage > 0.80)
            return "bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200"; 

        if (percentage > 0.5)
            return "bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200"; 

        return "bg-rose-100 text-rose-900 border-rose-300 hover:bg-rose-200"; 
    };

    const handleCellClick = (day, timeLabel, availabilityData) => {
        setSelectedSlot({
            day,
            timeLabel,
            ...availabilityData
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-10">
            <div className="flex flex-col gap-2">
                <KembaliDashboard 
                    judul={`Heatmap: ${namaGrup}`} 
                    keterangan={`Klik kotak jadwal untuk melihat detail siapa yang sibuk.`}
                />
            </div>

            <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 min-h-[600px] flex flex-col relative overflow-hidden">
                <div className="flex flex-wrap gap-4 mb-6 justify-end">
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                        <div className="size-4 rounded bg-emerald-100 border border-emerald-300"></div>
                        <span>Bisa Semua</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                        <div className="size-4 rounded bg-amber-100 border border-amber-300"></div>
                        <span>Sebagian</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                        <div className="size-4 rounded bg-rose-100 border border-rose-300"></div>
                        <span>Sibuk</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center flex-1 h-96 text-gray-400 animate-pulse">
                        <CalendarDaysIcon className="size-16 mb-4 opacity-30" />
                        <p className="font-bold text-lg text-gray-500">Menganalisis jadwal {totalMembers} anggota...</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-x-auto custom-scrollbar pb-4 rounded-xl border border-gray-200">
                        <table className="w-full min-w-[900px] border-collapse text-center bg-white">
                            
                            <thead>
                                <tr>
                                    <th className="p-4 bg-gray-900 text-white font-bold sticky left-0 z-20 border-r border-gray-700 min-w-[100px] shadow-md rounded-tl-xl">
                                        <div className="flex flex-col items-center">
                                            <ClockIcon className="size-5 mb-1" />
                                            <span className="text-xs uppercase tracking-wider">Jam</span>
                                        </div>
                                    </th>
                                    
                                    {days.map((day, idx) => (
                                        <th key={day} className="p-4 bg-gray-50 text-gray-900 font-extrabold border-b-2 border-r border-gray-200 min-w-[120px]">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {timeSlots.map((timeStr, idx) => {
                                    if (idx === timeSlots.length - 1) return null;
                                    
                                    const hourStart = parseInt(timeStr.split(':')[0]);
                                    const nextTimeStr = timeSlots[idx+1];
                                    const label = `${timeStr} - ${nextTimeStr}`;

                                    return (
                                        <tr key={timeStr} className="group">
                                            <td className="p-3 bg-white font-bold text-gray-600 text-xs border-r-2 border-b border-gray-200 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                                {label}
                                            </td>

                                            {days.map((day) => {
                                                const availability = getAvailability(day, hourStart);
                                                return (
                                                    <td 
                                                        key={day} 
                                                        onClick={() => handleCellClick(day, label, availability)}
                                                        className={`
                                                            p-2 border-r border-b cursor-pointer transition-all duration-200 
                                                            text-sm font-extrabold relative group/cell
                                                            ${getCellColor(availability.availableCount, totalMembers)}
                                                        `}
                                                    >
                                                        <div className="flex items-center justify-center gap-1">
                                                            <span className="text-base">{availability.availableCount}</span>
                                                            <span className="text-xs font-semibold opacity-70">/ {totalMembers}</span>
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>
                )}

                <div className="flex justify-end mt-8">
                    <button onClick={() => navigate(-1)} className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2">
                        <ArrowLeftIcon className="size-5" /> Selesai
                    </button>
                </div>
            </section>

            {selectedSlot && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-white/20">
                        <div className="bg-[var(--color-primary)] p-6 flex justify-between items-start text-white">
                            <div>
                                <h3 className="font-bold text-xl tracking-tight">Detail Ketersediaan</h3>
                                <div className="flex items-center gap-2 mt-1 text-white/80 text-sm font-medium">
                                    <CalendarDaysIcon className="size-4" />
                                    <span>{selectedSlot.day}, {selectedSlot.timeLabel}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedSlot(null)}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <XMarkIcon className="size-6 text-white" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center">
                                    <span className="block text-3xl font-bold text-emerald-700">{selectedSlot.availableCount}</span>
                                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Tersedia</span>
                                </div>
                                <div className="flex-1 bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center">
                                    <span className="block text-3xl font-bold text-rose-700">{selectedSlot.busyCount}</span>
                                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Sibuk</span>
                                </div>
                            </div>

                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">
                                Siapa yang sibuk?
                            </h4>

                            <div className="max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                                {selectedSlot.busyUsers.length === 0 ? (
                                    <div className="text-center py-8 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <CheckCircleIcon className="size-10 text-emerald-600 mx-auto mb-2 opacity-50" />
                                        <p className="text-emerald-800 font-bold">Semua anggota tersedia! 🎉</p>
                                        <p className="text-emerald-600 text-xs mt-1">Waktu yang tepat untuk rapat.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {selectedSlot.busyUsers.map((user, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-white p-2 rounded-full text-gray-500 border border-gray-200">
                                                        <UserIcon className="size-4" />
                                                    </div>
                                                    <span className="font-bold text-gray-800 text-sm">{user.name}</span>
                                                </div>
                                                
                                                <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide border 
                                                    ${user.activity === 'kuliah' 
                                                        ? 'bg-purple-50 text-purple-700 border-purple-200' 
                                                        : 'bg-blue-50 text-blue-700 border-blue-200'
                                                    }`}>
                                                    {user.activity === 'kuliah' ? 'Kuliah' : 'Agenda'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                            <button 
                                onClick={() => setSelectedSlot(null)}
                                className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold rounded-xl text-sm shadow-sm transition-all"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}