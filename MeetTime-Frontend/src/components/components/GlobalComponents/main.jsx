import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export default function MainLayout({ user, setUser }) {
    return (
        <div className="flex flex-col min-h-screen w-full bg-base-400 text-custom-text font-sans">
            <Header user={user} setUser={setUser} />

            <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 py-6 md:px-8 md:py-10">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}