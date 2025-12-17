import { useState, useEffect, useMemo } from 'react';
import { useGroup } from './useGroup'; 
import { groupService } from '../services/groupService'; 

export function useKalender(groupId) {
    const { fetchMyGroups, myGroups } = useGroup();

    const [scheduleData, setScheduleData] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        if (groupId) {
            fetchMyGroups();
            const loadSchedules = async () => {
                try {
                    setLoading(true);
                    const res = await groupService.getSchedules(groupId);
                    setScheduleData(res.schedules || []);
                    setTotalMembers(res.total_members || 0);
                } 
                catch (err) {
                } 
                finally {
                    setLoading(false);
                }
            };
            loadSchedules();
        }
    }, [groupId, fetchMyGroups]);

    const currentGroup = useMemo(() => {
        return myGroups.find(g => g.id === groupId);
    }, [myGroups, groupId]);

    const namaGrup = currentGroup ? currentGroup.nama_group : "...";
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const toMinutes = (timeStr) => {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    const toTimeStr = (minutes) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    const roundToNearest = (minutes, interval = 15) => {
        return Math.round(minutes / interval) * interval;
    };

    const dynamicSlots = useMemo(() => {
        const START_DAY = 8 * 60;
        const END_DAY = 18 * 60;
        
        const timePoints = new Set();
        timePoints.add(START_DAY);
        timePoints.add(END_DAY);

        scheduleData.forEach(item => {
            let start = toMinutes(item.waktu_mulai);
            let end = toMinutes(item.waktu_selesai);

            start = roundToNearest(start, 15); 
            end = roundToNearest(end, 15);

            if (start < START_DAY) start = START_DAY;
            if (end > END_DAY) end = END_DAY;
            
            if (start === end) end += 15;

            if (start >= START_DAY && start < END_DAY) timePoints.add(start);
            if (end > START_DAY && end <= END_DAY) timePoints.add(end);
        });

        const sortedPoints = Array.from(timePoints).sort((a, b) => a - b);
        const slots = [];

        for (let i = 0; i < sortedPoints.length - 1; i++) {
            const startMin = sortedPoints[i];
            const endMin = sortedPoints[i + 1];
            
            if (endMin - startMin >= 15) { 
                slots.push({
                    startMin,
                    endMin,
                    label: `${toTimeStr(startMin)} - ${toTimeStr(endMin)}`
                });
            }
        }
        return slots;
    }, [scheduleData]);

    const getAvailability = (day, slotStartMin, slotEndMin) => {
        if (totalMembers === 0) return { busyCount: 0, availableCount: 0, busyUsers: [] };
        
        const conflictingSchedules = scheduleData.filter(item => {
            if (!item.nama_hari || item.nama_hari.toLowerCase() !== day.toLowerCase()) 
                return false;

            const itemStart = toMinutes(item.waktu_mulai);
            const itemEnd = toMinutes(item.waktu_selesai);

            return itemStart < slotEndMin && itemEnd > slotStartMin;
        });

        const busyUsersMap = new Map();
        conflictingSchedules.forEach(item => {
            if (!busyUsersMap.has(item.user_id)) {
                busyUsersMap.set(item.user_id, {
                    name: item.nama_user,
                    activity: item.tipe
                });
            }
        });

        const busyUsersList = Array.from(busyUsersMap.values());
        return {
            busyCount: busyUsersList.length,
            availableCount: totalMembers - busyUsersList.length,
            busyUsers: busyUsersList
        };
    };

    const getCellColor = (available) => {
        if (totalMembers === 0) return "bg-gray-100 text-gray-400 pointer-events-none"; 
        const percentage = available / totalMembers;
        
        if (percentage > 0.80) 
            return "bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200"; 
        if (percentage > 0.5) 
            return "bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200"; 

        return "bg-rose-100 text-rose-900 border-rose-300 hover:bg-rose-200"; 
    };

    const handleCellClick = (day, timeLabel, availabilityData) => {
        setSelectedSlot({
            day,
            timeLabel,
            ...availabilityData
        });
    };

    return {
        loading,
        namaGrup,
        totalMembers,
        days,
        dynamicSlots,
        selectedSlot,
        setSelectedSlot,
        getAvailability,
        getCellColor,
        handleCellClick
    };
}