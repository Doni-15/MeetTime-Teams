import { PlusIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import { toast } from 'react-hot-toast';

import { useAgenda } from "../../hooks/useAgenda";
import { KembaliDashboard, InputBox, SelectBox } from '../../components/components/GlobalComponents';
import { CardAgenda } from '../../components/components/InputAgenda';

export function AgendaDinamis() {
    const { daftarAgenda, loading, addAgenda, deleteAgenda } = useAgenda();

    const [formData, setFormData] = useState({
        namaKegiatan: '',
        hari: '', 
        tanggal: '',
        jamMulai: '', 
        jamSelesai: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'tanggal' && value) {
            const date = new Date(value);
            const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
            const dayName = days[date.getDay()];
            
            setFormData(prev => ({ 
                ...prev, 
                [name]: value,
                hari: dayName
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.namaKegiatan || !formData.hari || !formData.tanggal || !formData.jamMulai || !formData.jamSelesai) {
            toast.error("Mohon lengkapi semua data!");
            return;
        }

        const sukses = await addAgenda(formData);

        if (sukses) {
            setFormData({ 
                namaKegiatan: '',
                hari: '', 
                tanggal: '',
                jamMulai: '', 
                jamSelesai: '', 
            });
        }
    };

    const opsiHari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    return(
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <KembaliDashboard 
                    judul="Agenda Dinamis" 
                    keterangan ="Atur kegiatan mingguan, rapat organisasi, atau acara lainnya."
                />
            </div>

            <section className="bg-netral-putih rounded-3xl p-6 md:p-8 shadow-lg border border-base-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-base-200">
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                        <PlusIcon className="size-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-utama">Tambah Kegiatan Baru</h2>
                        <p className="text-sm text-neutral/60">Isi detail kegiatan yang akan datang.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-12">
                            <InputBox 
                                variant="soft" 
                                judul="Nama Kegiatan" 
                                name="namaKegiatan" 
                                placeholder="Contoh: Rapat BEM / Gym / Kuliah Tambahan"
                                value={formData.namaKegiatan} 
                                onChange={handleChange} 
                                autoFocus
                            />
                        </div>

                        <div className="md:col-span-4">
                            <InputBox 
                                variant="soft" 
                                type="date"
                                judul="Tanggal Kegiatan" 
                                name="tanggal" 
                                value={formData.tanggal} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="md:col-span-4">
                            <SelectBox 
                                variant="soft" 
                                judul="Hari" 
                                name="hari" 
                                value={formData.hari} 
                                onChange={handleChange} 
                                options={opsiHari} 
                            />
                        </div>

                        <div className="md:col-span-4 flex gap-3">
                            <div className="w-1/2">
                                <InputBox 
                                    judul="Mulai"
                                    type="time"
                                    name="jamMulai" 
                                    variant="soft"
                                    value={formData.jamMulai} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="w-1/2">
                                <InputBox 
                                    judul="Selesai"
                                    type="time" 
                                    name="jamSelesai" 
                                    variant="soft"
                                    value={formData.jamSelesai} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="px-8 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                "Simpan Agenda"
                            )}
                        </button>
                    </div>
                </form>
            </section>

            <section className="flex flex-col gap-4">
                <div className="flex justify-between items-end px-2">
                    <div>
                        <h2 className="text-xl font-bold text-white/100">Daftar Agenda</h2>
                        <p className="text-sm text-white/70">Total {daftarAgenda.length} kegiatan tersimpan</p>
                    </div>
                    <CalendarDaysIcon className="size-6 text-neutral/30" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loading && daftarAgenda.length === 0 && (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-neutral/40">
                            <span className="loading loading-spinner loading-md mb-2"></span>
                            <p>Memuat data...</p>
                        </div>
                    )}

                    {!loading && daftarAgenda.length === 0 && (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-base-200 rounded-3xl bg-base-100/40 text-white/60">
                            <CalendarDaysIcon className="size-10 mb-2 opacity-50"/>
                            <p className="font-medium">Belum ada agenda yang dijadwalkan.</p>
                        </div>
                    )}

                    {Array.isArray(daftarAgenda) && daftarAgenda.map((item) => (
                        <div key={item.id} className="h-full">
                            <CardAgenda 
                                data={item} 
                                onDelete={() => deleteAgenda(item.id)}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}