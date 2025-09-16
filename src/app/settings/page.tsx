import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const SettingsPage = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4 mx-auto text-5xl">
                    !
                </div>

                <h1 className="text-2xl font-bold text-foreground mb-2">this Feature is not avilable</h1>

                <p className="text-muted-foreground mb-6">
                    This feature is not available Right now, will be added a future versions
                </p>

                <div className="flex flex-col gap-3 items-center p-4">
                    <Link
                        href="/"
                        className="w-3/4 md:w-1/2 flex justify-center items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4" />

                        <span>Go Home</span>
                    </Link>

                    <Link
                        href="/dashboard"
                        className="w-3/4 md:w-1/2 flex justify-center items-center space-x-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4" />

                        <span>Go To Dashboard</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;