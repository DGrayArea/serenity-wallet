// background.ts
console.log("Background script running");

// import { publicKey } from "@metaplex-foundation/umi";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";

// const umi = createUmi("https://api.mainnet-beta.solana.com").use(dasApi());

// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//   if (request.action === "fetchNFTs") {
//     try {
//       const owner = publicKey(request.walletAddress);
//       //@ts-expect-error type non
//       const assets = await umi.rpc.getAssetsByOwner({
//         owner,
//         limit: 10,
//       });
//       sendResponse({ success: true, assets });
//     } catch (error) {
//       console.error("Error fetching NFTs:", error);
//       sendResponse({ success: false, error: error });
//     }
//   }
//   return true; // Keep the messaging channel open for async responses
// });

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CONNECT_REQUEST") {
    // Open the extension popup to handle the connection request
    chrome.windows.create({
      url: chrome.runtime.getURL("index.html#/connect-request"),
      type: "popup",
      width: 360,
      height: 600,
    });

    // Store the sender information to respond later
    chrome.storage.local.set(
      { pendingConnection: { senderId: sender.id } },
      () => {
        console.log("Connection request stored");
      }
    );

    // Respond that we're processing the request
    sendResponse({ status: "PROCESSING" });
    return true; // Indicates that the response will be sent asynchronously
  }
});

// Listen for the connection approval from the extension UI
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "CONNECTION_APPROVED") {
    chrome.storage.local.get(["pendingConnection"], (result) => {
      const request = result.pendingConnection;
      if (request && request.senderId) {
        // Send approval back to the content script
        chrome.tabs.sendMessage(request.senderId, {
          type: "CONNECTION_APPROVED",
          status: "CONNECTED",
          publicKey: message.address,
        });
        // Clear the stored request
        chrome.storage.local.remove("pendingConnection");
      }
    });
  }
  return true;
});
