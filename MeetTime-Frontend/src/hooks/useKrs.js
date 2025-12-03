import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { krsService } from "@/services/krsService";
import Swal from "sweetalert2";

export function useKrs() {
    const [daftarKrs, setDaftarKrs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchKrs = useCallback(async () => {
        setLoading(true);
        try {
            const data = await krsService.getAll();
            setDaftarKrs(data);
            setError(null);
        } 
        catch (err) {
            setError("Gagal memuat data KRS");
        } 
        finally {
            setLoading(false);
        }
    }, []);

    const addKrs = async (formData) => {
        const loadingToast = toast.loading('Menyimpan jadwal...');
        setLoading(true);

        try {
            await krsService.create(formData);
            await fetchKrs();

            toast.success("Jadwal berhasil disimpan!", {
                id: loadingToast, 
            });

            return true;
        } 
        catch (err) {
            const errorMsg = err.response?.data?.message || "Gagal menyimpan data";
            
            toast.error(errorMsg, {
                id: loadingToast,
            });
            
            setError(errorMsg);
            return false;
        } 
        finally {
            setLoading(false);
        }
    };

    const deleteKrs = async (id) => {
        const result = await Swal.fire({
            title: 'Hapus Jadwal?',
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-info)',
            cancelButtonColor: 'var(--color-error)',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        });

        if (!result.isConfirmed) {
            return;
        }

        const loadingToast = toast.loading('Menghapus...');
        setLoading(true);
        
        try {
            await krsService.delete(id);
            setDaftarKrs(prev => prev.filter(item => item.id !== id));
            
            toast.success("Jadwal dihapus", {
                id: loadingToast,
            });
        } 
        catch (err) {
            toast.error("Gagal menghapus", {
                id: loadingToast,
            });
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKrs();
    }, [fetchKrs]);

    return {
        daftarKrs,
        loading,
        error,
        fetchKrs,
        addKrs,
        deleteKrs,
        refresh: fetchKrs
    };
}