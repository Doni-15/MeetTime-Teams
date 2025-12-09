import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import { InputBox } from '../../components/components/GlobalComponents';
import { SideBarAuht } from '../../components/components/AuthComponents';
import API from '../../config/api';

export function SignIn({ setUser }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nim: "",        // Sudah benar (menggunakan nim)
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        // Validasi input hanya angka untuk NIM
        if (id === 'nim') {
            const numbersOnly = value.replace(/[^0-9]/g, '');
            setForm(prev => ({ ...prev, [id]: numbersOnly }));
        }
        else {
            setForm(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validasi kelengkapan data
        if (!form.nim || !form.password) {
            setError("NIM dan Password wajib diisi!");
            return;
        }

        setIsLoading(true);

        try {
            // Mengirim { nim, password } ke backend
            // Backend akan mencocokkan NIM di database
            const res = await API.post("/auth/login", form);
            
            // Simpan data user (termasuk id, name, jurusan, nim) ke state global
            setUser(res.data.user);
            
            toast.success('Login berhasil!');
            navigate("/pages/dashboard", { replace: true });
        }
        catch (err) {
            console.error(err);
            if (!err.response) {
                setError("Gagal terhubung ke server (Cek koneksi internet)");
            }
            else {
                // Pesan error dari backend (misal: "NIM tidak ditemukan" atau "Password salah")
                setError(err.response?.data?.message || "NIM atau Password salah");
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen w-full bg-base-400 flex items-center justify-center p-4 md:p-6 font-sans">
            <div className="w-full max-w-5xl bg-netral-putih rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                
                {/* Bagian Form Login */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold text-utama mb-2">
                            Selamat Datang
                        </h1>
                        <p className="text-neutral/70">
                            Silakan masuk untuk melanjutkan
                        </p>
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
                        
                        <button type="submit" className="hidden" disabled={isLoading} />

                        {error && (
                            <div
                                role="alert"
                                className="flex flex-col text-sm bg-error/10 border border-error text-error px-4 py-3 rounded-xl animate-pulse"
                            >
                                <strong className="font-bold">Terjadi Kesalahan!</strong>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="mt-4">
                            <SideBarAuht
                                buttonText={isLoading ? "Memproses..." : "Sign In"}
                                tombolKiri={false}
                                onClick={isLoading ? undefined : handleSubmit}
                            />
                        </div>
                    </form>
                </div>

                {/* Bagian Sidebar Kanan (Link ke Sign Up) */}
                <div className="w-full lg:w-1/2 bg-utama text-netral-putih relative flex flex-col justify-center items-center p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 text-center w-full">
                         <SideBarAuht
                            title="Belum Memiliki Akun?"
                            subTitle="Daftarkan diri anda sekarang untuk mulai mengakses fitur kami."
                            buttonText="Sign Up"
                            buttonLink="/autentifikasi/sign-up"
                            navigate={navigate}
                            tombolKiri={true}
                        />
                    </div>
                </div>

            </div>
        </main>
    );
}