import { UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export function GroupTabs({ activeTab, setActiveTab }) {
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

    return (
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
    );
}