import { AksiCepat, ListGroup, CaraKerja, JadwalSaya } from '../../components/components/Dashboard';

export function Dashboard() {
    const today = new Date().toLocaleDateString('id-ID', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
                    Dashboard
                </h1>
                
                <p className="text-blue-100 text-sm md:text-base font-medium">
                    {today} • Pantau aktivitas penjadwalanmu hari ini.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="h-full">
                    <AksiCepat />
                </div>
                
                <div className="h-full">
                    <ListGroup />
                </div>
                
                <div className="h-full">
                    <CaraKerja />
                </div>
            </div>

            {/* Bagian Bawah (Full Width) */}
            <div className="w-full">
                <JadwalSaya />
            </div>

        </div>
    );
}