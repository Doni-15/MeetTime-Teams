import { AksiCepat, ListGroup, CaraKerja, JadwalSaya } from '@/components';

export function Dashboard() {
    return(
        <>
            <div className="bg-[var(--warna-netral-abu)] mx-10 pt-5 pb-8 px-5 rounded-xl">
                <h1 className="text-4xl font-bold mb-5">Dashboard</h1>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
                    <AksiCepat />
                    <ListGroup />
                    <CaraKerja />
                </div>
                <div className="mt-10">
                    <JadwalSaya />
                </div>
            </div>
        </>
    );
}

