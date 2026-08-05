const supabaseUrl = Deno.env.get('SUPABASE_URL');
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const adminToken = Deno.env.get('ADMIN_DASHBOARD_TOKEN');

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info'
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders }
  });
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);
  if (!supabaseUrl || !serviceRoleKey) return jsonResponse({ error: 'Server not configured' }, 500);
  if (!adminToken) return jsonResponse({ error: 'Admin access is not configured' }, 503);

  const { token } = await request.json().catch(() => ({}));
  if (!token || token !== adminToken) return jsonResponse({ error: 'Unauthorized' }, 401);

  const res = await fetch(
    `${supabaseUrl}/rest/v1/intake_submissions?select=id,created_at,status,parent_name,email,community_cluster,other_city,homeschool_stage,children_age_ranges,community_goals,core_values,family_culture_words,values_in_practice,distance_preference,price_variant,referral_source,referral_code&order=created_at.desc`,
    { headers: { apikey: serviceRoleKey, authorization: `Bearer ${serviceRoleKey}` } }
  );
  const rows = await res.json().catch(() => []);
  if (!res.ok) return jsonResponse({ error: 'Query failed' }, 502);

  const emails = rows.map((r: { email?: string }) => r.email).filter(Boolean);
  let emailsSent: Record<string, string> = {};
  if (emails.length) {
    const q = await fetch(
      `${supabaseUrl}/rest/v1/welcome_email_queue?select=email,status,created_at&order=created_at.desc`,
      { headers: { apikey: serviceRoleKey, authorization: `Bearer ${serviceRoleKey}` } }
    );
    const qrows = await q.json().catch(() => []);
    if (Array.isArray(qrows)) {
      for (const q of qrows) if (q.email && !emailsSent[q.email]) emailsSent[q.email] = q.status;
    }
  }

  const families = rows.map((r: Record<string, unknown>) => ({
    ...r,
    welcome_email_status: emailsSent[(r.email as string) || ''] || 'unknown'
  }));

  return jsonResponse({ ok: true, count: families.length, families });
});
