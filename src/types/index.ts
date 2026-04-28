export interface ProjectCardData {
  slug: string;
  name: string;
  tagline?: string;
  location: string;
  thumbnail: string;
  status?: "latest" | "completed" | string;
  bookingAvailable?: boolean;
}

export interface ProjectLayout {
  src: string;
  label: string;
}

export interface AmenityIcon {
  icon: string;
  label: string;
}

export interface ProjectFaq {
  q: string;
  a: string;
}

export interface ProjectContent {
  slug: string;
  folder: string;
  name: string;
  tagline?: string;
  location: string;
  rera?: string;
  architect?: string;
  type?: string;
  status?: "latest" | "completed" | string;
  bookingAvailable?: boolean;
  hero: string;
  heroVideo?: string;
  thumbnail: string;
  summary: string;
  description: string;
  brochure?: string;
  coordinates?: { lat: number; lng: number };
  overview: {
    topView: string;
    elevation: string;
    layouts: ProjectLayout[];
  };
  projectAmenities: AmenityIcon[];
  villaAmenities: AmenityIcon[];
  gallery: string[];
  faqs: ProjectFaq[];
  mapEmbed?: string;
}

export interface AppointmentBookingType {
  id: string;
  code: "online" | "on-site";
  label: string;
}

export interface AppointmentPayload {
  booking_type_code: "online" | "on-site";
  full_name: string;
  email: string;
  phone?: string;
  preferred_date?: string;
  preferred_time?: string;
  project_slug?: string;
  message?: string;
}

export interface SubscribePayload {
  email: string;
}

export interface ContactPayload {
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}
