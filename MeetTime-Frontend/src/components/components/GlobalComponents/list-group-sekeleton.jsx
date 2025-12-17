export function ListGroupSkeleton() {
    return (
        <div className="flex flex-col gap-3 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="w-full p-4 rounded-xl border border-base-200 bg-base-400/10">
                    <div className="flex justify-between items-center">
                        <div className='flex flex-col gap-2 w-full'>
                            <div className="flex justify-between items-center"></div>
                            <div className="h-4 w-16 bg-base-200 rounded-md"></div>
                        </div>
                        <div className="h-5 w-5 bg-base-200 rounded-full shrink-0"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}