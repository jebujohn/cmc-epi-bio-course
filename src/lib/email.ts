import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL!;
const COURSE_NAME = "46th Epidemiology Refresher Course (July 6–18, 2026)";
const COURSE_FEE = "₹8,850";

// ─── Shared HTML wrapper ───────────────────────────────────────────────────
function wrapHtml(title: string, bodyHtml: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2a5298 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:rgba(255,255,255,0.6);text-transform:uppercase;">Christian Medical College, Vellore</p>
              <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">${COURSE_NAME}</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                Department of Epidemiology &amp; Biostatistics<br />
                Christian Medical College, Vellore – 632 002, Tamil Nadu, India<br />
                <span style="color:#64748b;">This is an automated email. Please do not reply directly.</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── 1. Registration Confirmation ─────────────────────────────────────────
export async function sendRegistrationConfirmation(params: {
    toEmail: string;
    name: string;
    institution: string;
    qualification: string;
    authCode: string;
}) {
    const { toEmail, name, institution, qualification, authCode } = params;

    const body = `
<h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#1e293b;">Application Received!</h2>
<p style="margin:0 0 24px;font-size:15px;color:#64748b;">Thank you for applying, <strong>${name}</strong>. We've received your application and it is currently under review.</p>

<div style="background:#f0f9ff;border-left:4px solid #2a5298;border-radius:8px;padding:20px 24px;margin-bottom:28px;">
  <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#2a5298;text-transform:uppercase;letter-spacing:0.08em;">Application Summary</p>
  <table cellpadding="0" cellspacing="0" width="100%">
    <tr><td style="padding:4px 0;font-size:14px;color:#64748b;width:40%;">Name</td><td style="padding:4px 0;font-size:14px;font-weight:600;color:#1e293b;">${name}</td></tr>
    <tr><td style="padding:4px 0;font-size:14px;color:#64748b;">Institution</td><td style="padding:4px 0;font-size:14px;font-weight:600;color:#1e293b;">${institution}</td></tr>
    <tr><td style="padding:4px 0;font-size:14px;color:#64748b;">Qualification</td><td style="padding:4px 0;font-size:14px;font-weight:600;color:#1e293b;">${qualification}</td></tr>
    <tr><td style="padding:4px 0;font-size:14px;color:#64748b;">Status</td><td style="padding:4px 0;font-size:14px;font-weight:600;color:#f59e0b;">⏳ Under Review</td></tr>
  </table>
</div>

<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:20px 24px;margin-bottom:28px;text-align:center;">
  <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#b45309;text-transform:uppercase;">Participant Passcode</p>
  <p style="margin:0 0 8px;font-size:28px;font-weight:800;color:#92400e;letter-spacing:0.15em;font-family:monospace;">${authCode}</p>
  <p style="margin:0;font-size:13px;color:#b45309;">Please save this 6-letter code securely! You will need it to submit daily course feedback.</p>
</div>

<p style="margin:0 0 8px;font-size:15px;color:#475569;">What happens next?</p>
<ol style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#64748b;line-height:1.8;">
  <li>Our faculty committee will review all applications by <strong>May 25, 2026</strong>.</li>
  <li>Shortlisted candidates will receive an <strong>approval email</strong> with payment instructions.</li>
  <li>Your seat will be confirmed only after fee payment of <strong>${COURSE_FEE}</strong>.</li>
</ol>

<p style="margin:0;font-size:14px;color:#94a3b8;">Application deadline: <strong style="color:#1e293b;">May 25, 2026</strong></p>`;

    await sgMail.send({
        to: toEmail,
        from: { email: FROM_EMAIL, name: "CMC Vellore – Epidemiology Course" },
        subject: `Application Received – ${COURSE_NAME}`,
        html: wrapHtml("Application Received", body),
    });
}

// ─── 2. Approval / Rejection Notification ─────────────────────────────────
export async function sendStatusUpdateEmail(params: {
    toEmail: string;
    name: string;
    status: "APPROVED" | "REJECTED";
    registrationId: string;
}) {
    const { toEmail, name, status, registrationId } = params;
    const isApproved = status === "APPROVED";

    const statusColor = isApproved ? "#16a34a" : "#dc2626";
    const statusLabel = isApproved ? "✅ Approved" : "❌ Not Selected";
    const statusBg = isApproved ? "#f0fdf4" : "#fef2f2";
    const statusBorder = isApproved ? "#16a34a" : "#dc2626";

    const approvedExtras = isApproved
        ? `
<div style="background:#fefce8;border:1px solid #fde047;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
  <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#92400e;">⚠️ Action Required – Complete Payment</p>
  <p style="margin:0 0 12px;font-size:14px;color:#78350f;">Your seat is <strong>not confirmed</strong> until the course fee is paid. Please complete the payment as soon as possible to secure your place.</p>
  <p style="margin:0 0 4px;font-size:13px;color:#92400e;">Course Fee: <strong>${COURSE_FEE}</strong> (inclusive of GST)</p>
  <p style="margin:0;font-size:13px;color:#92400e;">Registration ID: <code style="background:#fde68a;padding:2px 6px;border-radius:4px;">${registrationId}</code></p>
</div>
<div style="text-align:center;margin-bottom:24px;">
  <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? "https://cmc-epi-bio-course.vercel.app"}/payment?identifier=${encodeURIComponent(toEmail)}"
     style="display:inline-block;background:linear-gradient(135deg,#1e3a5f,#2a5298);color:#fff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;letter-spacing:0.02em;">
    Pay ${COURSE_FEE} &amp; Confirm Seat →
  </a>
</div>`
        : "";

    const body = `
<h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#1e293b;">Application ${isApproved ? "Approved" : "Update"}</h2>
<p style="margin:0 0 24px;font-size:15px;color:#64748b;">Dear <strong>${name}</strong>, we have reviewed your application for the ${COURSE_NAME}.</p>

<div style="background:${statusBg};border-left:4px solid ${statusBorder};border-radius:8px;padding:16px 20px;margin-bottom:24px;">
  <p style="margin:0;font-size:16px;font-weight:700;color:${statusColor};">${statusLabel}</p>
  ${isApproved
        ? `<p style="margin:8px 0 0;font-size:14px;color:#166534;">Congratulations! Your application has been selected. Please complete the fee payment to confirm your enrollment.</p>`
        : `<p style="margin:8px 0 0;font-size:14px;color:#991b1b;">We appreciate your interest. Unfortunately, we were unable to offer you a seat in this cohort due to limited capacity. We encourage you to apply again for the next session.</p>`
    }
</div>

${approvedExtras}

<p style="margin:0;font-size:14px;color:#94a3b8;">For queries, contact the Department of Epidemiology &amp; Biostatistics, CMC Vellore.</p>`;

    await sgMail.send({
        to: toEmail,
        from: { email: FROM_EMAIL, name: "CMC Vellore – Epidemiology Course" },
        subject: isApproved
            ? `🎉 Application Approved – Action Required | ${COURSE_NAME}`
            : `Application Update – ${COURSE_NAME}`,
        html: wrapHtml(`Application ${status}`, body),
    });
}

// ─── 3. Payment Receipt ───────────────────────────────────────────────────
export async function sendPaymentReceiptEmail(params: {
    toEmail: string;
    name: string;
    registrationId: string;
    transactionId: string;
}) {
    const { toEmail, name, registrationId, transactionId } = params;
    const paymentDate = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const body = `
<h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#1e293b;">Payment Confirmed! 🎉</h2>
<p style="margin:0 0 24px;font-size:15px;color:#64748b;">Dear <strong>${name}</strong>, your payment has been received and your enrollment is now <strong>confirmed</strong>.</p>

<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:24px;margin-bottom:28px;">
  <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.08em;">Payment Receipt</p>
  <table cellpadding="0" cellspacing="0" width="100%">
    <tr style="border-bottom:1px solid #d1fae5;"><td style="padding:8px 0;font-size:14px;color:#64748b;">Participant</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#1e293b;text-align:right;">${name}</td></tr>
    <tr style="border-bottom:1px solid #d1fae5;"><td style="padding:8px 0;font-size:14px;color:#64748b;">Registration ID</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#1e293b;text-align:right;font-family:monospace;">${registrationId}</td></tr>
    <tr style="border-bottom:1px solid #d1fae5;"><td style="padding:8px 0;font-size:14px;color:#64748b;">Transaction ID</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#1e293b;text-align:right;font-family:monospace;">${transactionId}</td></tr>
    <tr style="border-bottom:1px solid #d1fae5;"><td style="padding:8px 0;font-size:14px;color:#64748b;">Date</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#1e293b;text-align:right;">${paymentDate}</td></tr>
    <tr style="border-bottom:1px solid #d1fae5;"><td style="padding:8px 0;font-size:14px;color:#64748b;">Amount Paid</td><td style="padding:8px 0;font-size:18px;font-weight:800;color:#16a34a;text-align:right;">${COURSE_FEE}</td></tr>
    <tr><td style="padding:8px 0;font-size:14px;color:#64748b;">Status</td><td style="padding:8px 0;text-align:right;"><span style="background:#dcfce7;color:#16a34a;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;">CONFIRMED</span></td></tr>
  </table>
</div>

<div style="background:#f8fafc;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
  <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1e293b;">📅 Course Details</p>
  <p style="margin:0 0 4px;font-size:14px;color:#475569;"><strong>Dates:</strong> July 6–18, 2026</p>
  <p style="margin:0 0 4px;font-size:14px;color:#475569;"><strong>Venue:</strong> Christian Medical College, Vellore</p>
  <p style="margin:0;font-size:14px;color:#475569;"><strong>Note:</strong> Accommodation charges are additional and to be arranged separately.</p>
</div>

<p style="margin:0;font-size:13px;color:#94a3b8;">Please retain this email as your payment confirmation. Further details about the course schedule will be shared closer to the date.</p>`;

    await sgMail.send({
        to: toEmail,
        from: { email: FROM_EMAIL, name: "CMC Vellore – Epidemiology Course" },
        subject: `Payment Confirmed – You're Enrolled! | ${COURSE_NAME}`,
        html: wrapHtml("Payment Confirmed", body),
    });
}

// ─── 4. Feedback Reminder ─────────────────────────────────────────────────
export async function sendFeedbackReminderEmail(params: {
    toEmail: string;
    name: string;
    authCode: string;
}) {
    const { toEmail, name, authCode } = params;

    const body = `
<h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#1e293b;">Daily Course Feedback Request</h2>
<p style="margin:0 0 24px;font-size:15px;color:#64748b;">Dear <strong>${name}</strong>, thank you for attending today's sessions of the ${COURSE_NAME}.</p>

<p style="margin:0 0 24px;font-size:15px;color:#475569;">To help us improve and ensure we are meeting your expectations, please take a few minutes to provide feedback for today's sessions.</p>

<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:20px 24px;margin-bottom:28px;text-align:center;">
  <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#b45309;text-transform:uppercase;">Your Participant Passcode</p>
  <p style="margin:0 0 8px;font-size:28px;font-weight:800;color:#92400e;letter-spacing:0.15em;font-family:monospace;">${authCode}</p>
  <p style="margin:0;font-size:13px;color:#b45309;">You will need this code to authenticate your feedback submission.</p>
</div>

<div style="text-align:center;margin-bottom:24px;">
  <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? "https://cmc-epi-bio-course.vercel.app"}/feedback"
     style="display:inline-block;background:linear-gradient(135deg,#1e3a5f,#2a5298);color:#fff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;letter-spacing:0.02em;">
    Submit Today's Feedback →
  </a>
</div>

<p style="margin:0;font-size:14px;color:#94a3b8;">Your responses are confidential and greatly appreciated.</p>`;

    await sgMail.send({
        to: toEmail,
        from: { email: FROM_EMAIL, name: "CMC Vellore – Epidemiology Course" },
        subject: `Reminder: Daily Course Feedback | ${COURSE_NAME}`,
        html: wrapHtml("Feedback Reminder", body),
    });
}
