export function GroupSkeleton() {
    return (
        <section className="h-full w-full bg-netral-putih rounded-3xl shadow-xl border border-base-200 flex flex-col overflow-hidden animate-pulse relative">
            <div className="h-[88px] border-b border-base-200 flex items-center justify-between px-6 bg-white">
                <div className="flex items-center gap-6">
                    <div className="h-6 w-24 bg-base-200 rounded-lg"></div>
                    <div className="h-6 w-32 bg-base-200 rounded-lg"></div>
                </div>
                <div className="hidden md:block h-10 w-48 bg-base-200 rounded-xl"></div>
            </div>

            <div className="flex-1 p-6 bg-base-400/10 overflow-hidden">
                
                <div className="flex justify-between mb-6">
                    <div className="h-10 w-full md:w-1/3 bg-white border border-base-200 rounded-xl"></div>
                    <div className="flex gap-2">
                        <div className="h-10 w-24 bg-base-200 rounded-xl"></div>
                        <div className="h-10 w-24 bg-base-200 rounded-xl"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-base-200 shadow-sm">
                            <div className="size-12 rounded-full bg-base-200 shrink-0"></div>
                            
                            <div className="flex flex-col gap-2 w-full">
                                <div className="h-4 w-3/4 bg-base-200 rounded"></div>
                                <div className="h-3 w-1/2 bg-base-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-20 border-t border-base-200 flex items-center justify-center px-6 bg-white">
                <div className="h-12 w-full bg-base-200 rounded-xl opacity-60"></div>
            </div>

        </section>
    );
}