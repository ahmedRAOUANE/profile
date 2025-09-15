import Link from "next/link";
import { FiEdit3, FiGlobe, FiSettings } from "react-icons/fi";

const QuickActionsSection = () => {
    return (
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
    )
}

export default QuickActionsSection;