import React from 'react';
import { XIcon } from 'lucide-react';

type ManageWalletModalProps = {
  onClose: () => void;
};

const ManageWalletModal: React.FC<ManageWalletModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Manage Wallet</h2>
          <XIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <p>This is where you can manage your wallet settings and preferences.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ManageWalletModal;
