import { useEffect, useState } from "react";
import { useParams, Navigate, Outlet } from "react-router-dom";
import { groupService } from "../../services/groupService";
import { toast } from "react-hot-toast";

import { GroupSkeleton } from "../components/GlobalComponents";

export default function GroupProtectedRoute() {
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
                } else {
                    setIsMember(false);
                    toast.error("Anda tidak memiliki akses ke grup ini");
                }
            } catch (err) {
                console.error("Gagal cek membership:", err);
                setIsMember(false);
            }
        };

        if (groupId) {
            checkMembership();
        }
    }, [groupId]);

    if (isMember === null) {
        return (
            <div className="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2 animate-pulse">
                     <div className="h-4 w-24 bg-base-300 rounded opacity-50"></div>
                     <div className="h-8 w-64 bg-base-300 rounded opacity-50"></div>
                </div>
                <div className="flex-1 min-h-[600px]">
                    <GroupSkeleton />
                </div>
            </div>
        );
    }

    if (isMember === false) {
        return <Navigate to="/pages/dashboard" replace />;
    }

    return <Outlet />;
};