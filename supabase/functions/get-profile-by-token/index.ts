const supabaseUrl = Deno.env.get('SUPABASE_URL');
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

const SAFE_FIELDS = [
  'id', 'parent_name', 'email', 'community_cluster', 'other_city', 'homeschool_stage',
  'children_age_ranges', 'community_goals', 'community_goal_other', 'family_culture_words',
  'core_values', 'core_values_other', 'values_in_practice', 'homeschool_reasons',
  'education_aspirations', 'education_aspiration_other', 'family_values', 'family_interests',
  'distance_preference', 'current_setup', 'connection_goals', 'connection_goal_other',
  'nontraditional_subjects', 'intro'
];

Deno.serve(async (request) => {
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);
  if (!supabaseUrl || !serviceRoleKey) return jsonResponse({ error: 'Server not configured' }, 500);

  const { token } = await request.json().catch(() => ({}));
  if (!token || typeof token !== 'string') return jsonResponse({ error: 'Missing token' }, 400);

  const verifyRes = await fetch(`${supabaseUrl}/rest/v1/rpc/verify_profile_edit_token`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ p_token: token })
  });
  const intakeId = await verifyRes.json().catch(() => null);
  if (!verifyRes.ok || !intakeId) return jsonResponse({ error: 'Invalid or expired link' }, 401);

  const rowRes = await fetch(
    `${supabaseUrl}/rest/v1/intake_submissions?id=eq.${intakeId}&select=${SAFE_FIELDS.join(',')}`,
    { headers: { apikey: serviceRoleKey, authorization: `Bearer ${serviceRoleKey}` } }
  );
  const rows = await rowRes.json().catch(() => []);
  if (!rowRes.ok || !rows?.length) return jsonResponse({ error: 'Profile not found' }, 404);

  return jsonResponse({ ok: true, profile: rows[0] });
});
