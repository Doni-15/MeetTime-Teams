import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/components"

export default function MainLayout(){
    return(
        <>
            <Header />
            <main className="pt-30 pb-10">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}