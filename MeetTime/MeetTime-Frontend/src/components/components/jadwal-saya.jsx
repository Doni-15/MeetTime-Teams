import { Link } from 'react-router-dom'
import { ArrowRightIcon, MinusIcon } from '@heroicons/react/24/outline'
import { DataJadwalSaya } from '@/components'

export function JadwalSaya() {
    return(
        <>
            <section className="bg-[var(--warna-netral-putih)] px-5 pt-3 pb-10 rounded-xl">
                <div className="flex justify-between items-center text-black">
                    <h1 className="font-semibold text-xl">Jadwal Saya</h1>
                    <span className='flex flex-row items-center text-[var(--color-base-200)] cursor-pointer hover:underline'>
                        <h1 className='mr-2'>Lihat semua</h1>
                        <ArrowRightIcon className="size-5" />                  
                    </span>
                </div>
                <section className='max-h-[45vh] grid grid-cols-6 gap-5 text-center mt-2'>
                    {DataJadwalSaya.map((item) => (
                        <div key={item.id}>
                            <h1 className='text-lg font-semibold mb-1'>{item.hari}</h1>

                            {item.jadwal.map((jadwalItem, idx) => (
                                <div key={idx} className='text-base bg-[var(--warna-netral-abu)] mb-5 items-center flex justify-center rounded-md min-h-10'>
                                    {jadwalItem == "" ?
                                        <>
                                            <MinusIcon className="w-5 h-5" />
                                        </>
                                        :
                                        <>
                                            {jadwalItem}
                                        </>
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </section>
            </section>
        </>
    );
}