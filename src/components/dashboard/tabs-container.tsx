"use client"

import { useState } from "react";
// import AnalyticsTab from "./analytics-tab";
import LinksTab from "./links-tab";
import ProfileTab from "./profile-tab";
import { ProfileData } from "../../../types/profile-data";

const TabsContainer = ({ profileData }: { profileData: ProfileData }) => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
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

                {/* <button
                    type='button'
                    onClick={() => setActiveTab('analytics')}
                    className={`cursor-pointer flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'analytics'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Analytics
                </button> */}
            </div>

            {/* Tab Content */}
            {activeTab === 'profile' && (
                <ProfileTab
                    profileData={{
                        avatar_url: profileData.avatar_url,
                        username: profileData.username,
                        email: profileData.email,
                        bio: profileData.bio,
                        id: profileData.id
                    }}
                />
            )}

            {activeTab === 'links' && (
                <LinksTab links={profileData.social_links} />
            )}

            {/* {activeTab === 'analytics' && (
                <AnalyticsTab />
            )} */}
        </div>
    )
}

export default TabsContainer;