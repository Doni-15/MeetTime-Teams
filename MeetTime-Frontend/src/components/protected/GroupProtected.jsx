import { useEffect, useState } from "react";
import { useParams, Navigate, Outlet } from "react-router-dom";
import { groupService } from "../../services/groupService";
import { toast } from "react-hot-toast";

export default function GroupProtectedRoute(){
    const { groupId } = useParams();
    const [isMember, setIsMember] = useState(null);

    useEffect(() => {
        const checkMembership = async () => {
        try {
            const response = await groupService.getMyGroups();
            const myGroups = response.groups || response;
            const found = myGroups.some(g => String(g.id) === String(groupId));

            if (found) {
                setIsMember(true);
            }
            else {
                setIsMember(false);
                toast.error("Anda tidak memiliki akses ke grup ini");
            }
        } 
        catch (err) {
            setIsMember(false);
        }
        };

        if (groupId) {
            checkMembership();
        }
    }, [groupId]);


    if (isMember === null) {
        return (
            <div className="flex h-screen items-center justify-center bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isMember === false) {
        return <Navigate to="/pages/dashboard" replace />;
    }

    return <Outlet />;
};