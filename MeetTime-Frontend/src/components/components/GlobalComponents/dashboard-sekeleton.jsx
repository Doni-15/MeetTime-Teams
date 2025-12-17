export function DashboardSkeleton() {
    const daysPlaceholder = [1, 2, 3, 4, 5, 6];

    return (
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 animate-pulse">
            {daysPlaceholder.map((i) => (
                <div key={i} className="flex flex-col gap-3 min-w-[140px]">
                    <div className="h-6 w-20 bg-base-200 rounded-md mx-auto mb-1"></div>
                    <div className="p-3 rounded-xl border border-base-200 bg-white h-24 flex flex-col gap-2">
                        <div className="h-5 w-16 bg-base-200 rounded-md"></div>
                        <div className="h-4 w-full bg-base-200 rounded mt-1"></div>
                        <div className="h-4 w-2/3 bg-base-200 rounded"></div>
                    </div>

                    <div className="p-3 rounded-xl border border-base-200 bg-white h-20 flex flex-col gap-2 opacity-60">
                         <div className="h-5 w-16 bg-base-200 rounded-md"></div>
                         <div className="h-4 w-3/4 bg-base-200 rounded mt-1"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}