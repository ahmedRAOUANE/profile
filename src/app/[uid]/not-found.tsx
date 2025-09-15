"use client";

import Link from "next/link";
import { FiArrowLeft, FiUser } from "react-icons/fi";

const ProfileNotFoundPage = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUser className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>

                <h1 className="text-2xl font-bold text-foreground mb-2">Profile Not Found</h1>

                <p className="text-muted-foreground mb-6">The profile you&apos;re looking for doesn&apos;t exist.</p>

                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <FiArrowLeft className="w-4 h-4" />

                    <span>Go Home</span>
                </Link>
            </div>
        </div>
    )
}

export default ProfileNotFoundPage;