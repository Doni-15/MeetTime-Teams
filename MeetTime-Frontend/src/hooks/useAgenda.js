import { useState, useEffect, useCallback} from 'react';
import { toast } from 'react-hot-toast';
import { agendaService } from '../services/agendaServices';
import Swal from 'sweetalert2'; 

export function useAgenda() {
    const [daftarAgenda, setDaftarAgenda] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deletedHistory, setDeletedHistory] = useState([]); 

    const fetchAgenda = useCallback(async () => {
        setLoading(true);
        try {
            const data = await agendaService.getAll();
            setDaftarAgenda(data);
            setError(null);
        } 
        catch (err) {
            setError('Gagal memuat data agenda');
        } 
        finally {
            setLoading(false);
        }
    }, []);

    const fetchHistory = useCallback(async () => {
        try {
            const data = await agendaService.getHistory();
            setDeletedHistory(data);
        } catch (err) {
        }
    }, []);

    const addAgenda = async (formData) => {
        const loadingToast = toast.loading('Menyimpan agenda...');
        setLoading(true);

        try {
            await agendaService.create(formData);
            await fetchAgenda();

            toast.success('Agenda berhasil disimpan!', {
                id: loadingToast,
            });

            return true;
        } 
        catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal menyimpan data';
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

    const deleteAgenda = async (id) => {
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
            await agendaService.delete(id);
            
            setDaftarAgenda(prev => prev.filter(agenda => agenda.id !== id));
            fetchHistory(); 

            toast.success('Agenda berhasil dihapus!', {
                id: loadingToast,
            });
        }
        catch (err) {
            toast.error('Gagal menghapus agenda', {
                id: loadingToast,
            });
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgenda();
    }, [fetchAgenda]);

    return {
        daftarAgenda,
        loading,
        error,
        fetchAgenda,
        addAgenda,
        deleteAgenda,
        refresh: fetchAgenda,
        deletedHistory,
        fetchHistory
    };
}