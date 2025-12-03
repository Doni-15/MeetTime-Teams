import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from "../../../config/api";

export function SignOut({ setUser }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            
            if (setUser) {
                setUser(null);
            }
            
            toast.success("Logout berhasil!");
            navigate("/autentifikasi/sign-in", { replace: true });
        } 
        catch (error) {
            console.error("Logout error:", error);
            if (setUser) {
                setUser(null);
            }
            navigate("/autentifikasi/sign-in");
        }
    };
    
    return (
        <button 
            onClick={handleLogout}
            className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-error/10 active:scale-[0.98]"
            type="button"
        >
            <div className="flex items-center justify-center size-9 rounded-full bg-error/10 text-error group-hover:bg-error group-hover:text-white transition-colors duration-200 shadow-sm">
                <ArrowRightOnRectangleIcon className="size-5" />
            </div>

            <div className="flex flex-col items-start text-left">
                <span className="text-sm font-bold text-error">
                    Sign Out
                </span>
                <span className="text-[10px] font-medium text-neutral/50 group-hover:text-error/70">
                    Keluar dari sesi ini
                </span>
            </div>
        </button>
    );
}