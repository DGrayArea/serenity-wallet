import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['wallet', 'activity', 'settings'];

  return (
    <div className="bg-gray-800 text-white w-16 flex flex-col items-center py-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`p-2 mb-4 rounded-full ${
            activeTab === tab ? 'bg-blue-500' : 'hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {/* You can replace these with actual icons */}
          {tab[0].toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;