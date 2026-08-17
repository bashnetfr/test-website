"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product, Category } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import {
  Bot,
  Shield,
  Zap,
  Wrench,
  ChevronRight,
  ArrowRight,
  Truck,
  Headphones,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Certified Quality",
    description: "Every robot is tested and certified for reliability and safety.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Tech",
    description: "Powered by the latest AI and robotics innovations.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over $5,000. Worldwide delivery.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert support team always ready to help you.",
  },
  {
    icon: Wrench,
    title: "Easy Maintenance",
    description: "Comprehensive warranty and maintenance plans available.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Not satisfied? Return within 30 days for a full refund.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechFlow Inc.",
    content:
      "RoboVault transformed our manufacturing line. The industrial robots we purchased increased our output by 300%.",
    avatar: "SC",
  },
  {
    name: "Marcus Webb",
    role: "Robotics Educator",
    content:
      "The educational robots are perfect for my students. Great quality at an unbeatable price point.",
    avatar: "MW",
  },
  {
    name: "Dr. Aiko Tanaka",
    role: "Research Director",
    content:
      "We sourced our entire humanoid research fleet from RoboVault. Exceptional quality and support.",
    avatar: "AT",
  },
];

export default function HomePage() {
  const [featuredRobots, setFeaturedRobots] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: products } = await supabase()
        .from("products")
        .select("*, category:categories(*)")
        .eq("featured", true)
        .limit(4);
      if (products) setFeaturedRobots(products);

      const { data: cats } = await supabase().from("categories").select("*");
      if (cats) setCategories(cats);
    }
    fetchData();
  }, []);

  const categoryIcons: Record<string, string> = {
    humanoid: "🧑‍🦾",
    industrial: "⚙️",
    toy: "🎮",
    service: "🛎️",
    drone: "🛩️",
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              The Future of Robotics is Here
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Discover Premium{" "}
              <span className="text-accent">Robots</span> for Every Need
            </h1>
            <p className="text-muted text-lg md:text-xl mb-8 leading-relaxed">
              From industrial automation to personal companions, RoboVault is your
              trusted marketplace for the world&apos;s finest robots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-accent hover:bg-accent-hover text-background font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                Browse Robots
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="border border-border hover:border-accent text-foreground font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface border border-border rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <feature.icon className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-foreground font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Shop by Category
            </h2>
            <p className="text-muted mt-1">
              Find the perfect robot for your needs
            </p>
          </div>
          <Link
            href="/products"
            className="text-accent hover:text-accent-hover text-sm font-medium flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="bg-surface border border-border rounded-xl p-6 text-center hover:border-accent/50 transition-all group"
            >
              <span className="text-3xl block mb-3">
                {categoryIcons[cat.slug] || "🤖"}
              </span>
              <h3 className="text-foreground font-medium text-sm group-hover:text-accent transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Featured Robots
            </h2>
            <p className="text-muted mt-1">
              Handpicked premium robots, ready to ship
            </p>
          </div>
          <Link
            href="/products"
            className="text-accent hover:text-accent-hover text-sm font-medium flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {featuredRobots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRobots.map((robot) => (
              <ProductCard key={robot.id} product={robot} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-xl p-12 text-center">
            <Bot className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted text-lg">
              Featured robots coming soon. Add products to your Supabase database to
              see them here.
            </p>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <p className="text-muted text-sm leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Find Your Perfect Robot?
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have transformed their
            operations with RoboVault robots.
          </p>
          <Link
            href="/products"
            className="bg-accent hover:bg-accent-hover text-background font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
