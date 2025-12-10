import { MinusIcon, CalendarDaysIcon, ClockIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useKrs } from "../../../hooks/useKrs";
import { useAgenda } from "../../../hooks/useAgenda";

export function JadwalSaya() {
    const { daftarKrs, loading: loadingKrs } = useKrs();
    const { daftarAgenda, loading: loadingAgenda, deleteAgenda } = useAgenda();
    const isLoading = loadingKrs || loadingAgenda;
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const formatTanggal = (isoDate) => {
        if (!isoDate) return '';
        return new Date(isoDate).toLocaleDateString('id-ID', {
            day: 'numeric', 
            month: 'short'
        });
    };

    return (
        <section className="h-full w-full bg-netral-putih rounded-3xl p-6 shadow-lg border border-base-200 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-utama tracking-tight">
                        Jadwal & Agenda
                    </h2>
                    <p className="text-xs text-neutral/60 font-medium">
                        Aktivitas mingguan anda
                    </p>
                </div>
                
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CalendarDaysIcon className="size-6" />
                </div>
            </div>

            <div className="flex-1 min-h-[300px] relative">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="text-sm font-medium text-neutral/50 mt-3">Sinkronisasi jadwal...</p>
                    </div>
                )}

                {!isLoading && (
                    <section className='h-full overflow-y-auto hide-scrollbar grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 pb-4'>
                        {(Array.isArray(days) ? days : []).map((hari) => {
                            const jadwalKuliah = Array.isArray(daftarKrs) 
                                ? daftarKrs.filter(item => item.hari === hari).map(item => ({...item, tipe: 'krs'}))
                                : [];

                            const jadwalAgenda = Array.isArray(daftarAgenda)
                                ? daftarAgenda.filter(item => item.hari === hari).map(item => ({...item, tipe: 'agenda'}))
                                : [];

                            const gabunganJadwal = [...jadwalKuliah, ...jadwalAgenda].sort((a, b) => {
                                return a.jamMulai.localeCompare(b.jamMulai);
                            });

                            return (
                                <div key={hari} className="flex flex-col gap-3 min-w-[140px]">
                                    <div className="sticky top-0 z-10 bg-netral-putih/95 backdrop-blur-sm pb-2 border-b border-base-200 mb-1">
                                        <h3 className="text-sm font-bold text-utama uppercase tracking-widest text-center">
                                            {hari}
                                        </h3>
                                    </div>

                                    {gabunganJadwal.length > 0 ? (
                                        gabunganJadwal.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`group relative p-3 rounded-xl border transition-all duration-300 hover:shadow-md cursor-default flex flex-col gap-2 
                                                    ${item.tipe === 'agenda' ? 'bg-orange-50/50 border-orange-300' : 'bg-white border-base-200 hover:border-primary'}
                                                `}
                                            >
                                                <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity
                                                    ${item.tipe === 'agenda' ? 'bg-orange-500' : 'bg-primary'}
                                                `}></div>

                                                <div className="flex justify-between items-start">
                                                    <div className="flex flex-col gap-1">
                                                        <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-md w-fit
                                                            ${item.tipe === 'agenda' ? 'text-orange-600 bg-orange-100' : 'text-primary bg-primary/5'}
                                                        `}>
                                                            <ClockIcon className="size-3" />
                                                            <span>{item.jamMulai.slice(0, 5)} - {item.jamSelesai.slice(0, 5)}</span>
                                                        </div>

                                                        {item.tipe === 'agenda' && item.tanggal && (
                                                            <span className="text-[10px] font-medium text-orange-400 ml-1">
                                                                {formatTanggal(item.tanggal)}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {item.tipe === 'agenda' && (
                                                        <button 
                                                            onClick={() => deleteAgenda(item.id)}
                                                            className="text-neutral/40 hover:text-error transition-colors p-1"
                                                            title="Hapus Agenda"
                                                        >
                                                            <TrashIcon className="size-4" />
                                                        </button>
                                                    )}
                                                </div>

                                                <h4 
                                                    className="font-bold text-custom-text text-sm leading-snug line-clamp-3 group-hover:text-utama transition-colors"
                                                    title={item.mataKuliah || item.namaKegiatan}
                                                >
                                                    {item.mataKuliah || item.namaKegiatan}
                                                </h4>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-24 rounded-xl border border-dashed border-base-200 bg-base-400/20 text-neutral/30">
                                            <MinusIcon className="size-6" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </section>
                )}
            </div>
        </section>
    );
}