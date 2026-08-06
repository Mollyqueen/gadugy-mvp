type IntakeSubmissionRecord = {
  id?: string;
  parent_name?: string;
  email?: string;
  community_cluster?: string;
  other_city?: string | null;
};

type WebhookPayload = {
  type?: string;
  table?: string;
  record?: IntakeSubmissionRecord;
};

const resendApiKey = Deno.env.get('RESEND_API_KEY');
const fromEmail = Deno.env.get('WELCOME_EMAIL_FROM') || 'Gather Parents <hello@contact.gatherparents.com>';
const replyToEmail = Deno.env.get('WELCOME_EMAIL_REPLY_TO') || 'hello@gatherparents.com';
const siteUrl = (Deno.env.get('SITE_URL') || 'https://gatherparents.com').replace(/\/$/, '');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

function neighborhood(record: IntakeSubmissionRecord) {
  return record.community_cluster === 'Other' && record.other_city ? record.other_city : record.community_cluster;
}

async function makeProfileEditLink(intakeId: string): Promise<string | null> {
  if (!supabaseUrl || !serviceRoleKey) return null;
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/make_profile_edit_token`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        authorization: `Bearer ${serviceRoleKey}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ p_intake_id: intakeId })
    });
    if (!response.ok) return null;
    const token = await response.json();
    return token ? `${siteUrl}/?edit=${token}` : null;
  } catch {
    return null;
  }
}

function welcomeHtml(record: IntakeSubmissionRecord, editLink: string | null) {
  const name = record.parent_name || 'there';
  const cluster = neighborhood(record);
  const clusterLine = cluster ? `<p>We saved your request for <strong>${cluster}</strong>.</p>` : '';
  const cta = editLink
    ? `<p style="margin:28px 0 8px"><a href="${editLink}" style="display:inline-block;background:#8da878;color:#fffdf8;text-decoration:none;font-weight:700;border-radius:99px;padding:14px 30px">Set up your family profile &rarr;</a></p>
       <p style="font-size:13px;color:#8a7a68">This link is just for you and works for 30 days. It opens your profile with your intake answers already filled in.</p>`
    : '';
  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#3f362a;line-height:1.6;max-width:620px;margin:auto;padding:24px">
      <h1 style="color:#5f6f52">Welcome to Gather Parents early access</h1>
      <p>Hi ${name},</p>
      <p>Thank you for requesting early access to Gather Parents. Your intake answers were saved successfully.</p>
      ${clusterLine}
      <h2 style="color:#5f6f52;font-size:20px">What happens next</h2>
      <ol>
        <li>Set up your family profile. Everything from your intake form is already saved, so this is light work: a short intro, a few preferences, and your privacy choices.</li>
        <li>We review every family by hand. Expect to hear from us within 2 to 3 days.</li>
        <li>Matching opens neighborhood by neighborhood. The more complete your profile, the better your first matches will be.</li>
      </ol>
      ${cta}
      <p>Questions, hesitations, or hopes for what you will find here? Hit reply. We read every note.</p>
      <p>With gratitude,<br/>Jimmy and Sara<br/>Founders, Gather Parents</p>
      <p style="font-size:13px;color:#8a7a68;font-style:italic">P.S. Child names are never public, your exact address is never shown, and every family is reviewed by a real person. Trust from the first click.</p>
    </div>
  `;
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);
  if (!resendApiKey) return jsonResponse({ error: 'RESEND_API_KEY is not configured' }, 500);

  const payload = await request.json() as WebhookPayload;
  const record = payload.record;
  if (!record?.email) return jsonResponse({ error: 'Missing intake record email' }, 400);

  const editLink = record.id ? await makeProfileEditLink(record.id) : null;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${resendApiKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [record.email],
      reply_to: replyToEmail,
      subject: 'Welcome to Gather Parents early access',
      html: welcomeHtml(record, editLink)
    })
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) return jsonResponse({ error: 'Email provider failed', detail: result }, 502);
  return jsonResponse({ ok: true, result, editLinkIncluded: Boolean(editLink) });
});
