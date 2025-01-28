import React, { LegacyRef } from "react";
import QRCode from "react-qr-code";

interface QRCodeProps {
    walletAddress: string;
    qrCodeRef: LegacyRef<SVGSVGElement | null>;
}

const QRCodeDisplay: React.FC<QRCodeProps> = ({ walletAddress, qrCodeRef }) => {
    return (
        <div className="min-w-min max-w-min p-4 bg-white rounded-lg shadow-md mx-auto">
            <QRCode ref={qrCodeRef as unknown as string} value={walletAddress} size={200} />
        </div>
    );
};

export default QRCodeDisplay;
