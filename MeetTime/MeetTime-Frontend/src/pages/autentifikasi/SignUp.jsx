import { useNavigate } from 'react-router-dom';
import { InputBox, SideBarAunt } from "@/components";
import { useState } from 'react';
import api from "@/config/api";

const maxNIM = 20;
const minPassword = 6;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUp(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name : "",
        email : "",
        nim : "",
        password : "",
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

        if(form.nim.length > maxNIM){
            setError(`NIM tidak boleh lebih dari ${maxNIM} karakter!`);
            return;
        }

        if(form.password.length <= minPassword) {
            setError(`Password harus lebih dari ${minPassword} karakter!`);
            return;
        }

        setIsLoading(true);

        try {
            await api.post("/auth/register", form);            
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

    return(
        <>
            <section className="w-screen h-screen bg-[var(--color-base-400)] flex items-center justify-center">
                <div className="flex mx-15 my-5 w-full">
                    <div className="w-1/2 rounded-l-4xl py-10 px-8 bg-[var(--warna-netral-abu)]">
                        <h1 className="text-2xl font-bold tracking-wider mb-5 text-center">REGISTRASI</h1>
                        
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5' autoComplete="off">
                            <InputBox
                                id="name"
                                type="text"
                                placeholder="Ex: Doni Simamora" 
                                judul="Nama Lengkap"
                                value={form.name}
                                autoComplete="off"
                                onChange={handleChange}
                            />

                            <InputBox
                                id="email"
                                type="email" 
                                placeholder="Ex: donisimamora@gmail.com" 
                                judul="Email"
                                value={form.email}
                                autoComplete="off"
                                onChange={handleChange}
                            />

                            <InputBox
                                id="nim"
                                type="text" 
                                placeholder="Ex: 1234567890" 
                                judul="NIM"
                                value={form.nim}
                                autoComplete="off"
                                onChange={handleChange}
                            />

                            <InputBox
                                id="password"
                                type="password" 
                                placeholder="Masukkan Password" 
                                judul="Masukkan Password"
                                value={form.password}
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                        </form>

                        {error && (
                            <div 
                                className="flex flex-col text-center bg-red-100 border border-[var(--color-error)] text-[var(--color-error)] px-4 py-3 rounded-lg relative mb-8 mt-4" 
                                role="alert"
                            >
                                <strong className="font-bold text-lg">Terjadi Kesalahan!</strong>
                                <span className="block sm:inline text-base">{error}</span>
                            </div>
                        )}

                        <div className='mt-10'>
                            <SideBarAunt 
                                buttonText={isLoading ? "Memproses..." : "Sign Up"}
                                tombolKiri={false}
                                onClick={isLoading ? null : handleSubmit}
                            />
                        </div> 
                    </div>
                    
                    <SideBarAunt 
                        title="Sudah Memiliki Akun?"
                        subTitle="Sign In Untuk Masuk"
                        buttonText="Sign In"
                        buttonLink="/autentifikasi/sign-in"
                        navigate={navigate}
                        tombolKiri={true}
                    />
                </div>
            </section>
        </>
    );
}