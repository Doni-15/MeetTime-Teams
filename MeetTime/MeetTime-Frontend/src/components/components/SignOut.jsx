import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import api from "@/config/api";

export function SignOut({ setUser }){
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            
            if (setUser) {
                setUser(null);
            }
            
            navigate("/autentifikasi/sign-in", { replace: true });
        } 
        catch (error) {

            if (setUser) {
                setUser(null);
            }

            navigate("/autentifikasi/sign-in");
        }
    };
    return(
        <>
            <div 
                onClick={handleLogout}
                className='mt-2 px-4 flex items-center mx-2 cursor-pointer py-1 rounded-lg hover:bg-[var(--warna-netral-abu)]'
            >
                <div className='size-6 border rounded-full mr-2 flex items-center justify-center'>
                    <ArrowRightOnRectangleIcon className='size-5'/>
                </div>
                <h1 className='text-lg font-semibold'>Sign Out</h1>
            </div>
        </>
    );
}