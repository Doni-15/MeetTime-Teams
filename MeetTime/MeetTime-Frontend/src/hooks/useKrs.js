import { useState, useEffect, useCallback } from "react";
import { krsService } from "@/services/krsService";
import { toast } from "react-hot-toast";

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
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data KRS");
        } finally {
            setLoading(false);
        }
    }, []);

    const addKrs = async (formData) => {
        setLoading(true);
        try {
            await krsService.create(formData);
            await fetchKrs();
            toast.success("Jadwal berhasil disimpan!"); 
            return true;
        } 
        catch (err) {
            console.error(err);
            toast.error("Gagal menyimpan jadwal");
            setError("Gagal menyimpan data");
            return false;
        } 
        finally {
            setLoading(false);
        }
    };

    const deleteKrs = async (id) => {
        if (!window.confirm("Yakin mau hapus jadwal ini?")) return;

        setLoading(true);
        try {
            await krsService.delete(id);
            setDaftarKrs(prev => prev.filter(item => item.id !== id));
            toast.success("Jadwal dihapus");
        } 
        catch (err) {
            console.error(err);
            toast.error("Gagal menghapus");
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
        addKrs,
        deleteKrs,
        refresh: fetchKrs
    };
}