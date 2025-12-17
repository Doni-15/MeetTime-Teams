import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';

import { KembaliDashboard } from '../../components/components/GlobalComponents';
import { useKalender } from '../../hooks/useKalender';
import { DetailSibuk } from './detail-anggota-sibuk';

export function CariWaktuKosong() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    
    const { 
        loading, namaGrup, totalMembers, days, dynamicSlots, 
        selectedSlot, setSelectedSlot, getAvailability, getCellColor, handleCellClick 
    } = useKalender(groupId);

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
                                    <th className="p-4 bg-gray-900 text-white font-bold sticky left-0 z-20 border-r border-gray-700 min-w-[120px] shadow-md rounded-tl-xl">
                                        <div className="flex flex-col items-center">
                                            <ClockIcon className="size-5 mb-1" />
                                            <span className="text-xs uppercase tracking-wider">Waktu</span>
                                        </div>
                                    </th>
                                    {days.map((day) => (
                                        <th key={day} className="p-4 bg-gray-50 text-gray-900 font-extrabold border-b-2 border-r border-gray-200 min-w-[120px]">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {dynamicSlots.map((slot) => (
                                    <tr key={slot.label} className="group">
                                        <td className="p-3 bg-white font-bold text-gray-600 text-xs border-r-2 border-b border-gray-200 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                            {slot.label}
                                        </td>
                                        {days.map((day) => {
                                            const availability = getAvailability(day, slot.startMin, slot.endMin);
                                            return (
                                                <td 
                                                    key={day} 
                                                    onClick={() => handleCellClick(day, slot.label, availability)}
                                                    className={`
                                                        p-2 border-r border-b cursor-pointer transition-all duration-200 
                                                        text-sm font-extrabold relative group/cell
                                                        ${getCellColor(availability.availableCount)}
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
                                ))}
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

            <DetailSibuk 
                slot={selectedSlot} 
                onClose={() => setSelectedSlot(null)} 
            />
        </div>
    );
}