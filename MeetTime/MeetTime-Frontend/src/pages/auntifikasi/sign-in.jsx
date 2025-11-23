import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { InputBox, SideBarAunt } from "@/components";
import { useState, useEffect } from 'react';

export function SignIn({ setUser }){

    const navigate = useNavigate();
    const [form, setForm] = useState({
        nim : "",
        password : "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        setForm({
            nim: "",
            password: ""
        });
        setError("");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nim && !form.password) {
            setError("NIM dan Password wajib diisi!");
            return;
        }

        if (!form.nim) {
            setError("NIM wajib diisi!");
            return;
        }

        if (!form.password) {
            setError("Password wajib diisi!");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/auth/login", 
                form,
                {withCredentials: true}
            );

            setUser(res.data.user);
            navigate("/pages/dashboard");
            
        } catch (error) {
            setError("NIM atau Password salah")
        }
    }

    return(
        <>
            <section className="w-screen h-screen bg-[var(--color-base-400)] flex flex-col items-center justify-center">
                <div className="flex px-15 my-5 w-full">
                    <div className="w-1/2 rounded-l-4xl py-10 px-8 bg-[var(--warna-netral-abu)]">
                        <h1 className="text-2xl font-bold tracking-wider mb-5 text-center">LOGIN</h1>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            <InputBox
                                type="text"
                                placeholder="Ex: 1234567890"
                                judul="NIM"
                                value={form.nim}
                                autoComplete="off"
                                onChange={(e) => {
                                    const hanyaAngka = e.target.value.replace(/[^0-9]/g, '');
                                    
                                    setForm({
                                        ...form,
                                        nim: hanyaAngka,
                                    })
                                }}
                            />
    
                            <InputBox
                                type="password"
                                placeholder="Masukkan Password"
                                judul="Password"
                                value={form.password}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </form>
    
                        <h1 className='text-right text-base my-5 text-[var(--color-base-300)] hover:text-[var(--color-base-200)] hover:underline hover:cursor-pointer font-semibold tracking-wider'>
                            Lupa Password?
                        </h1>

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
                            buttonText="Sign In"
                            tombolKiri={false}
                            onClick={handleSubmit}
                        />
                    </div>
                    <SideBarAunt 
                        title="Belum Memiliki Akun?"
                        subTitle="Sign Up Untuk Memulai"
                        buttonText="Sign Up"
                        buttonLink="/auntifikasi/sign-up"
                        navigate={navigate}
                        tombolKiri={true}
                    />
                </div>
            </section>
        </>
    );

}