"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-accent transition-colors";
  const labelClass = "block text-sm text-muted mb-1.5";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get in Touch
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          Have a question about our robots, need help with an order, or want to
          partner with us? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          {[
            {
              icon: Mail,
              title: "Email Us",
              detail: "support@robovault.com",
              sub: "We respond within 24 hours",
            },
            {
              icon: Phone,
              title: "Call Us",
              detail: "+1 (555) 123-4567",
              sub: "Mon-Fri, 9am-6pm EST",
            },
            {
              icon: MapPin,
              title: "Visit Us",
              detail: "123 Innovation Drive",
              sub: "San Francisco, CA 94102",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-surface border border-border rounded-xl p-5 flex gap-4"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">
                  {item.title}
                </h3>
                <p className="text-foreground text-sm">{item.detail}</p>
                <p className="text-muted text-xs mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Message Sent!
                </h2>
                <p className="text-muted">
                  Thanks for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Send Us a Message
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales Question</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            {
              q: "Do you offer bulk/enterprise pricing?",
              a: "Yes! Contact our sales team for custom pricing on orders of 5+ robots.",
            },
            {
              q: "What warranty do your robots come with?",
              a: "All robots come with a standard 2-year manufacturer warranty, extendable to 5 years.",
            },
            {
              q: "Can I return a robot if I'm not satisfied?",
              a: "Absolutely. We offer a 30-day no-questions-asked return policy on all products.",
            },
            {
              q: "Do you ship internationally?",
              a: "Yes, we ship to over 50 countries. Shipping costs vary by location.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <h3 className="text-foreground font-semibold text-sm mb-1">
                {item.q}
              </h3>
              <p className="text-muted text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
