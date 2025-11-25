import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export function AksiCepat() {
    const classAksi = "bg-white font-semibold mt-3 py-1 text-lg px-2 rounded-lg flex justify-between items-center font-bold border cursor-pointer hover:bg-gray-300";
    const navigate = useNavigate();
    
    return(
        <>
            <section className="bg-[var(--color-base-100)] px-5 pt-3 pb-10 rounded-xl">
                <div className="flex justify-between items-center text-[var(--warna-netral-abu)]">
                    <h1 className="font-semibold text-xl">Aksi Cepat</h1>
                    <h1 className="font-extrabold text-3xl">+</h1>                   
                </div>
                <section className='overflow-y-auto max-h-[45vh] hide-scrollbar'>
                    <div onClick={() => navigate('/pages/input-krs')} className={classAksi}>
                        <h1>Input Jadwal KRS</h1>
                        <ArrowRightIcon className="size-6" />
                    </div>
                    <div onClick={() => navigate('/pages/input-krs')} className={classAksi}>
                        <h1>Tambah Agenda Dinamis</h1>
                        <ArrowRightIcon className="size-6" />
                    </div>
                    <div onClick={() => navigate('/pages/input-krs')} className={classAksi}>
                        <h1>Buat Grup Baru</h1>
                        <ArrowRightIcon className="size-6" />
                    </div>
                </section>
            </section>
        </>
    );
}