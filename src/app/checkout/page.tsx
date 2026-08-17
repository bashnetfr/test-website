"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-muted mb-2">
          Thank you for your purchase. Your order confirmation has been sent to{" "}
          <span className="text-foreground">{form.email || "your email"}.</span>
        </p>
        <p className="text-muted mb-8">
          Order ID:{" "}
          <span className="text-accent font-mono">
            #RV-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </span>
        </p>
        <Link
          href="/products"
          className="bg-accent hover:bg-accent-hover text-background font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Your cart is empty
        </h1>
        <p className="text-muted mb-6">Add some robots before checking out.</p>
        <Link
          href="/products"
          className="bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Browse Robots
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-accent transition-colors";
  const labelClass = "block text-sm text-muted mb-1.5";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/cart"
        className="text-muted hover:text-accent text-sm font-medium inline-flex items-center gap-1 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>
      <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-foreground font-semibold text-lg mb-4">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
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
                  placeholder="john@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="123 Robot Lane"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="San Francisco"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  placeholder="CA"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>ZIP Code</label>
                <input
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  placeholder="94102"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  placeholder="United States"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-foreground font-semibold text-lg mb-4">
              Payment Details
            </h2>
            <p className="text-muted text-xs mb-4">
              This is a demo. No real payment will be processed.
            </p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Card Number</label>
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  required
                  placeholder="4242 4242 4242 4242"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Expiry</label>
                  <input
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    required
                    placeholder="MM/YY"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>CVV</label>
                  <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    required
                    placeholder="123"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
            <h2 className="text-foreground font-semibold text-lg mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted truncate mr-2">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-foreground whitespace-nowrap">
                    $
                    {(item.product.price * item.quantity).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-foreground">
                  $
                  {totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-foreground font-semibold">Total</span>
                <span className="text-accent font-bold text-xl">
                  $
                  {totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-background font-semibold py-3 rounded-lg transition-colors mt-6"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
