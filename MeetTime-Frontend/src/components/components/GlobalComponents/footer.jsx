export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-utama border-t border-white/10 text-netral-putih">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 flex flex-col items-center justify-center text-center space-y-3">
                
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <h1 className="text-lg md:text-xl font-bold tracking-wide">
                        Meet Time
                    </h1>
                    
                    <span className="hidden md:block text-white/40">|</span>
                    
                    <h2 className="text-base md:text-lg text-white/80 font-medium">
                        Asisten Penjadwalan Cerdas
                    </h2>
                </div>

                <p className="text-sm text-white/50 font-light mt-4">
                    &copy; {currentYear} MeetTime. All rights reserved.
                </p>

            </div>
        </footer>
    );
}