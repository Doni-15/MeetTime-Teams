import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';

export function MemberCard({ name, nim, status = "confirmed", role, onKick }) {
    
    const initial = name ? name.charAt(0).toUpperCase() : "?";

    return (
        <div className="group flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all duration-300">
            
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <div className={`
                    shrink-0 size-10 md:size-12 rounded-full flex items-center justify-center text-lg font-bold border-2 border-white shadow-sm
                    ${role === 'admin' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'bg-gray-100 text-gray-500' 
                    }
                `}>
                    {initial}
                </div>

                <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-gray-900 text-base md:text-lg truncate group-hover:text-[var(--color-primary)] transition-colors" title={name}>
                        {name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-medium tracking-wide">{nim}</span>
                        
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>

                        {role === 'admin' ? (
                            <span className="bg-orange-50 text-orange-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border border-orange-100 tracking-wider">
                                Admin
                            </span>
                        ) : (
                            <span></span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 pl-2">
                {status === "confirmed" && (
                    <div className="tooltip tooltip-left" data-tip="Terkonfirmasi">
                        <CheckBadgeIcon className="size-6 text-green-500" />
                    </div>
                )}
                
                {onKick && (
                    <>
                        <div className="w-px h-8 bg-gray-200 mx-1 hidden sm:block"></div>
                        <button 
                            onClick={onKick}
                            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                            title="Keluarkan Anggota"
                        >
                            <TrashIcon className="size-5" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}