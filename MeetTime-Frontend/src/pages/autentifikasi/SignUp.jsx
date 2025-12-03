import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import { InputBox } from '../../components/components/GlobalComponents';
import { SideBarAuht } from '../../components/components/AuthComponents';
import API from '../../config/api';

const maxNIM = 20;
const minPassword = 6;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUp() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        nim: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
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

        if (!form.name || !form.email || !form.nim || !form.password) {
            setError("Semua form wajib diisi!");
            return;
        }

        if (!emailRegex.test(form.email)) {
            setError("Format email tidak valid! (contoh: nama@domain.com)");
            return;
        }

        if (form.nim.length > maxNIM) {
            setError(`NIM tidak boleh lebih dari ${maxNIM} karakter!`);
            return;
        }

        if (form.password.length <= minPassword) {
            setError(`Password harus lebih dari ${minPassword} karakter!`);
            return;
        }

        setIsLoading(true);

        try {
            await API.post("/auth/register", form);
            toast.success('Akun berhasil terdaftar!');
            navigate("/autentifikasi/sign-in", { replace: true });

        }
        catch (err) {
            console.error("Register Error:", err);

            if (!err.response) {
                setError("Gagal terhubung ke server (Cek koneksi internet)");
            }
            else {
                setError(err.response?.data?.message || "Gagal mendaftar");
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full bg-base-400 flex items-center justify-center p-4 md:p-6 font-sans">
            <div className="w-full max-w-6xl bg-netral-putih rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                <div className="w-full lg:w-5/12 bg-utama text-netral-putih relative flex flex-col justify-center items-center p-8 lg:p-12 overflow-hidden order-last lg:order-first">
                    <div className="absolute top-0 left-0 -mt-10 -ml-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 -mb-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10 w-full">
                        <SideBarAuht
                            title="Sudah Memiliki Akun?"
                            subTitle="Masuk kembali untuk mengakses dashboard anda."
                            buttonText="Sign In"
                            buttonLink="/autentifikasi/sign-in"
                            navigate={navigate}
                            tombolKiri={true}
                        />
                    </div>
                </div>

                <div className="w-full lg:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-netral-putih">
                    <div className="mb-6 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-utama mb-2">Buat Akun Baru</h1>
                        <p className="text-neutral/70 text-sm">Lengkapi data diri anda di bawah ini</p>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4' autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputBox
                                id="name"
                                type="text"
                                placeholder="Contoh: Doni Simamora"
                                judul="Nama Lengkap"
                                value={form.name}
                                autoComplete="name"
                                onChange={handleChange}
                            />
                            
                            <InputBox
                                id="nim"
                                type="text"
                                placeholder="Contoh: 1234567890"
                                judul="NIM"
                                value={form.nim}
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </div>

                        <InputBox
                            id="email"
                            type="email"
                            placeholder="Contoh: doni@email.com"
                            judul="Email Mahasiswa"
                            value={form.email}
                            autoComplete="email"
                            onChange={handleChange}
                        />

                        <InputBox
                            id="password"
                            type="password"
                            placeholder="Minimal 6 karakter"
                            judul="Password"
                            value={form.password}
                            autoComplete="new-password"
                            onChange={handleChange}
                        />

                        {error && (
                            <div
                                role="alert"
                                className="flex flex-col text-sm bg-error/10 border border-error text-error px-4 py-3 rounded-xl animate-pulse mt-2"
                            >
                                <strong className="font-bold">Perhatian:</strong>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className='mt-6'>
                            <SideBarAuht
                                buttonText={isLoading ? "Sedang Mendaftar..." : "Daftar Sekarang"}
                                tombolKiri={false}
                                onClick={isLoading ? undefined : handleSubmit}
                            />
                        </div>
                    </form>
                </div>

            </div>
        </main>
    );
}