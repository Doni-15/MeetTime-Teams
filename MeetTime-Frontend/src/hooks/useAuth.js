import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authServices";

export function useAuth() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (formData, setUser) => {
        const loadingToast = toast.loading('Sedang masuk...');
        setLoading(true);
        setError(null);

        try {
            if (!formData.nim || !formData.password) {
                throw new Error("NIM dan Password wajib diisi!");
            }

            const data = await authService.login(formData);
            
            if (setUser) setUser(data.user);

            toast.success("Login berhasil!", { id: loadingToast });
            navigate("/pages/dashboard", { replace: true });
            return true;
        } 
        catch (err) {
            const errorMsg = err.response?.data?.message || "Gagal login";
            toast.error(errorMsg, { id: loadingToast });
            setError(errorMsg);
            return false;
        } 
        finally {
            setLoading(false);
        }
    };

    const register = async (formData) => {
        if (!formData.name || !formData.jurusan || !formData.nim || !formData.password) {
            toast.error("Semua data wajib diisi!");
            return false;
        }

        const loadingToast = toast.loading('Mendaftarkan akun...');
        setLoading(true);
        setError(null);

        try {
            await authService.register(formData);
            toast.success("Akun berhasil dibuat!", { id: loadingToast });
            navigate("/autentifikasi/sign-in", { replace: true });
            return true;
        } 
        catch (err) {
            const errorMsg = err.response?.data?.message || "Gagal mendaftar";
            toast.error(errorMsg, { id: loadingToast });
            setError(errorMsg);
            return false;
        } 
        finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        const loadingToast = toast.loading('Keluar sesi...');
        setLoading(true);
        
        try {
            await authService.logout();
            toast.success("Logout berhasil!", { id: loadingToast });
        } 
        catch (err) {
            toast.success("Logout berhasil!", { id: loadingToast });
        } 
        finally {
            setLoading(false);
            navigate("/autentifikasi/sign-in", { replace: true });
        }
    };

    return { 
        loading, 
        error, 
        login, 
        register,
        logout
    };
}