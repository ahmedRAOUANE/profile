import { analytics } from "@/placeholders"

// ! the analitycs tab styll experimental

const AnalyticsTab = () => {
    return (
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
    )
}

export default AnalyticsTab