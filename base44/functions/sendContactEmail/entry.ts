import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// IMPORTANT: Replace this with your Google Sheet ID
// (found in the sheet URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit)
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const SHEET_NAME = 'Contacts'; // Name of the tab in your sheet

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const { name, email, company, purpose, message } = await req.json();

  const timestamp = new Date().toISOString();

  // 1. Send email notification
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: 'fatehin20@gmail.com',
    from_name: 'Portfolio Contact Form',
    subject: `New Message from ${name} — ${purpose || 'General Inquiry'}`,
    body: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || '—'}</p>
<p><strong>Purpose:</strong> ${purpose || '—'}</p>
<p><strong>Time:</strong> ${timestamp}</p>
<hr/>
<p><strong>Message:</strong></p>
<p>${message}</p>
    `.trim(),
  });

  // 2. Log to Google Sheet
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlesheets');

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[timestamp, name, email, company || '', purpose || '', message]],
      }),
    }
  );

  return Response.json({ success: true });
});