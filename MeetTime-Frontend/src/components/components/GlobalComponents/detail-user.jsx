import { SignOut } from "./SignOut";

export function DetailUser({ user, setUser, isOpen, onClose }) {
    const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <>
            {isOpen && 
                <div 
                    className="fixed inset-0 z-[9998] bg-transparent" 
                    onClick={onClose}
                ></div>
            }

            <div className={`
                fixed z-[9999] w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 
                top-[90px] right-4 md:right-8
                transition-all duration-300 ease-cubic-bezier(0.4, 0, 0.2, 1) origin-top-right
                ${isOpen
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
                }
            `}>
                <div className="flex flex-col overflow-hidden">
                    <section className="p-6 flex flex-col items-center border-b border-gray-300 bg-gray-50/50">
                        <div className="relative mb-4 select-none ">
                            <div className="size-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gray-100">
                                <div className="size-full rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
                                    <span className="text-4xl font-bold tracking-tighter">
                                        {initial}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-1 right-1 size-5 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>

                        <h1 className="text-center text-lg font-bold text-gray-900 w-full truncate px-2">
                            {user?.name || "Nama Pengguna"}
                        </h1>
                        
                        <div className="mt-2 text-center space-y-1">
                            <p className="text-sm font-semibold text-gray-700">{user?.jurusan}</p>
                            <p className="text-xs font-bold text-gray-600 bg-gray-200 px-3 py-1 rounded-full inline-block border border-gray-300/50">
                                Angkatan 20{user?.nim ? user.nim.slice(0, 2) : "XX"}
                            </p>
                        </div>
                    </section>

                    <div className="p-4 bg-white">
                        <SignOut setUser={setUser} />
                    </div>
                </div>
            </div>
        </>
    );
}