"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { useCart } from "@/components/CartProvider";
import {
  ShoppingCart,
  ArrowLeft,
  Minus,
  Plus,
  Package,
  Shield,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from("products")
        .select("*, category:categories(*)")
        .eq("id", params.id)
        .single();
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-surface rounded w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-surface rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-surface rounded w-3/4" />
              <div className="h-4 bg-surface rounded w-1/4" />
              <div className="h-12 bg-surface rounded w-1/3" />
              <div className="h-24 bg-surface rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-16 h-16 text-muted mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Product Not Found
        </h1>
        <p className="text-muted mb-6">
          The robot you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/products"
          className="text-accent hover:text-accent-hover font-medium inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/products"
        className="text-muted hover:text-accent text-sm font-medium inline-flex items-center gap-1 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-square flex items-center justify-center">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <span className="text-8xl block mb-4">🤖</span>
              <p className="text-muted text-sm">No image available</p>
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <Link
              href={`/products?category=${product.category.slug}`}
              className="text-accent text-sm font-medium uppercase tracking-wider hover:text-accent-hover transition-colors"
            >
              {product.category.name}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {product.name}
          </h1>
          <p className="text-accent text-3xl font-bold mb-6">
            $
            {product.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-muted leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 text-muted hover:text-foreground transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-3 text-foreground font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-3 text-muted hover:text-foreground transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-accent hover:bg-accent-hover text-background font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Added to Cart!
                </>
              ) : product.stock === 0 ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </>
              )}
            </button>
          </div>

          <div className="text-sm text-muted mb-8">
            {product.stock > 0 ? (
              <span className="text-success flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> In Stock ({product.stock}{" "}
                available)
              </span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </div>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-surface border border-border rounded-xl p-6 mb-8">
              <h3 className="text-foreground font-semibold mb-4">
                Specifications
              </h3>
              <dl className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <dt className="text-muted capitalize">
                      {key.replace(/_/g, " ")}
                    </dt>
                    <dd className="text-foreground font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Truck, text: "Free Shipping" },
              { icon: Shield, text: "2-Year Warranty" },
              { icon: Package, text: "Easy Returns" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Icon className="w-4 h-4 text-accent" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
