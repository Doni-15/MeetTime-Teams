import { ArrowPathIcon, HomeIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";

export default function ServerError() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full bg-base-400 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-error/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-neutral/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative">
                <h1 className="text-[10rem] md:text-[12rem] font-black text-error/10 leading-none select-none">
                    500
                </h1>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <ServerStackIcon className="size-12 text-error/40" />
                    <span className="px-5 py-2 rounded-full bg-error/10 text-error border border-error/20 font-bold tracking-widest text-sm md:text-base backdrop-blur-sm shadow-sm">
                        SERVER ERROR
                    </span>
                </div>
            </div>

            <div className="space-y-3 -mt-10 relative z-10">
                <h2 className="text-2xl md:text-4xl font-bold text-utama tracking-tight">
                    Gagal Terhubung ke Server
                </h2>
                <p className="text-neutral/60 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                    Sepertinya server sedang bermasalah atau koneksi internetmu terputus. Silakan coba beberapa saat lagi.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                    onClick={() => window.location.reload()} 
                    className="w-full sm:w-auto px-8 py-3 bg-error text-white font-bold rounded-xl hover:bg-error/90 shadow-lg shadow-error/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                    <ArrowPathIcon className="size-5" />
                    Coba Lagi
                </button>

                <button 
                    onClick={() => navigate('/pages/dashboard')} 
                    className="w-full sm:w-auto px-8 py-3 bg-white border border-base-200 text-neutral/70 font-bold rounded-xl hover:bg-base-100 hover:text-utama hover:border-base-300 transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                >
                    <HomeIcon className="size-5" />
                    Ke Dashboard
                </button>

            </div>
        </div>

        <div className="absolute bottom-6 text-neutral/30 text-xs">
            System ID: ERR_CONNECTION_REFUSED
        </div>
    </section>
  );
}