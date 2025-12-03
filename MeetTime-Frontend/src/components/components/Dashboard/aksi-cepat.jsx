import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const components = [
    {
        judul: "Input Jadwal KRS",
        navigate: "input-krs"
    },
    {
        judul: "Tambah Agenda Dinamis",
        navigate: "agenda-dinamis"
    },
    {
        judul: "Buat Grup Baru",
        navigate: "add-grup"
    },
];

export function AksiCepat() {
    const navigate = useNavigate();

    return (
        <section className="h-full w-full bg-netral-putih rounded-3xl p-6 shadow-lg border border-base-200 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-utama tracking-tight">
                        Aksi Cepat
                    </h2>
                    <p className="text-xs text-neutral/60 font-medium">
                        Jalan pintas menu utama
                    </p>
                </div>
                
                <div className="h-10 w-10 rounded-full bg-base-300 flex items-center justify-center text-[var(--color-netral-abu)]">
                    <PlusIcon className="size-6" />
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto hide-scrollbar">
                {Array.isArray(components) && components.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/pages/${item.navigate}`)}
                        className="group w-full p-4 rounded-xl cursor-pointer transition-all duration-300 ease-out bg-slate-100 border border-slate-200 text-slate-700 hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent hover:shadow-md"
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-base tracking-wide">
                                {item.judul}
                            </span>
                            
                            <ArrowRightIcon className="size-5 text-neutral/50 group-hover:text-white group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}