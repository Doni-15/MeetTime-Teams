export function SideBarAuht({ navigate, title, subTitle, buttonText, buttonLink, tombolKiri, onClick }) {
    return (
        <>
            {tombolKiri === true ? (
                <div className="flex flex-col items-center justify-center text-center h-full w-full gap-6">
                    
                    <div className="space-y-2">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-wide text-netral-putih">
                            {title}
                        </h2>
                        <p className="text-netral-abu text-base lg:text-lg font-medium max-w-xs mx-auto leading-relaxed">
                            {subTitle}
                        </p>
                    </div>

                    <button 
                        onClick={() => navigate(buttonLink)} 
                        className="mt-4 px-10 py-3 rounded-xl font-bold bg-base-300 text-custom-text shadow-lg hover:bg-base-200 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 ease-out"
                    >
                        {buttonText}
                    </button>

                </div>
            ) : (
                <button 
                    onClick={onClick}
                    className="w-full py-3.5 px-6 rounded-xl text-base font-bold tracking-wide shadow-md transition-all duration-300 ease-in-out
                    bg-primary text-primary-content 
                    hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5
                    active:bg-primary/100 active:translate-y-0 active:shadow-sm"
                >
                    {buttonText}
                </button>
            )}
        </>
    );
}