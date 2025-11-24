import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
        <section className="h-screen w-full flex flex-col items-center justify-center bg-[var(--color-base-400)] text-center px-6">
            <h1 className="text-9xl font-extrabold text-[var(--warna-utama)] tracking-widest">
                404
            </h1>
            
            <div className="bg-[var(--warna-utama)] px-2 text-xl rounded mt-8">
                Page Not Found
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold md:text-3xl text-gray-800">
                    Ups! Halaman Hilang
                </h3>
                <p className="mt-4 text-gray-800">
                    Halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
                </p>

                <button onClick={() => navigate(-1)} className="mt-8 px-8 py-3 bg-[var(--color-base-300)] hover:bg-[var(--color-base-200)] text-white font-semibold rounded-lg transition duration-300 shadow-lg" >
                    Kembali
                </button>
            </div>
        </section>
  );
}