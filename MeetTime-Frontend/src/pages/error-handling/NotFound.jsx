import { useNavigate } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen w-full bg-base-400 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                    <h1 className="text-[10rem] md:text-[12rem] font-black text-primary/10 leading-none select-none">
                        404
                    </h1>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold tracking-widest text-sm md:text-base backdrop-blur-sm shadow-sm">
                            PAGE NOT FOUND
                        </span>
                    </div>
                </div>

                <div className="space-y-3 -mt-10 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-utama tracking-tight">
                        Ups! Halaman Hilang
                    </h2>
                    <p className="text-neutral/60 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                        Halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau link yang kamu tuju salah.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="w-full sm:w-auto px-8 py-3 bg-white border border-base-200 text-neutral/70 font-bold rounded-xl hover:bg-base-100 hover:text-utama hover:border-base-300 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform" />
                        Kembali
                    </button>

                    <button 
                        onClick={() => ('/pages/dashboard')} navigate
                        className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <HomeIcon className="size-5" />
                        Ke Dashboard
                    </button>
                </div>

            </div>

            <div className="absolute bottom-6 text-neutral/30 text-xs">
                &copy; {new Date().getFullYear()} MeetTime System
            </div>
        </main>
    );
}