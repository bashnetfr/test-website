"use client";

import Link from "next/link";
import { Bot, Globe, MessageCircle, Share2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Bot className="w-7 h-7 text-accent" />
              <span className="text-lg font-bold">
                Robo<span className="text-accent">Vault</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Your trusted marketplace for premium robots. From industrial automation to personal companions, we bring the future to your doorstep.
            </p>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/products?category=humanoid", label: "Humanoid Robots" },
                { href: "/products?category=industrial", label: "Industrial Robots" },
                { href: "/products?category=toy", label: "Toy & Educational" },
                { href: "/products?category=service", label: "Service Robots" },
                { href: "/products?category=drone", label: "Drone Robots" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/about#careers", label: "Careers" },
                { href: "/about#press", label: "Press" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              Stay Connected
            </h3>
            <p className="text-muted text-sm mb-4">
              Subscribe for the latest robots and exclusive deals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted focus:outline-none focus:border-accent transition-colors flex-1"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-background font-medium px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <div className="flex gap-3 mt-4">
              {[Globe, MessageCircle, Share2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-muted hover:text-accent transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} RoboVault. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
