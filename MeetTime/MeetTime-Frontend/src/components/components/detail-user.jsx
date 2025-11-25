import { SignOut } from "@/components";

export function DetailUser({ user, setUser, isOpen  }){
    return(
        <>
            <div className={`
                fixed w-70 rounded-xl pt-3 pb-5 bg-[var(--warna-netral-putih)] z-50 right-10 top-20
                transition-all duration-100 shadow-xl/30 ease-in-out origin-top
                ${isOpen 
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
                    }
            `}>
                <div>
                    <section className="border-b">
                        <h1 className="text-center text-xl font-bold">{user?.name}</h1>
                        <div className="text-center text-lg font-semibold text-gray-700 mb-3 text-wrap px-4">
                            <h1>Ilmu Komputer </h1>
                            <h1>20{user?.nim.slice(0, 2)}</h1>
                        </div>
                    </section>

                    <SignOut setUser={setUser}/>
                </div>
            </div>
        </>
    );
}