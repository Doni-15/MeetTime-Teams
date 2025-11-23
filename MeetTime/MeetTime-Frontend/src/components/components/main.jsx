import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/components"

export default function MainLayout({ user, setUser }){
    return(
        <>
            <Header user={user} />
            <main className="pt-30 pb-10">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}