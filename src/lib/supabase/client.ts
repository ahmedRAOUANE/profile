import { supabaseAnonKey, supabaseUrl } from "@/constants";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  );
}
