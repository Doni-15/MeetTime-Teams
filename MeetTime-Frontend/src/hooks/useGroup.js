import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2'; 
import { groupService } from '../services/groupService';

export function useGroup() {
    const [myGroups, setMyGroups] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [searchResults, setSearchResults] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMyGroups = useCallback(async () => {
        setLoading(true);
        try {
            const response = await groupService.getMyGroups();
            setMyGroups(response.groups || response); 
            setError(null);
        } catch (err) {
            setError('Gagal memuat daftar grup');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMembers = useCallback(async (groupId) => {
        setLoading(true);
        try {
            const response = await groupService.getMembers(groupId);
            setGroupMembers(response.members || response);
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }, []);

    const createGroup = async (formData) => {
        const loadingToast = toast.loading('Membuat grup...');
        setLoading(true);
        try {
            const response = await groupService.create(formData);
            await fetchMyGroups();
            toast.success('Grup berhasil dibuat!', { id: loadingToast });
            return response.group || response; 
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal membuat grup';
            toast.error(errorMsg, { id: loadingToast });
            return null;
        } finally {
            setLoading(false);
        }
    };

    const joinGroup = async (kodeGrup) => {
        const loadingToast = toast.loading('Bergabung ke grup...');
        setLoading(true);
        try {
            await groupService.join({ kodeGrup });
            await fetchMyGroups();
            toast.success('Berhasil bergabung!', { id: loadingToast });
            return true;
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal bergabung';
            toast.error(errorMsg, { id: loadingToast });
            return false;
        } finally {
            setLoading(false);
        }
    };

    const kickMember = async (groupId, targetUserId) => {
        const result = await Swal.fire({
            title: 'Keluarkan Anggota?',
            text: "Anggota ini akan dihapus dari grup.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Keluarkan!',
            cancelButtonText: 'Batal'
        });

        if (!result.isConfirmed) return;

        const loadingToast = toast.loading('Mengeluarkan anggota...');
        setLoading(true);
        try {
            await groupService.kickMember(groupId, targetUserId);
            setGroupMembers(prev => prev.filter(member => member.id !== targetUserId));
            toast.success('Anggota berhasil dikeluarkan!', { id: loadingToast });
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal mengeluarkan anggota';
            toast.error(errorMsg, { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    const addMember = async (groupId, nim) => {
        const loadingToast = toast.loading(`Mencari NIM ${nim}...`);
        setLoading(true);
        try {
            await groupService.addMember(groupId, nim);
            toast.success("Berhasil menambahkan anggota!", { id: loadingToast });
            await fetchMembers(groupId); 
            return true;
        } catch (err) {
            const msg = err.response?.data?.message || "Gagal menambahkan";
            toast.error(msg, { id: loadingToast });
            return false;
        } finally {
            setLoading(false);
        }
    };

    const searchCandidate = async (keyword) => {
        if (!keyword) {
            setSearchResults([]); 
            return;
        }
        try {
            const response = await groupService.searchUser(keyword);
            
            if (Array.isArray(response)) {
                setSearchResults(response);
            } 
            else if (response.data && Array.isArray(response.data)) {
                setSearchResults(response.data);
            } 
            else if (response.users && Array.isArray(response.users)) {
                setSearchResults(response.users);
            } 
            else {
                setSearchResults([]);
            }
        } 
        catch (err) {
            console.error("Gagal mencari user", err);
            setSearchResults([]);
        }
    };

    const deleteGroup = async (groupId, navigate) => {
        const result = await Swal.fire({
            title: 'Hapus Grup Ini?',
            text: "Grup dan seluruh datanya akan dihapus permanen. Tindakan ini tidak bisa dibatalkan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus Grup!',
            cancelButtonText: 'Batal'
        });

        if (!result.isConfirmed) return;

        const loadingToast = toast.loading('Menghapus grup...');
        setLoading(true);

        try {
            await groupService.deleteGroup(groupId);
            toast.success('Grup berhasil dihapus!', { id: loadingToast });
            navigate('/pages/dashboard'); 
        } 
        catch (err) {
            const msg = "Gagal menghapus grup";
            toast.error(msg, { id: loadingToast });
        } 
        finally {
            setLoading(false);
        }
    };

    const leaveGroup = async (groupId, navigate) => {
        const result = await Swal.fire({
            title: 'Keluar dari Grup?',
            text: "Anda tidak akan bisa mengakses konten grup ini lagi.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal'
        });

        if (!result.isConfirmed) return;

        const loadingToast = toast.loading('Sedang proses keluar...');
        setLoading(true);

        try {
            await groupService.leave(groupId); 
            toast.success('Berhasil keluar dari grup!', { id: loadingToast });
            await fetchMyGroups(); 
            
            if (navigate) 
                navigate('/pages/dashboard');
            
        } catch (err) {
            const msg = err.response?.data?.message || "Gagal keluar dari grup";
            toast.error(msg, { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    const clearSearch = () => setSearchResults([]);

    useEffect(() => {
        fetchMyGroups();
    }, [fetchMyGroups]);

    return {
        myGroups,
        groupMembers, 
        searchResults,
        loading,
        error,
        fetchMyGroups,
        fetchMembers,
        createGroup,
        joinGroup,
        kickMember,
        addMember,
        searchCandidate,
        clearSearch,
        deleteGroup,
        leaveGroup
    };
}