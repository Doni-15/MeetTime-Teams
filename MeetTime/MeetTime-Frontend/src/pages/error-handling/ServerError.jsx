export default function ServerError() {
  return (
        <section className="h-screen w-full flex flex-col items-center justify-center bg-[var(--color-base-400)] text-center px-6">
            <h1 className="text-8xl font-extrabold text-red-500 tracking-widest">
                500
            </h1>
            <div className="bg-red-500 px-2 text-xl rounded mt-8">
                Server Error
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold md:text-3xl text-gray-800">
                    Gagal Terhubung ke Server
                </h3>
                <p className="mt-4 text-gray-600">
                    Sepertinya server sedang bermasalah atau koneksi internetmu terputus.
                </p>
                <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 bg-[var(--color-base-300)] hover:bg-[var(--color-base-200)] text-white font-semibold rounded-lg transition duration-300 shadow-lg" >
                    Coba Lagi
                </button>
            </div>
        </section>
  );
}