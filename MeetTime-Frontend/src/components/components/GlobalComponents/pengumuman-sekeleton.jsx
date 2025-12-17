export function AnnouncementSkeleton({ isAdmin }) {
    return (
        <div className="space-y-6 animate-pulse w-full">
            {isAdmin && (
                <div className="bg-white border border-orange-100 p-5 rounded-2xl shadow-sm">
                    <div className="h-4 w-48 bg-orange-100/50 rounded mb-4"></div>
                    <div className="h-24 w-full bg-base-200/50 rounded-xl mb-3"></div>
                    <div className="flex justify-end">
                        <div className="h-9 w-28 bg-orange-200 rounded-xl"></div>
                    </div>
                </div>
            )}

            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-base-200 p-5 rounded-2xl shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-200"></div>
                    
                    <div className="flex justify-between items-start mb-4 pl-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-base-200 shrink-0"></div>
                            <div className="flex flex-col gap-2">
                                <div className="h-3 w-24 bg-base-200 rounded"></div>
                                <div className="h-3 w-16 bg-orange-100 rounded"></div>
                            </div>
                        </div>
                        <div className="h-3 w-20 bg-base-200 rounded"></div>
                    </div>

                    <div className="space-y-2 pl-3">
                        <div className="h-3 w-full bg-base-200/60 rounded"></div>
                        <div className="h-3 w-[90%] bg-base-200/60 rounded"></div>
                        <div className="h-3 w-[60%] bg-base-200/60 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}