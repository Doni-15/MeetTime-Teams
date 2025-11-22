import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { DataGroup } from '@/components'

export function ListGroup() {
    return(
        <>
            <section className="bg-[var(--warna-netral-putih)] px-5 pt-3 pb-10 rounded-xl">
                <div className="flex justify-between items-center text-black">
                    <h1 className="font-semibold text-xl">Group Saya</h1>
                    <h1 className="font-extrabold text-3xl">+</h1>                   
                </div>
                <section className='overflow-y-auto max-h-[45vh] hide-scrollbar'>
                    {DataGroup.map((item) => (
                        <Link key={item.id} to={item.link}>
                            <div className="bg-[var(--warna-netral-abu)] font-semibold mt-3 py-1 text-lg px-2 rounded-lg flex justify-between items-center font-bold border border-[var(--color-base-400)]">
                                <div className='flex flex-col'>
                                    <h1>{item.namaGroup}</h1>
                                    <h1 className='text-base text-[var(--color-base-300)] '>{item.jumlahAnggota} anggota</h1>
                                </div>
                                <ArrowRightIcon className="size-6" />
                            </div>
                        </Link>

                    ))}
                </section>
            </section>
        </>
    );
}