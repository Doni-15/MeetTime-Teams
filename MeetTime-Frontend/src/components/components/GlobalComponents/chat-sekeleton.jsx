export function ChatSkeleton() {
    return (
        <div className="flex flex-col space-y-6 p-4 w-full animate-pulse">
            <div className="flex w-full justify-start gap-2">
                <div className="size-8 rounded-full bg-base-300 shrink-0"></div>
                
                <div className="flex flex-col items-start gap-1 max-w-[70%]">
                    <div className="h-3 w-20 bg-base-300 rounded ml-1"></div>
                    <div className="h-10 w-48 bg-white border border-base-200 rounded-2xl rounded-tl-none"></div>
                </div>
            </div>

            <div className="flex w-full justify-end">
                <div className="max-w-[70%] flex flex-col items-end">
                    <div className="h-14 w-56 bg-primary/10 rounded-2xl rounded-tr-none"></div>
                    <div className="h-2 w-10 bg-base-300 rounded mt-1 mr-1"></div>
                </div>
            </div>

            <div className="flex w-full justify-start gap-2">
                <div className="size-8 rounded-full bg-base-300 shrink-0"></div>
                <div className="flex flex-col items-start gap-1 max-w-[70%]">
                    <div className="h-3 w-24 bg-base-300 rounded ml-1"></div>
                    <div className="h-20 w-64 bg-white border border-base-200 rounded-2xl rounded-tl-none"></div>
                </div>
            </div>

             <div className="flex w-full justify-end">
                <div className="max-w-[70%] flex flex-col items-end">
                    <div className="h-10 w-32 bg-primary/10 rounded-2xl rounded-tr-none"></div>
                </div>
            </div>
        </div>
    );
}