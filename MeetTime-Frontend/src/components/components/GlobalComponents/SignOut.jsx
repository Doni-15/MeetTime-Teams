import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../hooks/useAuth';

export function SignOut({ setUser }) {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        
        if (setUser) {
            setUser(null);
        }
    };
    
    return (
        <button 
            onClick={handleLogout}
            className="relative z-[9999] group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-error/10 active:scale-[0.98]"
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