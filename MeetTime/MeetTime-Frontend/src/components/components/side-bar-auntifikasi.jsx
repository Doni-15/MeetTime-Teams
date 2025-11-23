export function SideBarAunt({navigate, title, subTitle, buttonText, buttonLink, tombolKiri, onClick}){
    return(
        <>
            {tombolKiri === true ? 
                <div className="w-1/2 rounded-r-4xl p-6 bg-[var(--warna-utama)] text-[var(--warna-netral-abu)] flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold tracking-wider">{title}</div>
                    <div className="text-lg font-semibold mt-2">{subTitle}</div>
                    <button onClick={() => navigate(buttonLink)} className="bg-[var(--color-base-300)] py-2 mt-8 px-16 text-base font-semibold rounded-lg mx-auto block hover:bg-[var(--color-base-400)] transition">
                        {buttonText}
                    </button>
                </div>
                :
                <>
                    <button 
                        onClick={onClick}
                        className="w-1/2 bg-[var(--color-base-100)] py-2 text-base font-semibold rounded-lg mx-auto block hover:bg-[var(--color-base-300)] transition text-[var(--warna-netral-abu)]"
                    >
                        {buttonText}
                    </button>
                </>
            }
        </>
    );
}

