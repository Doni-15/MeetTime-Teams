export function CardKrs({ data, onDelete }) {
    
    return(
        <>
            <div className="flex bg-slate-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
                <div className="bg-[var(--color-base-content)] w-24 flex flex-col justify-center items-center border-r border-blue-100 p-2 text-[var(--color-base-200)] shrink-0 gap-1">
                    <span className="text-lg font-bold leading-none">
                        {data.jamMulai?.slice(0, 5)} 
                    </span>
                    
                    <div className="h-4 w-px bg-blue-300 my-0.5"></div> 
                    
                    <span className="text-lg font-bold leading-none text-[var(--color-base-300)] ">
                        {data.jamSelesai?.slice(0, 5)}
                    </span>

                </div>

                <div className="p-4 flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg truncate">{data.mataKuliah}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{`Setiap hari ${data.hari}`}</span>
                    </div>
                </div>

                <div className="flex items-center pr-4">
                    <button 
                        onClick={onDelete}
                        className="p-2 text-red-300 hover:text-[var(--color-error)] hover:bg-red-50 rounded-full transition-colors cursor-pointer" 
                        title="Hapus Agenda"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>        
        </>
    );
}