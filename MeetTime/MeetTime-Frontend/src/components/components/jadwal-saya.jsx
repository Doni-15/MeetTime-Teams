import { ArrowRightIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useKrs } from "@/hooks/useKrs";
import { useNavigate } from 'react-router-dom';

export function JadwalSaya() {
    const { daftarKrs, loading } = useKrs();
    const navigate = useNavigate();
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    return(
        <>
            <section className="bg-[var(--warna-netral-putih)] px-5 pt-3 pb-15 rounded-xl shadow-sm border border-gray-100 h-full">
                <div className="flex justify-between items-center text-black mb-4">
                    <h1 className="font-semibold text-xl">Jadwal Saya</h1>
                    <span 
                        onClick={() => navigate('/pages/input-krs')}
                        className='flex flex-row items-center text-[var(--color-base-200)] cursor-pointer hover:underline text-sm font-medium'
                    >
                        <h1 className='mr-2'>Kelola Jadwal</h1>
                        <ArrowRightIcon className="size-4" />                  
                    </span>
                </div>

                {loading && <p className="text-center text-gray-400 py-10">Memuat jadwal...</p>}

                {!loading && (
                    <section className='max-h-[45vh] grid grid-cols-1 md:grid-cols-6 gap-4 text-center'>
                        
                        {days.map((hari) => {
                            const jadwalHariIni = daftarKrs.filter(item => item.hari === hari);

                            return (
                                <div key={hari} className="flex flex-col gap-2">
                                    <h1 className='text-lg font-bold text-gray-700 mb-2 sticky top-0 bg-white pb-2 border-b border-gray-200'>
                                        {hari}
                                    </h1>

                                    {jadwalHariIni.length > 0 ? (
                                        jadwalHariIni.map((item) => (
                                            <div 
                                                key={item.id} 
                                                className='bg-[var(--warna-netral-abu)] p-3 rounded-lg text-left hover:shadow-md transition-all border border-transparent hover:border-gray-200 group'
                                            >
                                                <h3 className='font-bold text-gray-800 text-base leading-tight mb-1 line-clamp-2' title={item.mataKuliah}>
                                                    {item.mataKuliah}
                                                </h3>
                                                <div className='text-sm text-[var(--color-base-200)] font-semibold flex items-center gap-1'>
                                                    <span>{item.jamMulai?.slice(0, 5)}</span>
                                                    <span>-</span>
                                                    <span>{item.jamSelesai?.slice(0, 5)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='bg-gray-100 border border-dashed border-gray-300 rounded-lg h-20 flex items-center justify-center text-gray-300'>
                                            <MinusIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                    </section>
                )}
            </section>
        </>
    );
}