export function getSupabaseEnvVariables() {
  const project = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!anonKey || (!project && !envUrl)) {
    console.error("Missing Supabase environment variables", {
      project,
      anonKey,
      envUrl,
    });
    throw new Error("Missing Supabase environment variables");
  }

  const url = envUrl || `https://${project}.supabase.co`;

  return {
    project,
    anonKey,
    url,
  };
}
