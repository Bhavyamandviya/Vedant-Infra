// import { getSupabase } from "@/lib/supabase";
// import type {
//   AppointmentPayload,
//   ContactPayload,
//   SubscribePayload
// } from "@/types";

// async function resolveBookingTypeId(code: "online" | "on-site"): Promise<string> {
//   const supabase = getSupabase();
//   const { data, error } = await supabase
//     .from("appointment_booking_types")
//     .select("id")
//     .eq("code", code)
//     .maybeSingle();
//   if (error) throw new Error(error.message);
//   if (!data) throw new Error(`Booking type '${code}' not found`);
//   return data.id as string;
// }

// export async function createAppointment(payload: AppointmentPayload): Promise<{ id: string }> {
//   const supabase = getSupabase();
//   const booking_type_id = await resolveBookingTypeId(payload.booking_type_code);
//   const insertPayload = {
//     booking_type_id,
//     full_name: payload.full_name,
//     email: payload.email,
//     phone: payload.phone ?? null,
//     preferred_date: payload.preferred_date ?? null,
//     preferred_time: payload.preferred_time ?? null,
//     message: [
//       payload.project_slug ? `Project: ${payload.project_slug}` : null,
//       payload.message ?? null
//     ].filter(Boolean).join("\n\n") || null
//   };
//   const { data, error } = await supabase
//     .from("appointment_bookings")
//     .insert(insertPayload)
//     .select("id")
//     .single();
//   if (error) throw new Error(error.message);
//   return { id: data.id as string };
// }

// export async function createSubscriber(payload: SubscribePayload): Promise<{ id: string }> {
//   const supabase = getSupabase();
//   const { data, error } = await supabase
//     .from("subscribers")
//     .insert({ email: payload.email })
//     .select("id")
//     .single();
//   if (error) throw new Error(error.message);
//   return { id: data.id as string };
// }

// export async function createContactMessage(payload: ContactPayload): Promise<{ id: string }> {
//   const supabase = getSupabase();
//   const { data, error } = await supabase
//     .from("contact_us")
//     .insert({
//       full_name: payload.full_name,
//       email: payload.email,
//       phone: payload.phone ?? null,
//       subject: payload.subject ?? null,
//       message: payload.message
//     })
//     .select("id")
//     .single();
//   if (error) throw new Error(error.message);
//   return { id: data.id as string };
// }
import { getSupabase } from "@/lib/supabase";
import type {
  AppointmentPayload,
  ContactPayload,
  SubscribePayload
} from "@/types";

async function resolveBookingTypeId(code: "online" | "on-site"): Promise<string> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("appointment_booking_types")
    .select("id")
    .eq("code", code)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error(`Booking type '${code}' not found`);
  return data.id as string;
}

export async function createAppointment(payload: AppointmentPayload): Promise<{ id: string }> {
  const supabase = getSupabase();
  const id = crypto.randomUUID();
  const booking_type_id = await resolveBookingTypeId(payload.booking_type_code);
  const insertPayload = {
    id,
    booking_type_id,
    full_name: payload.full_name,
    email: payload.email,
    phone: payload.phone ?? null,
    preferred_date: payload.preferred_date ?? null,
    preferred_time: payload.preferred_time ?? null,
    message: [
      payload.project_slug ? `Project: ${payload.project_slug}` : null,
      payload.message ?? null
    ].filter(Boolean).join("\n\n") || null
  };
  const { error } = await supabase
    .from("appointment_bookings")
    .insert(insertPayload);
  if (error) throw new Error(error.message);
  return { id };
}

export async function createSubscriber(payload: SubscribePayload): Promise<{ id: string }> {
  const supabase = getSupabase();
  const id = crypto.randomUUID();
  const { error } = await supabase
    .from("subscribers")
    .insert({ id, email: payload.email });
  if (error) throw new Error(error.message);
  return { id };
}

export async function createContactMessage(payload: ContactPayload): Promise<{ id: string }> {
  const supabase = getSupabase();
  const id = crypto.randomUUID();
  const { error } = await supabase
    .from("contact_us")
    .insert({
      id,
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone ?? null,
      subject: payload.subject ?? null,
      message: payload.message
    });
  if (error) throw new Error(error.message);
  return { id };
}
