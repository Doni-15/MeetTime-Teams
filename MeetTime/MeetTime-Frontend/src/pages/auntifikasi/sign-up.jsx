import { useNavigate } from 'react-router-dom';
import { InputBox } from "@/components";

export function SignUp(){
    const navigate = useNavigate();

    return(
        <>
            <section className="w-screen h-screen bg-[var(--color-base-400)] flex items-center justify-center">
                <div className="flex mx-15 my-5 w-full">
                    <div className="w-1/2 rounded-l-4xl py-10 px-8 bg-[var(--warna-netral-abu)]">
                        <h1 className="text-5xl font-bold tracking-wider mb-8">REGISTRASI</h1>
                        <form action="" className='flex flex-col gap-5'>
                            <InputBox type="text" placeholder="Nama Lengkap"/>
                            <InputBox type="email" placeholder="usaha@gmail.com"/>
                            <InputBox type="password" placeholder="Buat Password Kuat"/>
                            <InputBox type="password" placeholder="Konfirmasi Password"/>
                        </form>

                        <div className='mt-10'>
                            <button onClick={() => navigate('/auntifikasi/sign-in')} className="bg-[var(--color-base-100)] hover:bg-blue-900 py-2 px-16 text-xl font-semibold rounded-lg mx-auto block hover:bg-[var(--color-base-400)] transition text-[var(--warna-netral-abu)]">
                                Sign Up
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2 rounded-r-4xl p-6 bg-[var(--warna-utama)] text-[var(--warna-netral-abu)] flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold tracking-wider">Belum Memiliki Akun?</div>
                        <div className="text-xl font-semibold mt-2">Sign Up Untuk Memulai</div>
                        <button onClick={() => navigate('/auntifikasi/sign-in')}  className="bg-[var(--color-base-300)] py-2 mt-8 px-16 text-xl font-semibold rounded-lg mx-auto block hover:bg-[var(--color-base-400)] transition">
                            Sign In
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
