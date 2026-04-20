import type {
  AppointmentPayload,
  ContactPayload,
  SubscribePayload
} from "@/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmail(v: unknown): v is string {
  return typeof v === "string" && EMAIL_RE.test(v.trim());
}

function isNonEmpty(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function validateAppointment(body: unknown): {
  ok: true; data: AppointmentPayload;
} | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;
  if (!isNonEmpty(b.full_name)) return { ok: false, error: "Name is required" };
  if (!isEmail(b.email)) return { ok: false, error: "Valid email is required" };
  if (b.booking_type_code !== "online" && b.booking_type_code !== "on-site") {
    return { ok: false, error: "Booking type must be 'online' or 'on-site'" };
  }
  return {
    ok: true,
    data: {
      full_name: String(b.full_name).trim(),
      email: String(b.email).trim(),
      phone: isNonEmpty(b.phone) ? String(b.phone).trim() : undefined,
      preferred_date: isNonEmpty(b.preferred_date) ? String(b.preferred_date) : undefined,
      preferred_time: isNonEmpty(b.preferred_time) ? String(b.preferred_time) : undefined,
      project_slug: isNonEmpty(b.project_slug) ? String(b.project_slug) : undefined,
      booking_type_code: b.booking_type_code,
      message: isNonEmpty(b.message) ? String(b.message).trim() : undefined
    }
  };
}

export function validateSubscribe(body: unknown): {
  ok: true; data: SubscribePayload;
} | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;
  if (!isEmail(b.email)) return { ok: false, error: "Valid email is required" };
  return { ok: true, data: { email: String(b.email).trim().toLowerCase() } };
}

export function validateContact(body: unknown): {
  ok: true; data: ContactPayload;
} | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;
  if (!isNonEmpty(b.full_name)) return { ok: false, error: "Name is required" };
  if (!isEmail(b.email)) return { ok: false, error: "Valid email is required" };
  if (!isNonEmpty(b.message)) return { ok: false, error: "Message is required" };
  return {
    ok: true,
    data: {
      full_name: String(b.full_name).trim(),
      email: String(b.email).trim(),
      phone: isNonEmpty(b.phone) ? String(b.phone).trim() : undefined,
      subject: isNonEmpty(b.subject) ? String(b.subject).trim() : undefined,
      message: String(b.message).trim()
    }
  };
}
