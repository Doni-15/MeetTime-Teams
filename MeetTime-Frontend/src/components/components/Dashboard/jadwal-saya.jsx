import { MinusIcon, CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useKrs } from "../../../hooks/useKrs";

export function JadwalSaya() {
    const { daftarKrs, loading } = useKrs();
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    return (
        <section className="h-full w-full bg-netral-putih rounded-3xl p-6 shadow-lg border border-base-200 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-utama tracking-tight">
                        Jadwal Kuliah
                    </h2>
                    <p className="text-xs text-neutral/60 font-medium">
                        Agenda mingguan anda
                    </p>
                </div>
                
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CalendarDaysIcon className="size-6" />
                </div>
            </div>

            <div className="flex-1 min-h-[300px] relative">
                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="text-sm font-medium text-neutral/50 mt-3">Mengambil jadwal...</p>
                    </div>
                )}

                {!loading && (
                    <section className='h-full overflow-y-auto hide-scrollbar grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 pb-4'>
                        {(Array.isArray(days) ? days : []).map((hari) => {
                            const jadwalHariIni = Array.isArray(daftarKrs) 
                                ? daftarKrs.filter(item => item.hari === hari)
                                : [];

                            return (
                                <div key={hari} className="flex flex-col gap-3 min-w-[140px]">
                                    <div className="sticky top-0 z-10 bg-netral-putih/95 backdrop-blur-sm pb-2 border-b border-base-200 mb-1">
                                        <h3 className="text-sm font-bold text-utama uppercase tracking-widest text-center">
                                            {hari}
                                        </h3>
                                    </div>

                                    {jadwalHariIni.length > 0 ? (
                                        jadwalHariIni.map((item) => (
                                            <div
                                                key={item.id}
                                                className="group relative p-3 rounded-xl border border-base-200 bg-white hover:border-primary transition-all duration-300 hover:shadow-md cursor-default flex flex-col gap-2"
                                            >
                                                <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                                <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 w-fit px-2 py-1 rounded-md">
                                                    <ClockIcon className="size-3.5" />
                                                    <span>{item.jamMulai.slice(0, 5)} - {item.jamSelesai.slice(0, 5)}</span>
                                                </div>

                                                <h4 
                                                    className="font-bold text-custom-text text-sm leading-snug line-clamp-3 group-hover:text-utama transition-colors"
                                                    title={item.mataKuliah}
                                                >
                                                    {item.mataKuliah}
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