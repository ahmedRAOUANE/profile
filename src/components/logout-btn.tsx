"use client";

import { createClientSb } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

const LogoutBtn = () => {
    const router = useRouter();

    const logout = async () => {
        const supabase = createClientSb();
        await supabase.auth.signOut();
        router.push("/auth/login");
    };

    return (
        <button
            onClick={logout}
            title='Log Out'
            type='button'
            className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        >
            <FiLogOut className="w-5 h-5" />
        </button>
    )
}

export default LogoutBtn;