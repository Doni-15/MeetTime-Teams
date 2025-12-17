import { CalendarDaysIcon, XMarkIcon, UserIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

export function DetailSibuk({ slot, onClose }) {
    if (!slot) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-white/20">
                <div className="bg-[var(--color-primary)] p-6 flex justify-between items-start text-white">
                    <div>
                        <h3 className="font-bold text-xl tracking-tight">Detail Ketersediaan</h3>
                        <div className="flex items-center gap-2 mt-1 text-white/80 text-sm font-medium">
                            <CalendarDaysIcon className="size-4" />
                            <span>{slot.day}, {slot.timeLabel}</span>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <XMarkIcon className="size-6 text-white" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center">
                            <span className="block text-3xl font-bold text-emerald-700">{slot.availableCount}</span>
                            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Tersedia</span>
                        </div>
                        <div className="flex-1 bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center">
                            <span className="block text-3xl font-bold text-rose-700">{slot.busyCount}</span>
                            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Sibuk</span>
                        </div>
                    </div>

                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">
                        Siapa yang sibuk?
                    </h4>

                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                        {slot.busyUsers.length === 0 ? (
                            <div className="text-center py-8 bg-emerald-50 rounded-xl border border-emerald-100">
                                <CheckCircleIcon className="size-10 text-emerald-600 mx-auto mb-2 opacity-50" />
                                <p className="text-emerald-800 font-bold">Semua anggota tersedia! 🎉</p>
                                <p className="text-emerald-600 text-xs mt-1">Waktu yang tepat untuk rapat.</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {slot.busyUsers.map((user, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white p-2 rounded-full text-gray-500 border border-gray-200">
                                                <UserIcon className="size-4" />
                                            </div>
                                            <span className="font-bold text-gray-800 text-sm">{user.name}</span>
                                        </div>
                                        <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide border ${user.activity === 'kuliah' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                            {user.activity === 'kuliah' ? 'Kuliah' : 'Agenda'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold rounded-xl text-sm shadow-sm transition-all">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}