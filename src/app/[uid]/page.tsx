import Link from 'next/link';
import {
    FiUser,
    // FiHeart,
    // FiMessageCircle,
    // FiGlobe,
} from 'react-icons/fi';
import { Logo } from '../../components/UI/icons';
import ShareAndCopy from '../../components/UI/share-and-copy';
import SocialLinkBtn from '../../components/UI/social-link-btn';
import Image from 'next/image';
import { getFullProfile } from '@/actions/profile';
import { notFound } from 'next/navigation';

const UserProfilePage = async ({ params }: { params: Promise<{ uid: string }> }) => {
    const { uid } = await params;
    const profileResponse = await getFullProfile(uid, {filter: {column: "is_active", operator: "eq", value: "true"}})
    if (!profileResponse.success || !("data" in profileResponse)) {
        notFound()
    }

    const profileData = profileResponse.data;

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
                        {profileData.avatar_url ? (
                            <Image
                                src={profileData.avatar_url}
                                alt={profileData.username}
                                className="w-32 h-32 rounded-full object-cover"
                                width={200}
                                height={200}
                            />
                        ) : (
                            <FiUser className="w-16 h-16 text-primary-foreground" />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-foreground mb-2">{profileData.username}</h1>
                    <p className="text-muted-foreground mb-4">{profileData.email}</p>

                    {profileData.bio && (
                        <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
                            {profileData.bio}
                        </p>
                    )}
                </div>

                {/* Social Links */}
                {profileData.social_links.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold text-foreground text-center mb-8">Connect with me</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            {profileData.social_links.map((link) => (
                                <SocialLinkBtn key={link.id} link={link} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Engagement Section */}
                {/* //! this section is not available for this version - will be added in later versions */}
                {/* <div className="text-center mb-12">
                    <div className="flex justify-center space-x-6">
                        <button
                            type='button'
                            title='like'
                            className="cursor-pointer flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <FiHeart className="w-5 h-5" />
                            <span>Like</span>
                        </button>

                        <button
                            type='button'
                            title='message'
                            className="cursor-pointer flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <FiMessageCircle className="w-5 h-5" />
                            <span>Message</span>
                        </button>

                        <button
                            type='button'
                            title='visit website'
                            className="cursor-pointer flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <FiGlobe className="w-5 h-5" />
                            <span>Visit Website</span>
                        </button>
                    </div>
                </div> */}

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
