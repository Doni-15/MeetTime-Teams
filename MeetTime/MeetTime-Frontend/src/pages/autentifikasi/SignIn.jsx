import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InputBox, SideBarAunt } from "@/components";
import api from "@/config/api";

export function SignIn({ setUser }){
    const navigate = useNavigate();

    const [form, setForm] = useState({
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

        if (!form.nim || !form.password) {
            setError("NIM dan Password wajib diisi!");
            return;
        }

        setIsLoading(true);

        try {
            const res = await api.post("/auth/login", form);
            setUser(res.data.user);
            navigate("/pages/dashboard", { replace: true });  
        } 
        catch (err) {
            if (!err.response) {
                setError("Gagal terhubung ke server (Cek koneksi internet)");
            } 
            else {
                setError(err.response?.data?.message || "NIM atau Password salah");
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return(
        <>
            <section className="w-screen h-screen bg-[var(--color-base-400)] flex flex-col items-center justify-center">
                <div className="flex px-15 my-5 w-full">
                    <div className="w-1/2 rounded-l-4xl py-10 px-8 bg-[var(--warna-netral-abu)]">
                        <h1 className="text-2xl font-bold tracking-wider mb-5 text-center">LOGIN</h1>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mb-10'>
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
                                judul="Password"
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
                        
                        <SideBarAunt 
                            buttonText={isLoading ? "Memproses..." : "Sign In"}
                            tombolKiri={false}
                            onClick={isLoading ? null : handleSubmit}
                        />
                    </div>
                    <SideBarAunt 
                        title="Belum Memiliki Akun?"
                        subTitle="Sign Up Untuk Memulai"
                        buttonText="Sign Up"
                        buttonLink="/autentifikasi/sign-up"
                        navigate={navigate}
                        tombolKiri={true}
                    />
                </div>
            </section>
        </>
    );

}