import { useRef, useState } from 'react';
import { FiEdit3, FiUser, FiSave, FiX } from "react-icons/fi";
import { ProfileData } from "../../../types/profile-data";
import Image from "next/image";
import { updateProfileData } from '@/actions/profile';

interface ProfileTabProps {
    profileData: Pick<ProfileData, "avatar_url" | "bio" | "email" | "username" | "id">;
}

const ProfileTab = ({ profileData }: ProfileTabProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({
        avatar: profileData.avatar_url || '',
        username: profileData.username || '',
        email: profileData.email || '',
        bio: profileData.bio || ''
    });
    const [avatarPreview, setAvatarPreview] = useState(profileData.avatar_url || '');
    const fileRef = useRef<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            fileRef.current = file
            const previewUrl = URL.createObjectURL(file)
            setAvatarPreview(previewUrl)
            setData(prev => ({ ...prev, avatar: previewUrl }));
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.set('bio', data.bio)
        if (fileRef.current) {
            formData.set('avatar', fileRef.current);
        }
        formData.set('username', data.username)
        formData.set('email', data.email)

        const response = await updateProfileData(profileData.id, formData)
        console.log("response from profile tab: ", response)
        setIsEditing(false);
    };

    const handleCancel = () => {
        // TODO: add smarter clear to the formData values
        setData({
            avatar: profileData.avatar_url || '',
            username: profileData.username || '',
            email: profileData.email || '',
            bio: profileData.bio || ''
        });
        setAvatarPreview(profileData.avatar_url || '');
        setIsEditing(false);
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>

                {isEditing ? (
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="cursor-pointer flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-2"
                        >
                            <FiX className="w-4 h-4" />
                            <span>Cancel</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="cursor-pointer flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-md px-3 py-2"
                        >
                            <FiSave className="w-4 h-4" />
                            <span>Save</span>
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="cursor-pointer flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors border border-border rounded-md px-3 py-2"
                    >
                        <FiEdit3 className="w-4 h-4" />
                        <span>Edit</span>
                    </button>
                )}
            </div>

            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                            {avatarPreview ? (
                                <Image
                                    src={avatarPreview}
                                    alt={`${data.username} avatar`}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : data.avatar ? (
                                <Image
                                    src={data.avatar}
                                    alt={`${data.username} avatar`}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FiUser className="w-8 h-8 text-primary-foreground" />
                            )}
                        </div>

                        {isEditing && (
                            <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
                                <FiEdit3 className="w-4 h-4" />

                                <input
                                    title='avatar'
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        )}
                    </div>

                    <div className="flex-1">
                        {isEditing ? (
                            <div className='space-y-1'>
                                <div>
                                    <label className="sr-only block text-sm font-medium text-foreground mb-1">Username</label>

                                    <input
                                        placeholder='username'
                                        title='username'
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        onChange={handleInputChange}
                                        className="focus:outline-0 w-full bg-background text-lg font-semibold text-foreground"
                                    />
                                </div>

                                <div>
                                    <label className="sr-only block text-sm font-medium text-foreground mb-1">Email</label>

                                    <input
                                        placeholder='email'
                                        title='email'
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-background text-foreground focus:outline-0"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className='space-y-1'>
                                <h3 className="text-lg font-semibold text-foreground">{data.username !== "" ? data.username : profileData.username}</h3>
                                <p className="text-muted-foreground">{data.email !== "" ? data.email : profileData.email}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bio</label>

                    {isEditing ? (
                        <textarea
                            placeholder='bio'
                            title='bio'
                            name="bio"
                            value={data.bio}
                            onChange={handleInputChange}
                            rows={1}
                            className="w-full bg-background text-foreground focus:outline-0"
                        />
                    ) : (
                        <p className="text-muted-foreground">{data.bio !== "" ? data.bio : profileData.bio || "No bio provided"}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;