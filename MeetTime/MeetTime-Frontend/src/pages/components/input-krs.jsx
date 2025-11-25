import { KembaliDashboard, CardKrs, InputBox, SelectBox } from '@/components';
import { useState } from "react";
import { useKrs } from "@/hooks/useKrs";

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

        if (!formData.mataKuliah || !formData.jamMulai || !formData.jamSelesai) {
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
        <>
            <div className="bg-[var(--warna-netral-abu)] mx-10 pt-5 pb-8 px-5 rounded-xl">
                <KembaliDashboard 
                    judul="Input Jadwal KRS" 
                    keterangan ="Masukkan jadwal perkuliahan permanen anda"
                />

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                         <div className="md:col-span-6">
                            <InputBox 
                                variant="soft" 
                                judul="Mata Kuliah" 
                                name="mataKuliah" 
                                placeholder="Contoh: Dasar Pemrograman"
                                value={formData.mataKuliah} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="md:col-span-3">
                            <SelectBox 
                                variant="soft" 
                                judul="Hari" 
                                name="hari" 
                                value={formData.hari} 
                                onChange={handleChange} 
                                options={opsiHari} 
                            />
                        </div>
                        <div className="md:col-span-3">
                            <div className="text-base font-bold text-gray-600 uppercase tracking-wide w-full text-center">
                                Waktu
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <InputBox 
                                    type="time"
                                    name="jamMulai" 
                                    value={formData.jamMulai} 
                                    onChange={handleChange} 
                                />
                                <span>-</span>

                                <InputBox 
                                    type="time" 
                                    name="jamSelesai" 
                                    value={formData.jamSelesai} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`
                                flex items-center gap-2 bg-[var(--color-base-200)] text-white py-2 px-6 rounded-lg 
                                ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--warna-utama)]"}
                            `}
                        >
                            {loading ? "Menyimpan..." : "Simpan Jadwal"}
                        </button>
                    </div>
                </form>
                <section className="bg-[var(--warna-netral-putih)] px-5 pt-5 pb-10 rounded-xl">
                    <div className="flex justify-between items-center text-black">
                        <h1 className="font-semibold text-xl">Mata Kuliah</h1>                
                        <h1 className="font-semibold text-lg text-[var(--color-base-100)]">
                            {daftarKrs.length} Mata Kuliah
                        </h1>                
                    </div>
                    
                    <section className='overflow-y-auto hide-scrollbar mt-5 gap-y-4 flex flex-col'>
                        
                        {loading && daftarKrs.length === 0 && (
                            <p className="text-center mt-10">Sedang memuat data...</p>
                        )}

                        {!loading && daftarKrs.length === 0 && (
                            <p className="text-center text-gray-400 mt-10">Belum ada jadwal.</p>
                        )}

                        {daftarKrs.map((item) => (
                            <CardKrs 
                                key={item.id} 
                                data={item} 
                                onDelete={() => deleteKrs(item.id)}
                            />
                        ))}

                    </section>
                </section>
            </div>
        </>
    );
}