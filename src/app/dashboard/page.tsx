import { FiSettings } from 'react-icons/fi';
import { Logo } from '../../components/UI/icons';
// import QuickStats from '@/components/dashboard/quick-stats';
import TabsContainer from '@/components/dashboard/tabs-container';
import QRCodeSection from '@/components/dashboard/qrcode-section';
import ProfileLinkSection from '@/components/dashboard/profile-link-section';
// import QuickActionsSection from '@/components/dashboard/quick-actions-section';
import Link from 'next/link';
import LogoutBtn from '@/components/logout-btn';
import { getFullProfile } from '@/actions/profile';
import { ProfileData } from '../../../types/profile-data';
import { baseUrl } from '@/constants';
import { generateQRCode } from '@/actions/qr-code';

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
    const profileResponse = await getFullProfile();
    // TODO: add autorization check
    
    const profileData = (profileResponse.success && "data" in profileResponse) ? profileResponse.data : null
    
    const profileUrl = `${baseUrl}/${profileData?.id}`;
    const qrCode = await generateQRCode(profileUrl);

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Header */}
            <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Logo className="w-8 h-8 rounded-lg" />

                            <span className="text-xl font-bold text-foreground">ProfileQR</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                href={"/settings"}
                                title='Settings'
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <FiSettings className="w-5 h-5" />
                            </Link>

                            <LogoutBtn />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, <span className='text-primary'>{profileData?.username}</span>!</h1>

                    <p className="text-muted-foreground">Manage your digital identity and track your profile performance.</p>
                </div>

                {/* Quick Stats */}
                {/* <QuickStats /> */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <TabsContainer profileData={profileData as ProfileData} />
                    {/* {profileData ? (
                        <TabsContainer profileData={profileData} />
                    ) : (
                        <div>no data provided</div>
                    )} */}

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* QR Code Section */}
                        <QRCodeSection profileUrl={profileUrl} qrCode={qrCode} />

                        {/* Profile Link Section */}
                        <ProfileLinkSection profileUrl={profileUrl} />

                        {/* Quick Actions */}
                        {/* <QuickActionsSection /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

