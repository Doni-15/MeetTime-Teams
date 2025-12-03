import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { CaraKerjaData } from "./data-carakerja";

export function CaraKerja() {
    return (
        <section className="h-full w-full bg-netral-putih rounded-3xl p-6 shadow-lg border border-base-200 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-warning/10 rounded-bl-full -mr-4 -mt-4 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h2 className="text-xl font-bold text-utama tracking-tight">
                        Panduan
                    </h2>
                    <p className="text-xs text-neutral/60 font-medium">
                        Keterangan warna jadwal
                    </p>
                </div>
                
                <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center text-warning-content">
                    <InformationCircleIcon className="size-6 text-orange-600" />
                </div>
            </div>

            <section className='flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar relative z-10'>
                {Array.isArray(CaraKerjaData) && CaraKerjaData.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 group">
                        <div className={`
                            ${item.className} 
                            shrink-0 w-16 h-12 rounded-xl shadow-sm flex items-center justify-center 
                            text-sm font-bold text-white tracking-wider border border-black/5
                        `}>
                            {item.range}
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-base font-bold text-utama group-hover:text-primary transition-colors">
                                {item.area}
                            </h3>
                            <p className="text-xs md:text-sm text-neutral/70 font-medium leading-tight">
                                {item.statusArea}
                            </p>
                        </div>
                    </div>
                ))}

                {(!CaraKerjaData || CaraKerjaData.length === 0) && (
                    <p className="text-sm text-neutral/50 text-center py-4">
                        Tidak ada data panduan.
                    </p>
                )}
            </section>
        </section>
    );
}