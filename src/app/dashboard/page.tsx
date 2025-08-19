'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    FiUser,
    FiCode,
    FiDownload,
    FiShare2,
    FiEdit3,
    FiSettings,
    FiLogOut,
    FiEye,
    FiEyeOff,
    FiPlus,
    FiTrash2,
    FiCopy,
    FiExternalLink,
    FiBarChart,
    FiUsers,
    FiGlobe
} from 'react-icons/fi';
import { Logo } from '../../components/UI/icons';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Digital creator and tech enthusiast. Building the future one QR code at a time.',
        avatar: null,
        socialLinks: [
            { id: 1, platform: 'Instagram', url: 'https://instagram.com/johndoe', icon: '📷', isActive: true },
            { id: 2, platform: 'Twitter', url: 'https://twitter.com/johndoe', icon: '🐦', isActive: true },
            { id: 3, platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: '💼', isActive: true },
            { id: 4, platform: 'YouTube', url: 'https://youtube.com/@johndoe', icon: '📺', isActive: false },
        ]
    });

    const [analytics] = useState({
        totalViews: 1247,
        uniqueVisitors: 892,
        qrScans: 156,
        thisMonth: 89
    });

    const handleCopyLink = () => {
        navigator.clipboard.writeText('https://profileqr.com/johndoe');
        // TODO: Show toast notification
    };

    const handleDownloadQR = () => {
        // TODO: Implement QR code download
        console.log('Downloading QR code...');
    };

    const handleShareProfile = () => {
        // TODO: Implement share functionality
        console.log('Sharing profile...');
    };

    const toggleSocialLink = (id: number) => {
        setProfileData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map(link =>
                link.id === id ? { ...link, isActive: !link.isActive } : link
            )
        }));
    };

    const deleteSocialLink = (id: number) => {
        setProfileData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter(link => link.id !== id)
        }));
    };

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
                            <button title='Settings' type='button' className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                                <FiSettings className="w-5 h-5" />
                            </button>
                            <button title='Log Out' type='button' className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                                <FiLogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {profileData.fullName}!</h1>
                    <p className="text-muted-foreground">Manage your digital identity and track your profile performance.</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Views</p>
                                <p className="text-2xl font-bold text-foreground">{analytics.totalViews}</p>
                            </div>

                            <FiEye className="w-8 h-8 text-primary" />
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Unique Visitors</p>
                                <p className="text-2xl font-bold text-foreground">{analytics.uniqueVisitors}</p>
                            </div>

                            <FiUsers className="w-8 h-8 text-secondary" />
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">QR Scans</p>
                                <p className="text-2xl font-bold text-foreground">{analytics.qrScans}</p>
                            </div>

                            <FiCode className="w-8 h-8 text-accent" />
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">This Month</p>
                                <p className="text-2xl font-bold text-foreground">{analytics.thisMonth}</p>
                            </div>
                            
                            <FiBarChart className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tab Navigation */}
                        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
                            <button
                                type='button'
                                onClick={() => setActiveTab('profile')}
                                className={`cursor-pointer flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'profile'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Profile
                            </button>

                            <button
                                type='button'
                                onClick={() => setActiveTab('links')}
                                className={`cursor-pointer flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'links'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Social Links
                            </button>
                            
                            <button
                                type='button'
                                onClick={() => setActiveTab('analytics')}
                                className={`cursor-pointer flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'analytics'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Analytics
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'profile' && (
                            <div className="bg-card border border-border rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>

                                    <button type='button' className="cursor-pointer flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors">
                                        <FiEdit3 className="w-4 h-4" />
                                        <span>Edit</span>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                                            <FiUser className="w-8 h-8 text-primary-foreground" />
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">{profileData.fullName}</h3>
                                            <p className="text-muted-foreground">{profileData.email}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                                        <p className="text-muted-foreground">{profileData.bio}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'links' && (
                            <div className="bg-card border border-border rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-foreground">Social Media Links</h2>

                                    <button type='button' className="cursor-pointer flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                        <FiPlus className="w-4 h-4" />
                                        <span>Add Link</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {profileData.socialLinks.map((link) => (
                                        <div key={link.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl">{link.icon}</span>

                                                <div>
                                                    <p className="font-medium text-foreground">{link.platform}</p>
                                                    <p className="text-sm text-muted-foreground">{link.url}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type='button'
                                                    onClick={() => toggleSocialLink(link.id)}
                                                    className={`cursor-pointer p-2 rounded-lg transition-colors ${link.isActive
                                                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                                                        : 'bg-muted text-muted-foreground'
                                                        }`}
                                                >
                                                    {link.isActive ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                                                </button>

                                                <button 
                                                    type='button'
                                                    title='Edit Link'
                                                    className="cursor-pointer p-2 text-muted-foreground hover:text-foreground transition-colors">
                                                    <FiEdit3 className="w-4 h-4" />
                                                </button>

                                                <button
                                                    type='button'
                                                    title='Delete Link'
                                                    onClick={() => deleteSocialLink(link.id)}
                                                    className="cursor-pointer p-2 text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Analytics Overview</h2>
                                
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">Profile Views</p>
                                            <p className="text-2xl font-bold text-foreground">{analytics.totalViews}</p>
                                        </div>

                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">QR Scans</p>
                                            <p className="text-2xl font-bold text-foreground">{analytics.qrScans}</p>
                                        </div>
                                    </div>

                                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                                        <p className="text-muted-foreground">Chart visualization will go here</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* QR Code Section */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Your QR Code</h3>

                            <div className="text-center mb-6">
                                <div className="w-48 h-48 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <div className="w-32 h-32 bg-foreground rounded-lg flex items-center justify-center">
                                        <span className="text-background text-2xl font-bold">QR</span>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground">Your unique QR code</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type='button'
                                    onClick={handleDownloadQR}
                                    className="cursor-pointer w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    <FiDownload className="w-4 h-4" />
                                    <span>Download QR Code</span>
                                </button>

                                <button
                                    type='button'
                                    onClick={handleShareProfile}
                                    className="cursor-pointer w-full flex items-center justify-center space-x-2 border border-border text-foreground py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <FiShare2 className="w-4 h-4" />
                                    <span>Share Profile</span>
                                </button>
                            </div>
                        </div>

                        {/* Profile Link Section */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Profile Link</h3>

                            <div className="space-y-4">
                                <div className="p-3 bg-muted rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">Your Profile URL</p>
                                    <p className="text-sm font-mono text-foreground break-all">https://profileqr.com/johndoe</p>
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
                                        href="/johndoe"
                                        target="_blank"
                                        className="cursor-pointer flex items-center justify-center space-x-2 border border-border text-foreground py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <FiExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>

                            <div className="space-y-3">
                                <Link
                                    href="/profile/edit"
                                    className="cursor-pointer flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <FiEdit3 className="w-5 h-5 text-primary" />
                                    <span className="text-foreground">Edit Profile</span>
                                </Link>

                                <Link
                                    href="/settings"
                                    className="cursor-pointer flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <FiSettings className="w-5 h-5 text-secondary" />
                                    <span className="text-foreground">Settings</span>
                                </Link>

                                <Link
                                    href="/johndoe"
                                    target="_blank"
                                    className="cursor-pointer flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <FiGlobe className="w-5 h-5 text-accent" />
                                    <span className="text-foreground">View Profile</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;