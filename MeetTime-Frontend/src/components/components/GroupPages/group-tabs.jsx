import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
    UserGroupIcon, 
    ChatBubbleLeftRightIcon, 
    ClipboardDocumentIcon, 
    CheckIcon 
} from '@heroicons/react/24/outline';

export function GroupTabs({ activeTab, setActiveTab, inviteCode }) {
    const [copied, setCopied] = useState(false);

    const getTabStyle = (tabName) => {
        const isActive = activeTab === tabName;
        return `
            group flex-1 md:flex-none flex items-center justify-center gap-2 pb-3 px-2 md:px-6 text-sm md:text-base font-bold transition-all duration-300 border-b-[3px] outline-none
            ${isActive 
                ? 'border-primary text-primary'
                : 'border-transparent text-neutral/50 hover:text-neutral/80 hover:border-base-300'
            }
        `;
    };

    const handleCopy = () => {
        if (!inviteCode) return;
        
        navigator.clipboard.writeText(inviteCode);
        setCopied(true);
        toast.success("Kode undangan disalin!");
        
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex justify-between items-end md:items-center">
            <div className="flex w-full md:w-auto gap-2 md:gap-8">
                <button
                    onClick={() => setActiveTab('anggota')}
                    className={getTabStyle('anggota')}
                >
                    <UserGroupIcon className={`size-5 transition-transform duration-300 ${activeTab === 'anggota' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>Anggota</span>
                </button>

                <button
                    onClick={() => setActiveTab('obrolan')}
                    className={getTabStyle('obrolan')}
                >
                    <ChatBubbleLeftRightIcon className={`size-5 transition-transform duration-300 ${activeTab === 'obrolan' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>Obrolan Grup</span>
                </button>
            </div>
            
            <div className="hidden md:flex items-center pb-2">
                {inviteCode ? (
                    <button 
                        onClick={handleCopy}
                        className="group flex items-center gap-2 px-3 py-1.5 bg-base-content hover:bg-netral-abu rounded-lg border border-base-300 transition-all active:scale-95"
                        title="Klik untuk menyalin kode"
                    >
                        <div className="flex flex-col items-end leading-none">
                            <span className="text-[10px] text-base-100 font-bold uppercase tracking-wider">Kode Undangan</span>
                            <span className="text-xs font-mono font-bold text-neutral/80 group-hover:text-primary transition-colors">
                                {inviteCode.slice(0, 8)}...
                            </span>
                        </div>
                        
                        <div className="p-1.5 bg-white rounded-md shadow-sm text-neutral/60 group-hover:text-primary transition-colors">
                            {copied ? (
                                <CheckIcon className="size-4 text-success" />
                            ) : (
                                <ClipboardDocumentIcon className="size-4" />
                            )}
                        </div>
                    </button>
                ) : (
                    <div className="h-8 w-32 bg-base-200 animate-pulse rounded-lg"></div>
                )}
            </div>
        </div>
    );
}