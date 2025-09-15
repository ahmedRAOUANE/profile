"use client";

import Image from "next/image";
import { FiDownload, FiShare2 } from "react-icons/fi"

const QRCodeSection = ({ qrCode, profileUrl }: { qrCode: string, profileUrl: string }) => {
    const handleDownloadQR = () => {
        try {
            const a = document.createElement("a");
            a.href = qrCode; // this is already a base64 image
            a.download = "profile-qr.png"; // file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Failed to download QR code:", error);
        }
    };

    const handleShareProfile = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Check out my profile!",
                    text: "Scan this QR code or click the link to view my profile.",
                    url: profileUrl, // ⚠ This will share the QR image, not the link
                });
            } else {
                await navigator.clipboard.writeText(profileUrl);
                alert("QR code link copied to clipboard!");
            }
        } catch (error) {
            console.error("Failed to share profile:", error);
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Your QR Code</h3>

            <div className="text-center mb-6">
                <div className="w-48 h-48 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                    <div className="overflow-hidden w-32 h-32 bg-foreground rounded-lg flex items-center justify-center">
                        <Image 
                            src={qrCode} 
                            alt="qr code image" 
                            height={130} width={130} 
                        />
                    </div>
                </div>

                <p className="text-sm text-muted-foreground">Your unique QR code</p>
            </div>

            <div className="space-y-3">
                <button
                    type='button'
                    onClick={handleDownloadQR}
                    className="cursor-pointer w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <FiDownload className="w-4 h-4" />
                    <span>Download QR Code</span>
                </button>

                <button
                    type='button'
                    onClick={handleShareProfile}
                    className="cursor-pointer w-full flex items-center justify-center space-x-2 border border-border text-foreground py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                >
                    <FiShare2 className="w-4 h-4" />
                    <span>Share Profile</span>
                </button>
            </div>
        </div>
    )
}

export default QRCodeSection