"use client";

import Link from "next/link";
import { FiCopy, FiExternalLink } from "react-icons/fi";

const ProfileLinkSection = ({profileUrl}: {profileUrl: string}) => {
    const handleCopyLink = () => {
        navigator.clipboard.writeText(profileUrl);
        // TODO: Show toast notification
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Profile Link</h3>

            <div className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Your Profile URL</p>
                    <p className="text-sm font-mono text-foreground break-all">{profileUrl}</p>
                </div>

                <div className="flex space-x-2">
                    <button
                        type='button'
                        onClick={handleCopyLink}
                        className="cursor-pointer flex-1 flex items-center justify-center space-x-2 border border-border text-foreground py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                    >
                        <FiCopy className="w-4 h-4" />
                        <span>Copy</span>
                    </button>

                    <Link
                        href={profileUrl}
                        target="_blank"
                        className="cursor-pointer flex items-center justify-center space-x-2 border border-border text-foreground py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                    >
                        <FiExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileLinkSection;