/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ConnectRequest.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { useWalletStore } from "@/stores/walletStore";
import { useToast } from "@/hooks/use-toast";

const ConnectRequest: React.FC = () => {
  const [dAppInfo, setDAppInfo] = useState<any>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const { accounts } = useWalletStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the connection request details
    chrome.storage.local.get(["pendingConnection"], (result) => {
      if (result.pendingConnection) {
        setDAppInfo(result.pendingConnection);
      } else {
        navigate("/home");
      }
    });
  }, [navigate]);

  const handleApprove = () => {
    if (!selectedAddress) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an address to connect with",
      });
      return;
    }

    // Send approval message to background script
    chrome.runtime.sendMessage({
      type: "CONNECTION_APPROVED",
      address: selectedAddress,
    });

    toast({
      title: "Success",
      description: "Connection approved",
    });

    navigate("/home");
  };

  const handleReject = () => {
    // Clear the stored request
    chrome.storage.local.remove("pendingConnection");
    navigate("/home");
  };

  if (!dAppInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Connection Request</h2>
      <p className="mb-2">
        <strong>{dAppInfo.origin}</strong> is requesting to connect to your
        wallet.
      </p>
      <div className="mb-4">
        <label className="block mb-2">Select address to connect with:</label>
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select an address</option>
          {accounts.map((account) => (
            <option key={account.publicKey} value={account.publicKey}>
              {account.publicKey}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <Button onClick={handleReject} variant="outline">
          Reject
        </Button>
        <Button onClick={handleApprove}>Approve</Button>
      </div>
    </div>
  );
};

export default ConnectRequest;
