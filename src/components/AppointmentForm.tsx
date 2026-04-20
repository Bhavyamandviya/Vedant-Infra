"use client";

import { useState } from "react";

interface ProjectOption { slug: string; name: string }

interface Props {
  projects: ProjectOption[];
  defaultProject?: string;
}

const TYPES: { value: string; label: string }[] = [
  { value: "on-site", label: "Site Visit" },
  { value: "online", label: "Call" },
  { value: "on-site-meeting", label: "Meeting" }
];

function mapType(v: string): "online" | "on-site" {
  return v === "online" ? "online" : "on-site";
}

export default function AppointmentForm({ projects, defaultProject }: Props) {
  const [full_name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [project_slug, setProject] = useState(defaultProject ?? "");
  const [type, setType] = useState("on-site");
  const [message, setMessage] = useState("");
  const [preferred_date, setDate] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name,
          email,
          phone,
          preferred_date: preferred_date || undefined,
          project_slug: project_slug || undefined,
          booking_type_code: mapType(type),
          message: [`Type: ${TYPES.find((t) => t.value === type)?.label ?? type}`, message].filter(Boolean).join("\n\n")
        })
      });
      const body = await res.json();
      if (!res.ok || !body.ok) throw new Error(body.error || "Failed");
      setStatus("ok");
      setFeedback("Thank you. Our relationship team will reach out shortly.");
      setName(""); setPhone(""); setEmail(""); setMessage(""); setDate("");
    } catch (err) {
      setStatus("error");
      setFeedback((err as Error).message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-2">
        <div>
          <label className="eyebrow mb-2 block">Name</label>
          <input required className="input-line" value={full_name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Phone</label>
          <input className="input-line" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Email</label>
          <input type="email" required className="input-line" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Preferred Date</label>
          <input type="date" className="input-line" value={preferred_date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Project</label>
          <select className="input-line" value={project_slug} onChange={(e) => setProject(e.target.value)}>
            <option value="">Select a project</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="eyebrow mb-2 block">Type</label>
          <select className="input-line" value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="eyebrow mb-2 block">Message</label>
        <textarea
          rows={4}
          className="input-line resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a little about what you're looking for."
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-4">
        <button type="submit" disabled={status === "sending"} className="btn-gold disabled:opacity-60">
          {status === "sending" ? "Submitting" : "Request Appointment"}
        </button>
        {feedback && (
          <div className={`text-sm ${status === "ok" ? "text-gold" : "text-red-600"}`}>{feedback}</div>
        )}
      </div>
    </form>
  );
}
