"use client";

import { SocialLink } from "../../../types/profile-data";
import { FiExternalLink } from "react-icons/fi";

const SocialLinkBtn = ({ link }: { link: SocialLink }) => {
    const handleSocialLinkClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <button
            type="button"
            key={link.id}
            onClick={() => handleSocialLinkClick(link.url)}
            className="cursor-pointer group p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-200 text-left"
        >
            <div className="flex items-center space-x-4">
                {/* <span className="text-3xl">{link.icon}</span> */}

                <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.platform}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                        {link.url.replace(/^https?:\/\//, '')}
                    </p>
                </div>

                <FiExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
        </button>
    )
}

export default SocialLinkBtn;
