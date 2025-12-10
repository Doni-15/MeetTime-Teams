import { TrashIcon, CalendarDaysIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';

export function CardAgenda({ data, onDelete }) {
    const formatTanggalIndo = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short', 
            year: 'numeric'
        });
    };

    return (
        <div className="group relative flex items-center bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-emerald-400 hover:-translate-y-1">
            <div className="w-24 md:w-28 self-stretch bg-emerald-50 flex flex-col justify-center items-center p-3 text-emerald-600 border-r border-emerald-100 shrink-0">
                <span className="text-lg md:text-xl font-bold tracking-tight">
                    {data.jamMulai?.slice(0, 5)}
                </span>
                <ArrowLongRightIcon className="size-4 my-1 opacity-40 rotate-90" />
                <span className="text-base md:text-lg font-semibold opacity-70">
                    {data.jamSelesai?.slice(0, 5)}
                </span>
            </div>

            <div className="flex-1 p-4 md:p-5 min-w-0 flex flex-col justify-center gap-1">
                <h3 className="font-bold text-gray-900 text-lg md:text-xl leading-snug truncate group-hover:text-emerald-600 transition-colors" title={data.namaKegiatan}>
                    {data.namaKegiatan}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    <CalendarDaysIcon className="size-4 shrink-0" />
                    <span className="truncate">
                        {data.hari}, <span className="text-gray-900 font-semibold">{formatTanggalIndo(data.tanggal)}</span>
                    </span>
                </div>
            </div>

            <div className="pr-4 md:pr-6 pl-2">
                <button
                    type="button"
                    onClick={() => onDelete(data.id)}
                    className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200" 
                    title="Hapus Agenda"
                >
                    <TrashIcon className="size-6" />
                </button>
            </div>
            
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
        </div>        
    );
}