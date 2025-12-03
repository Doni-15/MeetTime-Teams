import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export function KembaliDashboard({ judul, keterangan }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 mb-8">
            <button 
                onClick={() => navigate('/pages/dashboard')} 
                className="group w-fit flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 ease-out"
            >
                <div className="p-2 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all shadow-sm backdrop-blur-sm">
                    <ArrowLeftIcon 
                        className="size-5 text-white group-hover:-translate-x-1 transition-transform duration-300"
                    />
                </div>
                
                <span className="text-sm md:text-base font-bold tracking-wide drop-shadow-sm">
                    Kembali ke Dashboard
                </span>
            </button>

            <div className="space-y-1 ml-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                    {judul}
                </h1>
                
                {keterangan && (
                    <p className="text-sm md:text-base text-white/70 font-medium max-w-2xl leading-relaxed drop-shadow-sm">
                        {keterangan}
                    </p>
                )}
            </div>
        </div>
    );
}