import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { CaraKerjaData } from "@/components";

export function CaraKerja() {
    return(
        <>
            <section className="bg-[var(--color-warning-content)] px-5 pt-3 pb-10 rounded-xl">
                <div className="flex justify-between items-center text-black">
                    <h1 className="font-semibold text-xl">Bagaimana cara kerjanya?</h1>
                    <ExclamationCircleIcon className="size-8 text-orange-700" />                 
                </div>
                <section className='max-h-[45vh] mt-1'>
                    {CaraKerjaData.map((item) => (
                        <div key={item.id} className="flex grid grid-cols-3 mb-2">
                            <div className={item.className}>
                                {item.range}
                            </div>
                            <div className="col-span-2">
                                <div className="text-xl font-semibold">{item.area}</div>
                                <div className="text-base">{item.statusArea}</div>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </>
    );
}

