export interface SocialLink {
    id: string;
    profile_id: string;
    platform: string;
    url: string;
    is_active: boolean;
}

export interface ProfileData {
    id: string;
    username: string;
    full_name: string;
    email: string;
    bio: string;
    avatar_url: string | null;
    social_links: SocialLink[];
    theme: 'light' | 'dark' | 'auto';
    customColors?: {
        primary?: string;
        background?: string;
    };
    updated_at: string
}