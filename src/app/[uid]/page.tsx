import Link from 'next/link';
import {
    FiUser,
    FiHeart,
    FiMessageCircle,
    FiGlobe,
    FiArrowLeft
} from 'react-icons/fi';
import { Logo } from '../../components/UI/icons';
import ShareAndCopy from '../../components/UI/share-and-copy';
import { ProfileData } from '../../../types/profile-data';
import SocialLinkBtn from '../../components/UI/social-link-btn';

const profileData: ProfileData = {
    uid: '123',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Digital creator and tech enthusiast. Building the future one QR code at a time. Passionate about technology, design, and helping others grow their digital presence.',
    avatar: null,
    socialLinks: [
        { id: 1, platform: 'Instagram', url: 'https://instagram.com/johndoe', icon: '📷', isActive: true },
        { id: 2, platform: 'Twitter', url: 'https://twitter.com/johndoe', icon: '🐦', isActive: true },
        { id: 3, platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: '💼', isActive: true },
        { id: 4, platform: 'YouTube', url: 'https://youtube.com/@johndoe', icon: '📺', isActive: true },
        { id: 5, platform: 'GitHub', url: 'https://github.com/johndoe', icon: '💻', isActive: true },
        { id: 6, platform: 'Portfolio', url: 'https://johndoe.dev', icon: '🌐', isActive: true },
    ],
    theme: 'auto'
}

const UserProfilePage = async ({ params }: { params: Promise<{ uid: string }> }) => {
    const { uid } = await params;
    console.log("user id from [uid]/page.tsx: ", uid);

    if (!profileData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiUser className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Profile Not Found</h1>
                    <p className="text-muted-foreground mb-6">The profile you're looking for doesn't exist.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Go Home</span>
                    </Link>
                </div>
            </div>
        );
    }

    const activeSocialLinks = profileData.socialLinks.filter(link => link.isActive);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Logo className="w-6 h-6 rounded" />
                            <span className="text-sm font-medium text-muted-foreground">ProfileQR</span>
                        </div>
                        <ShareAndCopy profileData={profileData} />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Header */}
                <div className="text-center mb-12">
                    <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        {profileData.avatar ? (
                            <img
                                src={profileData.avatar}
                                alt={profileData.fullName}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        ) : (
                            <FiUser className="w-16 h-16 text-primary-foreground" />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-foreground mb-2">{profileData.fullName}</h1>
                    <p className="text-muted-foreground mb-4">{profileData.email}</p>

                    {profileData.bio && (
                        <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
                            {profileData.bio}
                        </p>
                    )}
                </div>

                {/* Social Links */}
                {activeSocialLinks.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold text-foreground text-center mb-8">Connect with me</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            {activeSocialLinks.map((link) => (
                                <SocialLinkBtn key={link.id} link={link} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Engagement Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center space-x-6">
                        <button className="cursor-pointer flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                            <FiHeart className="w-5 h-5" />
                            <span>Like</span>
                        </button>
                        <button className="cursor-pointer flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                            <FiMessageCircle className="w-5 h-5" />
                            <span>Message</span>
                        </button>
                        <button className="cursor-pointer flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                            <FiGlobe className="w-5 h-5" />
                            <span>Visit Website</span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center border-t border-border pt-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Logo className="w-4 h-4 rounded" />
                        <span className="text-sm text-muted-foreground">Powered by ProfileQR</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Create your own digital profile at{' '}
                        <Link href="/" className="text-primary hover:text-primary/90">
                            profileqr.com
                        </Link>
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default UserProfilePage;
