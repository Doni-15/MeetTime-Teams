import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { useState } from "react";

import { KembaliDashboard, SelectBox, InputBox, JadwalSkeleton } from '../../components/components/GlobalComponents';
import { CardKrs } from '../../components/components/InputKrs';
import { useKrs } from "../../hooks/useKrs";

export function InputKrs() { 
    const { daftarKrs, loading, addKrs, deleteKrs } = useKrs();

    const [formData, setFormData] = useState({
        mataKuliah: '',
        hari: '',
        jamMulai: '',
        jamSelesai: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.mataKuliah || !formData.hari || !formData.jamMulai || !formData.jamSelesai) {
            alert("Mohon lengkapi data!");
            return;
        }

        const sukses = await addKrs(formData);

        if (sukses) {
            setFormData({ 
                mataKuliah: '', 
                hari: '', 
                jamMulai: '', 
                jamSelesai: '' 
            });
        }
    };

    const opsiHari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    return(
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-10">
            <div className="flex flex-col gap-2">
                <KembaliDashboard 
                    judul="Input Jadwal KRS" 
                    keterangan ="Masukkan jadwal perkuliahan permanen anda di sini."
                />
            </div>

            <section className="bg-netral-putih rounded-3xl p-6 md:p-8 shadow-lg border border-base-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-base-200">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <PlusIcon className="size-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-utama">Tambah Mata Kuliah</h2>
                        <p className="text-sm text-neutral/60">Pastikan data sesuai dengan KRS</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-6">
                            <InputBox 
                                variant="soft" 
                                judul="Nama Mata Kuliah" 
                                name="mataKuliah" 
                                placeholder="Contoh: Kecerdasan Buatan"
                                value={formData.mataKuliah} 
                                onChange={handleChange} 
                                autoFocus
                            />
                        </div>

                        <div className="md:col-span-3">
                            <SelectBox 
                                variant="soft" 
                                judul="Hari Kuliah" 
                                name="hari" 
                                value={formData.hari} 
                                onChange={handleChange} 
                                options={opsiHari} 
                            />
                        </div>

                        <div className="md:col-span-3 flex gap-3">
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
                                "Simpan Jadwal"
                            )}
                        </button>
                    </div>
                </form>
            </section>

            <section className="flex flex-col gap-4 md:text-base font-bold tracking-wide drop-shadow-sm">   
                <div className="flex justify-between items-end px-2">
                    <div>
                        <h2 className="text-xl font-bold text-white/100">Daftar Mata Kuliah</h2>
                        <p className="text-sm text-white/70">Total {daftarKrs.length} mata kuliah terdaftar</p>
                    </div>
                    <BookOpenIcon className="size-6 text-white/100" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loading && daftarKrs.length === 0 && (
                        <>
                            <JadwalSkeleton />
                            <JadwalSkeleton />
                            <JadwalSkeleton />
                            <JadwalSkeleton />
                        </>
                    )}

                    {!loading && daftarKrs.length === 0 && (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-base-200/30 rounded-3xl bg-base-100/10 text-white/60 backdrop-blur-sm">
                            <BookOpenIcon className="size-10 mb-2 opacity-50"/>
                            <p className="font-medium">Belum ada jadwal yang diinput.</p>
                        </div>
                    )}

                    {Array.isArray(daftarKrs) && daftarKrs.map((item) => (
                        <div key={item.id} className="h-full">
                            <CardKrs 
                                data={item} 
                                onDelete={() => deleteKrs(item.id)}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}