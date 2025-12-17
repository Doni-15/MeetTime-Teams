import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBox } from '../../components/components/GlobalComponents';
import { SideBarAuht } from '../../components/components/AuthComponents';
import { useAuth } from '../../hooks/useAuth';

export function SignIn({ setUser }) {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    
    const [form, setForm] = useState({ nim: "", password: "" });

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'nim') {
            setForm(prev => ({ ...prev, [id]: value.replace(/[^0-9]/g, '') }));
        } else {
            setForm(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(form, setUser);
    };

    return (
        <main className="min-h-screen w-full bg-base-400 flex items-center justify-center p-4 md:p-6 font-sans">
            <div className="w-full max-w-5xl bg-netral-putih rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold text-utama mb-2">Selamat Datang</h1>
                        <p className="text-neutral/70">Silakan masuk untuk melanjutkan</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <InputBox
                            id="nim"
                            type="text"
                            placeholder="Contoh: 1234567890"
                            judul="NIM"
                            value={form.nim}
                            autoComplete="username" 
                            onChange={handleChange}
                        />
                        <InputBox
                            id="password"
                            type="password"
                            placeholder="Masukkan Password"
                            judul="Password"
                            value={form.password}
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        
                        <div className="mt-4">
                            <SideBarAuht
                                buttonText={loading ? "Memproses..." : "Sign In"}
                                tombolKiri={false}
                                onClick={loading ? undefined : handleSubmit}
                            />
                        </div>
                    </form>
                </div>
                
                <div className="w-full lg:w-1/2 bg-utama text-netral-putih relative flex flex-col justify-center items-center p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 text-center w-full">
                        <SideBarAuht
                            title="Belum Memiliki Akun?"
                            subTitle="Daftarkan diri anda sekarang."
                            buttonText="Sign Up"
                            buttonLink="/autentifikasi/sign-up"
                            tombolKiri={true}
                            navigate={navigate} 
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}