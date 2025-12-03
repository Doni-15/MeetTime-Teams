import { useState } from 'react';

import { ChatRoom } from './chat-room';
import { PengumumanGrup } from './chat-pengumuman';

export function ChatContainer({ groupId, isAdmin }) {
    const [viewMode, setViewMode] = useState('chat');

    return (
        <div className="h-full w-full bg-white flex flex-col relative overflow-hidden">
            {viewMode === 'chat' && (
                <div className="h-full w-full animate-in fade-in duration-300">
                    <ChatRoom 
                        groupId={groupId} 
                        onOpenAnnouncements={() => setViewMode('pengumuman')} 
                    />
                </div>
            )}

            {viewMode === 'pengumuman' && (
                <div className="h-full w-full animate-in slide-in-from-right duration-300">
                    <PengumumanGrup 
                        groupId={groupId} 
                        isAdmin={isAdmin}
                        onBackToChat={() => setViewMode('chat')}
                    />
                </div>
            )}

        </div>
    );
}