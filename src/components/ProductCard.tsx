"use client";

import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden group hover:border-accent/50 transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-card overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-4xl">🤖</span>
              </div>
            </div>
          )}
          {product.featured && (
            <span className="absolute top-3 left-3 bg-accent text-background text-xs font-bold px-2 py-1 rounded-md">
              Featured
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-3 right-3 bg-danger text-white text-xs font-bold px-2 py-1 rounded-md">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-foreground font-semibold text-lg mb-1 group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        {product.category && (
          <p className="text-muted text-xs mb-2 uppercase tracking-wider">
            {product.category.name}
          </p>
        )}
        <p className="text-muted text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-accent font-bold text-xl">
            ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="p-2 bg-card hover:bg-border rounded-lg transition-colors text-muted hover:text-foreground"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
              className="p-2 bg-accent hover:bg-accent-hover text-background rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
