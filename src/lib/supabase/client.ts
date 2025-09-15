import { supabaseAnonKey, supabaseUrl } from "@/constants";
import { createBrowserClient } from "@supabase/ssr";

export function createClientSb() {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  );
}
