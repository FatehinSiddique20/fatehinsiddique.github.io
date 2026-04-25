import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const { name, email, company, purpose, message } = await req.json();

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
<hr/>
<p><strong>Message:</strong></p>
<p>${message}</p>
    `.trim(),
  });

  return Response.json({ success: true });
});