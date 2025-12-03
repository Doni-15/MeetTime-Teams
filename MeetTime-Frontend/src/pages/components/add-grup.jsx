import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { KembaliDashboard, InputBox, TextAreaBox } from '../../components/components/GlobalComponents';
import { useGroup } from '../../hooks/useGroup';

export function AddNewGrup() {
    const navigate = useNavigate();
    const { createGroup, loading } = useGroup();   

    const [formData, setFormData] = useState({
        namaGrup: "",
        deskripsiGrup: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newGroup = await createGroup(formData);

        if (newGroup && newGroup.id) {
            navigate(`/pages/groups/${newGroup.id}/add-member`);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <KembaliDashboard 
                    judul="Buat Grup Baru" 
                    keterangan="Buat ruang kolaborasi untuk mencocokkan jadwal dengan rekan anda."
                />
            </div>
    
            <section className="bg-netral-putih rounded-3xl p-6 md:p-8 shadow-lg border border-base-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-base-200 relative z-10">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-sm">
                        <UserGroupIcon className="size-8" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-utama">Detail Grup</h2>
                        <p className="text-sm text-neutral/60">Isi informasi dasar grup anda.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    <div className="w-full">
                        <InputBox 
                            variant="soft" 
                            judul="Nama Grup" 
                            name="namaGrup" 
                            placeholder="Contoh: Kelompok Tugas Pemrograman Web"
                            value={formData.namaGrup} 
                            onChange={handleChange} 
                            autoFocus
                        />
                    </div>

                    <div className="w-full">
                        <TextAreaBox
                            variant="soft" 
                            judul="Deskripsi / Tujuan" 
                            name="deskripsiGrup" 
                            placeholder="Jelaskan tujuan grup ini dibuat..."
                            value={formData.deskripsiGrup} 
                            onChange={handleChange} 
                            rows={4}
                        />
                        <p className="text-xs text-neutral/50 mt-2 flex items-center gap-1">
                            <SparklesIcon className="size-3" />
                            Deskripsi membantu anggota memahami tujuan grup.
                        </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-base-200 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="px-8 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                "Buat Grup & Lanjut"
                            )}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}