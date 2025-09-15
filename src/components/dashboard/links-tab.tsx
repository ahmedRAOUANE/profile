"use client";

import { useState } from "react";
import { FiEdit3, FiEye, FiEyeOff, FiSave, FiTrash2 } from "react-icons/fi";
import { SocialLink } from "../../../types/profile-data";
import { FiPlus } from "react-icons/fi";
import { deleteSocialLink, updateSocialLink } from "@/actions/social-links";

interface LinksTabProps {
    links: SocialLink[];
}

const LinksTab = ({ links }: LinksTabProps) => {
    const [socialLinks, setSocialLinks] = useState(links);

    const handleDelete = async (id: string) => {
        setSocialLinks(prev => prev.filter(link => link.id !== id));

        try {
            const updateResponse = await deleteSocialLink(id)
            if (!updateResponse.success) {
                alert("failed to delete link")
                return;
            }
            alert("link deleted successfully")
        } catch (error) {
            console.log("error deleting the link: ", error)
            alert(`unable to save the changes`)
        }
    };

    const handleUpdate = async (id: string, updatedLink: Partial<SocialLink>) => {
        setSocialLinks(prev =>
            prev.map(link => (link.id === id ? { ...link, ...updatedLink } : link))
        );

        try {
            const updateResponse = await updateSocialLink(updatedLink)
            if (!updateResponse.success) {
                alert("failed to update link")
                return;
            }
            alert("link updated successfully")
        } catch (error) {
            console.log("error saving the updated link: ", error)
            alert(`unable to save the changes`)
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                    Social Media Links
                </h2>

                <button
                    type="button"
                    className="cursor-pointer flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>Add Link</span>
                </button>
            </div>

            <div className="space-y-4">
                {socialLinks.map(link => (
                    <SocialLinkItem
                        key={link.id}
                        link={link}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>
        </div>
    );
};

interface SocialLinkItemProps {
    link: SocialLink;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedLink: Partial<SocialLink>) => void;
}

const SocialLinkItem = ({ link, onDelete, onUpdate }: SocialLinkItemProps) => {
    const [localLink, setLocalLink] = useState(link);
    const [isEditing, setIsEditing] = useState(false);

    const toggleActive = () => {
        if (!localLink.url || localLink.url === "") {
            alert("you can not activate a link with empty url");
            return;
        }
        
        const updated = { ...localLink, is_active: !localLink.is_active };
        setLocalLink(updated);
        onUpdate(link.id, updated);
    };

    const handleEditChange = (field: keyof SocialLink, value: string) => {
        setLocalLink(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onUpdate(link.id, localLink);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
                {/* <span className="text-2xl">{localLink.icon}</span> */}

                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <input
                            defaultValue={localLink.platform}
                            title="platform"
                            onChange={(e) => handleEditChange("platform", e.target.value)}
                            type="text"
                            className="w-full bg-background font-medium text-foreground outline-0 focus:outline-0"
                        />
                        <input
                            defaultValue={localLink.url || `https://example.${localLink.platform}.com`}
                            title="link"
                            onChange={(e) => handleEditChange("url", e.target.value)}
                            type="text"
                            className="w-full bg-background text-sm text-muted-foreground outline-0 focus:outline-0"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-foreground">{localLink.platform}</p>
                        <p className="text-sm text-muted-foreground">
                            {localLink.url || `https://example.${localLink.platform}.com`}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-2">
                {/* toggle */}
                <button
                    type="button"
                    onClick={toggleActive}
                    className={`cursor-pointer p-2 rounded-lg transition-colors ${localLink.is_active
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                >
                    {localLink.is_active ? (
                        <FiEye className="w-4 h-4" />
                    ) : (
                        <FiEyeOff className="w-4 h-4" />
                    )}
                </button>

                {/* edit */}
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        title="Save"
                        type="button"
                        className="cursor-pointer p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <FiSave />
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        type="button"
                        title="Edit Link"
                        className="cursor-pointer p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <FiEdit3 className="w-4 h-4" />
                    </button>
                )}

                {/* delete */}
                <button
                    type="button"
                    title="Delete Link"
                    onClick={() => onDelete(link.id)}
                    className="cursor-pointer p-2 text-red-500 hover:text-red-600 transition-colors"
                >
                    <FiTrash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default LinksTab;


