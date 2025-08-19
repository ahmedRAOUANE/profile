"use client";

import { ProfileData } from "../../../types/profile-data";
import { useState } from "react";
import { FiCopy, FiShare2 } from "react-icons/fi";

const ShareAndCopy = ({ profileData }: { profileData: ProfileData }) => {
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${profileData?.fullName}'s Profile`,
                    text: `Check out ${profileData?.fullName}'s digital profile`,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            handleCopyLink();
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowCopiedMessage(true);
            setTimeout(() => setShowCopiedMessage(false), 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };

    return (
        <div className="flex items-center space-x-2" >
            <button
                onClick={handleShare}
                className="cursor-pointer p-2 text-muted-foreground hover:text-foreground transition-colors"
                title="Share profile"
            >
                <FiShare2 className="w-4 h-4" />
            </button>
            < button
                onClick={handleCopyLink}
                className="cursor-pointer p-2 text-muted-foreground hover:text-foreground transition-colors"
                title="Copy link"
            >
                <FiCopy className="w-4 h-4" />
            </button>

            {/* Copied Message Toast */}
            {showCopiedMessage && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-50">
                    <p className="text-sm">Link copied to clipboard!</p>
                </div>
            )}
        </div>
    )
}

export default ShareAndCopy;
