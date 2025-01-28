import React from 'react';

interface MainContentProps {
  activeTab: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  return (
    <main className="flex-1 overflow-y-auto p-4">
      {activeTab === 'wallet' && (
        <div>
          <h2 className="text-xl font-bold mb-3">Wallet</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-base font-semibold">Balance: 0.00 ETH</p>
            <div className="mt-3 flex space-x-3">
              <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Send
              </button>
              <button className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Receive
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'activity' && <h2 className="text-xl font-bold">Activity</h2>}
      {activeTab === 'settings' && <h2 className="text-xl font-bold">Settings</h2>}
    </main>
  );
};

export default MainContent;