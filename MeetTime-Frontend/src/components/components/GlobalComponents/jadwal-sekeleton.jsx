export function JadwalSkeleton() {
    return (
        <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-sm flex items-center justify-between animate-pulse">
            <div className="flex flex-col gap-3 w-full">
                <div className="h-5 w-3/4 bg-gray-200/80 rounded-md"></div>
                
                <div className="flex items-center gap-3 mt-1">
                    <div className="h-4 w-8 bg-gray-200/80 rounded-md"></div>
                    <div className="h-4 w-24 bg-gray-200/80 rounded-md"></div>
                    <div className="h-4 w-16 bg-gray-200/80 rounded-md"></div>
                </div>
            </div>

            <div className="h-10 w-10 bg-gray-200/80 rounded-xl shrink-0 ml-4"></div>
        </div>
    );
}