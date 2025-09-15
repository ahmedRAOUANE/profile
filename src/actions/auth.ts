"use server";

/**
 * this action is in progress, not yet ready for production
 */
import { baseUrl } from "@/constants";
import { createServerSb } from "@/lib/supabase/server";
import { Provider } from "@supabase/supabase-js";

const signInWith = (provider: Provider) => async () => {
    const supabase = await createServerSb();
    const { error, data } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${baseUrl}/api/auth/callback/${provider}`,
        },
    });

    if (error) {
        console.error('Error signing in with OAuth:', error);
    }

    console.log('OAuth sign-in data:', data);
}

export const signInWithGoogle = signInWith('google');