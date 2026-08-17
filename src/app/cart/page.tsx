"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-muted mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-muted mb-6">
          Looks like you haven&apos;t added any robots yet.
        </p>
        <Link
          href="/products"
          className="bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          Browse Robots <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-surface border border-border rounded-xl p-4 sm:p-6 flex gap-4"
            >
              <Link
                href={`/products/${item.product.id}`}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-card rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
              >
                {item.product.image_url ? (
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">🤖</span>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.product.id}`}
                  className="text-foreground font-semibold hover:text-accent transition-colors line-clamp-1"
                >
                  {item.product.name}
                </Link>
                {item.product.category && (
                  <p className="text-muted text-xs mt-0.5">
                    {item.product.category.name}
                  </p>
                )}
                <p className="text-accent font-bold mt-1">
                  $
                  {item.product.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-muted hover:text-danger transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="px-3 py-1.5 text-muted hover:text-foreground transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 py-1.5 text-foreground text-sm font-medium min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        Math.min(item.product.stock, item.quantity + 1)
                      )
                    }
                    className="px-3 py-1.5 text-muted hover:text-foreground transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
            <h2 className="text-foreground font-semibold text-lg mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal ({totalItems} items)</span>
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
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-foreground font-semibold">Total</span>
                <span className="text-accent font-bold text-xl">
                  $
                  {totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-accent hover:bg-accent-hover text-background font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="w-full text-muted hover:text-accent text-sm font-medium py-3 transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
