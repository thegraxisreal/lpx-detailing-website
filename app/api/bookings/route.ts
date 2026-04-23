import { Resend } from 'resend';

const BOOKING_DESTINATION = 'deweyduck129@gmail.com';
const DEFAULT_SENDER = 'LPX Mobile Detailing <onboarding@resend.dev>';

interface BookingRequestBody {
  fullName?: string;
  phone?: string;
  email?: string;
  preferredDateTime?: string;
  location?: string;
  notes?: string;
  brandLabel?: string;
  model?: string;
  vehicleSizeLabel?: string;
  serviceLabel?: string;
  addonsLabels?: string[];
  conditionLabel?: string;
  estimateMin?: number;
  estimateMax?: number;
  estimatedTime?: string;
}

interface NormalizedBooking {
  fullName: string;
  phone: string;
  email: string;
  preferredDateTime: string;
  location: string;
  notes: string;
  brandLabel: string;
  model: string;
  vehicleSizeLabel: string;
  serviceLabel: string;
  addonsLabels: string[];
  conditionLabel: string;
  estimateMin: number | null;
  estimateMax: number | null;
  estimatedTime: string;
}

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeAddons(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .slice(0, 10);
}

function normalizeNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function validateBooking(payload: BookingRequestBody) {
  const booking: NormalizedBooking = {
    fullName: normalizeString(payload.fullName),
    phone: normalizeString(payload.phone),
    email: normalizeString(payload.email),
    preferredDateTime: normalizeString(payload.preferredDateTime),
    location: normalizeString(payload.location),
    notes: normalizeString(payload.notes),
    brandLabel: normalizeString(payload.brandLabel),
    model: normalizeString(payload.model),
    vehicleSizeLabel: normalizeString(payload.vehicleSizeLabel),
    serviceLabel: normalizeString(payload.serviceLabel),
    addonsLabels: normalizeAddons(payload.addonsLabels),
    conditionLabel: normalizeString(payload.conditionLabel),
    estimateMin: normalizeNumber(payload.estimateMin),
    estimateMax: normalizeNumber(payload.estimateMax),
    estimatedTime: normalizeString(payload.estimatedTime)
  };

  const missingFields = ['fullName', 'phone', 'email', 'serviceLabel'].filter((field) => {
    const value = booking[field as keyof NormalizedBooking];
    return typeof value === 'string' ? value.length === 0 : false;
  });

  if (missingFields.length > 0) {
    return { ok: false as const, error: `Missing required fields: ${missingFields.join(', ')}` };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(booking.email)) {
    return { ok: false as const, error: 'Please provide a valid email address.' };
  }

  return { ok: true as const, booking };
}

function formatRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top; width: 180px;">${escapeHtml(label)}</td>
      <td style="padding: 10px 0; color: #e5e7eb; font-size: 15px; font-weight: 500;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function buildEmailHtml(booking: NormalizedBooking, submittedAt: string) {
  const vehicle = [booking.brandLabel, booking.model].filter(Boolean).join(' ') || 'Not provided';
  const estimateRange =
    booking.estimateMin !== null && booking.estimateMax !== null
      ? `$${booking.estimateMin}-$${booking.estimateMax}`
      : 'Not available';
  const addOns = booking.addonsLabels.length > 0 ? booking.addonsLabels.join(', ') : 'No add-ons';

  const rows = [
    formatRow('Customer', booking.fullName),
    formatRow('Email', booking.email),
    formatRow('Phone', booking.phone),
    booking.preferredDateTime ? formatRow('Preferred Date / Time', booking.preferredDateTime) : '',
    booking.location ? formatRow('Service Location', booking.location) : '',
    formatRow('Vehicle', vehicle),
    booking.vehicleSizeLabel ? formatRow('Vehicle Size', booking.vehicleSizeLabel) : '',
    formatRow('Package', booking.serviceLabel),
    formatRow('Estimated Price', estimateRange),
    booking.estimatedTime ? formatRow('Estimated Time', booking.estimatedTime) : '',
    booking.conditionLabel ? formatRow('Condition', booking.conditionLabel) : '',
    formatRow('Add-ons', addOns),
    booking.notes ? formatRow('Extra Notes', booking.notes) : '',
    formatRow('Submitted', submittedAt)
  ]
    .filter(Boolean)
    .join('');

  return `
    <div style="margin:0; background:#03060d; padding:32px 16px; font-family:Inter,Arial,sans-serif;">
      <div style="max-width:680px; margin:0 auto; background:#08101b; border:1px solid #182433; border-radius:24px; overflow:hidden;">
        <div style="padding:28px 32px; border-bottom:1px solid #182433; background:linear-gradient(180deg, rgba(30,91,255,0.12), rgba(30,91,255,0));">
          <div style="color:#1e5bff; font-size:12px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase;">New LPX Booking Request</div>
          <h1 style="margin:14px 0 6px; color:#f8fafc; font-size:30px; line-height:1.1;">${escapeHtml(booking.fullName)} is ready to book</h1>
          <p style="margin:0; color:#cbd5e1; font-size:15px;">${escapeHtml(booking.serviceLabel)} for ${escapeHtml(vehicle)}</p>
        </div>
        <div style="padding:28px 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            ${rows}
          </table>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(booking: NormalizedBooking, submittedAt: string) {
  const vehicle = [booking.brandLabel, booking.model].filter(Boolean).join(' ') || 'Not provided';
  const estimateRange =
    booking.estimateMin !== null && booking.estimateMax !== null
      ? `$${booking.estimateMin}-$${booking.estimateMax}`
      : 'Not available';

  return [
    'New LPX Booking Request',
    '',
    `Customer: ${booking.fullName}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    booking.preferredDateTime ? `Preferred Date / Time: ${booking.preferredDateTime}` : '',
    booking.location ? `Service Location: ${booking.location}` : '',
    '',
    `Vehicle: ${vehicle}`,
    booking.vehicleSizeLabel ? `Vehicle Size: ${booking.vehicleSizeLabel}` : '',
    `Package: ${booking.serviceLabel}`,
    `Estimated Price: ${estimateRange}`,
    booking.estimatedTime ? `Estimated Time: ${booking.estimatedTime}` : '',
    booking.conditionLabel ? `Condition: ${booking.conditionLabel}` : '',
    `Add-ons: ${booking.addonsLabels.length > 0 ? booking.addonsLabels.join(', ') : 'No add-ons'}`,
    booking.notes ? `Extra Notes: ${booking.notes}` : '',
    '',
    `Submitted: ${submittedAt}`
  ]
    .filter(Boolean)
    .join('\n');
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json(
      { success: false, error: 'RESEND_API_KEY is not configured on the server.' },
      { status: 500 }
    );
  }

  let payload: BookingRequestBody;

  try {
    payload = (await request.json()) as BookingRequestBody;
  } catch {
    return Response.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const validation = validateBooking(payload);

  if (!validation.ok) {
    return Response.json({ success: false, error: validation.error }, { status: 400 });
  }

  const booking = validation.booking;
  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  const vehicle = [booking.brandLabel, booking.model].filter(Boolean).join(' ') || 'Vehicle not specified';
  const from = process.env.RESEND_FROM_EMAIL || DEFAULT_SENDER;
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [BOOKING_DESTINATION],
      subject: `New LPX Booking Request – ${booking.fullName} – ${vehicle}`,
      html: buildEmailHtml(booking, submittedAt),
      text: buildEmailText(booking, submittedAt),
      replyTo: booking.email
    });

    if (error) {
      console.error('Resend booking send failed:', error);
      return Response.json(
        { success: false, error: 'Unable to send booking email right now.' },
        { status: 502 }
      );
    }

    return Response.json({ success: true, id: data?.id ?? null });
  } catch (error) {
    console.error('Booking route unexpected error:', error);
    return Response.json(
      { success: false, error: 'Something went wrong while sending your booking.' },
      { status: 500 }
    );
  }
}
