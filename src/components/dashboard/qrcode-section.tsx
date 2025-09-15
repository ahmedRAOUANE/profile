"use client";

import { FiDownload, FiShare2 } from "react-icons/fi"

const QRCodeSection = () => {
    const handleDownloadQR = () => {
        // TODO: Implement QR code download
        console.log('Downloading QR code...');
    };

    const handleShareProfile = () => {
        // TODO: Implement share functionality
        console.log('Sharing profile...');
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Your QR Code</h3>

            <div className="text-center mb-6">
                <div className="w-48 h-48 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                    <div className="w-32 h-32 bg-foreground rounded-lg flex items-center justify-center">
                        <span className="text-background text-2xl font-bold">QR</span>
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