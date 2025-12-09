import { Outlet } from "react-router-dom";

export default function GroupLayout({user, setUser}){
    return(
        <>
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 py-6 md:px-8 md:py-10">
                <Outlet />
            </main>
        </>
    );
}