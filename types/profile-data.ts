export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string;
    isActive: boolean;
}

export interface ProfileData {
    uid: string;
    fullName: string;
    email: string;
    bio: string;
    avatar: string | null;
    socialLinks: SocialLink[];
    theme: 'light' | 'dark' | 'auto';
    customColors?: {
        primary?: string;
        background?: string;
    };
}