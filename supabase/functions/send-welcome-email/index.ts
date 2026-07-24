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
const fromEmail = Deno.env.get('WELCOME_EMAIL_FROM') || 'Gadugy <hello@gadugy.com>';
const replyToEmail = Deno.env.get('WELCOME_EMAIL_REPLY_TO') || 'hello@gadugy.com';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

function neighborhood(record: IntakeSubmissionRecord) {
  return record.community_cluster === 'Other' && record.other_city ? record.other_city : record.community_cluster;
}

function welcomeHtml(record: IntakeSubmissionRecord) {
  const name = record.parent_name || 'there';
  const cluster = neighborhood(record);
  const clusterLine = cluster ? `<p>We saved your request for <strong>${cluster}</strong>.</p>` : '';
  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#3f362a;line-height:1.6;max-width:620px;margin:auto;padding:24px">
      <h1 style="color:#5f6f52">Welcome to Gadugy early access</h1>
      <p>Hi ${name},</p>
      <p>Thank you for requesting early access to Gadugy. Your intake answers were saved successfully.</p>
      ${clusterLine}
      <h2 style="color:#5f6f52;font-size:20px">What happens next</h2>
      <ol>
        <li>We review incoming requests by neighborhood and homeschool stage.</li>
        <li>When your local cluster is ready, we will email you instructions to complete your profile.</li>
        <li>After profile completion, Gadugy can start suggesting nearby family matches.</li>
      </ol>
      <p>If you want to add context before then, reply to this email.</p>
      <p>Warmly,<br/>Gadugy</p>
    </div>
  `;
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);
  if (!resendApiKey) return jsonResponse({ error: 'RESEND_API_KEY is not configured' }, 500);

  const payload = await request.json() as WebhookPayload;
  const record = payload.record;
  if (!record?.email) return jsonResponse({ error: 'Missing intake record email' }, 400);

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
      subject: 'Welcome to Gadugy early access',
      html: welcomeHtml(record)
    })
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) return jsonResponse({ error: 'Email provider failed', detail: result }, 502);
  return jsonResponse({ ok: true, result });
});
