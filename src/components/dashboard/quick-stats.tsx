import { analytics } from "@/placeholders";
import { FiBarChart, FiCode, FiEye, FiUsers } from "react-icons/fi";

const QuickStats = () => {
    return (
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
    )
}

export default QuickStats;