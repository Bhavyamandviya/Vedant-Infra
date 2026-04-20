"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const body = await res.json();
      if (!res.ok || !body.ok) throw new Error(body.error || "Failed");
      setStatus("ok");
      setMessage("You're on the list.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage((err as Error).message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-gold outline-none transition-colors"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold whitespace-nowrap disabled:opacity-60"
      >
        {status === "sending" ? "Submitting" : "Subscribe"}
      </button>
      {message && (
        <div className={`text-xs mt-1 sm:mt-0 sm:ml-3 self-center ${status === "ok" ? "text-gold" : "text-red-300"}`}>
          {message}
        </div>
      )}
    </form>
  );
}
