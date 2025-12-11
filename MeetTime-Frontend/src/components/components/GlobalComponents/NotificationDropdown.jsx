import { TrashIcon, BellSlashIcon, InformationCircleIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

export function NotificationList({ data }) {
    const renderNotificationItem = (item) => {
        let style = {
            icon: <InformationCircleIcon className="size-5" />,
            bgIcon: "bg-blue-50",
            textIcon: "text-blue-500",
            borderIcon: "border-blue-100",
            lineColor: "bg-blue-500",
            content: <span className="text-gray-600">Info baru</span>,
            time: new Date().toISOString()
        };

        if (item.deleted_at) {
            style = {
                icon: <TrashIcon className="size-5" />,
                bgIcon: "bg-red-50",
                textIcon: "text-red-500",
                borderIcon: "border-red-100",
                lineColor: "bg-red-500",
                content: (
                    <>
                        Agenda <span className="font-bold text-gray-900">"{item.nama_kegiatan}"</span> sudah kadaluarsa.
                    </>
                ),
                time: item.deleted_at
            };
        }
        
        else if (item.type === 'chat') {
            style = {
                icon: <ChatBubbleLeftEllipsisIcon className="size-5" />,
                bgIcon: "bg-green-50",
                textIcon: "text-green-500",
                borderIcon: "border-green-100",
                lineColor: "bg-green-500",
                content: (
                    <>
                        Pesan baru dari <span className="font-bold text-gray-900">{item.sender}</span>
                    </>
                ),
                time: item.created_at
            };
        }

        return (
            <div key={item.id} className="group relative px-5 py-4 border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-default">
                <div className="flex gap-4 items-start">
                    <div className="shrink-0">
                        <div className={`size-10 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${style.bgIcon} ${style.textIcon} ${style.borderIcon}`}>
                            {style.icon}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 leading-snug">
                            {style.content}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="size-1.5 rounded-full bg-gray-300"></span>
                            <p className="text-[11px] text-gray-400 font-medium">
                                {new Date(style.time).toLocaleString('id-ID', {
                                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className={`absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity ${style.lineColor}`}></div>
            </div>
        );
    };

    return (
        <div className="absolute top-20 right-8 mt-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right z-[100]">
            <div className="px-5 py-4 border-b border-gray-100 bg-white flex justify-between items-center sticky top-0 z-10">
                <div>
                    <h3 className="font-bold text-gray-800 text-base">Notifikasi</h3>
                    <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                        Update terbaru untuk kamu
                    </p>
                </div>
                {data.length > 0 && (
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full border border-primary/20">
                        {data.length} Baru
                    </span>
                )}
            </div>
            
            <div className="max-h-[350px] overflow-y-auto custom-scrollbar bg-gray-50/30">
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-3 shadow-inner">
                            <BellSlashIcon className="size-8 text-gray-400" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Tidak ada notifikasi</h4>
                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                            Saat ini belum ada pembaruan aktivitas apapun.
                        </p>
                    </div>
                ) : (
                    data.map((item) => renderNotificationItem(item))
                )}
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-center border-t border-gray-100"></div>
        </div>
    );
}