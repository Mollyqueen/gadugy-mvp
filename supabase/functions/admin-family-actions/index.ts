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

const ALLOWED_STATUS = ['pending_review', 'reviewing', 'approved', 'waitlisted', 'rejected', 'archived'];

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);
  if (!supabaseUrl || !serviceRoleKey) return jsonResponse({ error: 'Server not configured' }, 500);
  if (!adminToken) return jsonResponse({ error: 'Admin access is not configured' }, 503);

  const body = await request.json().catch(() => ({}));
  if (!body.token || body.token !== adminToken) return jsonResponse({ error: 'Unauthorized' }, 401);

  const { action, id, status, notes } = body;
  if (!id) return jsonResponse({ error: 'Missing family id' }, 400);

  const headers = {
    apikey: serviceRoleKey,
    authorization: `Bearer ${serviceRoleKey}`,
    'content-type': 'application/json',
    prefer: 'return=minimal'
  };

  if (action === 'set_status') {
    if (!ALLOWED_STATUS.includes(status)) return jsonResponse({ error: 'Invalid status' }, 400);
    const res = await fetch(`${supabaseUrl}/rest/v1/intake_submissions?id=eq.${id}`, {
      method: 'PATCH', headers, body: JSON.stringify({ status })
    });
    if (!res.ok) return jsonResponse({ error: 'Update failed' }, 502);
    return jsonResponse({ ok: true });
  }

  if (action === 'set_notes') {
    const res = await fetch(`${supabaseUrl}/rest/v1/intake_submissions?id=eq.${id}`, {
      method: 'PATCH', headers, body: JSON.stringify({ admin_notes: notes ?? '' })
    });
    if (!res.ok) return jsonResponse({ error: 'Update failed' }, 502);
    return jsonResponse({ ok: true });
  }

  if (action === 'detail') {
    const res = await fetch(`${supabaseUrl}/rest/v1/intake_submissions?id=eq.${id}&select=*`, {
      headers: { apikey: serviceRoleKey, authorization: `Bearer ${serviceRoleKey}` }
    });
    const rows = await res.json().catch(() => []);
    if (!res.ok || !rows?.length) return jsonResponse({ error: 'Not found' }, 404);
    // strip nothing for founders, but drop user_agent noise
    const row = rows[0];
    delete row.user_agent;
    return jsonResponse({ ok: true, family: row });
  }

  if (action === 'activity') {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/daily_activity?intake_id=eq.${id}&order=day.desc&limit=30`,
      { headers: { apikey: serviceRoleKey, authorization: `Bearer ${serviceRoleKey}` } }
    );
    const rows = await res.json().catch(() => []);
    return jsonResponse({ ok: true, activity: rows });
  }

  return jsonResponse({ error: 'Unknown action' }, 400);
});
