"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Product, Category } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, Search } from "lucide-react";

type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 - $2,000", min: 500, max: 2000 },
  { label: "$2,000 - $10,000", min: 2000, max: 10000 },
  { label: "Over $10,000", min: 10000, max: Infinity },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: cats } = await supabase.from("categories").select("*");
      if (cats) setCategories(cats);

      const { data: prods } = await supabase
        .from("products")
        .select("*, category:categories(*)")
        .order("created_at", { ascending: false });
      if (prods) setProducts(prods);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => {
        const cat = p.category;
        return cat && cat.slug === selectedCategory;
      });
    }

    const range = PRICE_RANGES[priceRange];
    if (range) {
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return result;
  }, [products, search, selectedCategory, sortBy, priceRange]);

  const activeFilterCount =
    (selectedCategory ? 1 : 0) + (priceRange !== 0 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Robots</h1>
        <p className="text-muted">
          Browse our complete collection of premium robots
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block lg:w-64 shrink-0`}
        >
          <div className="bg-surface border border-border rounded-xl p-5 sticky top-24 space-y-6">
            <div className="flex items-center justify-between lg:block">
              <h3 className="text-foreground font-semibold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setPriceRange(0);
                  }}
                  className="text-accent text-sm lg:mt-2"
                >
                  Clear all ({activeFilterCount})
                </button>
              )}
            </div>

            <div>
              <h4 className="text-foreground text-sm font-medium mb-3">
                Category
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:text-foreground hover:bg-card"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.slug
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:text-foreground hover:bg-card"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-foreground text-sm font-medium mb-3">
                Price Range
              </h4>
              <div className="space-y-2">
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange(i)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      priceRange === i
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:text-foreground hover:bg-card"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search robots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-accent text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-card" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-card rounded w-3/4" />
                    <div className="h-3 bg-card rounded w-1/2" />
                    <div className="h-4 bg-card rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-xl p-12 text-center">
              <Search className="w-12 h-12 text-muted mx-auto mb-4" />
              <h3 className="text-foreground font-semibold text-lg mb-2">
                No robots found
              </h3>
              <p className="text-muted text-sm">
                Try adjusting your filters or search query.
              </p>
            </div>
          )}

          {!loading && (
            <p className="text-muted text-sm mt-6 text-center">
              Showing {filteredProducts.length} of {products.length} robots
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-surface rounded w-48 mb-2 animate-pulse" />
            <div className="h-4 bg-surface rounded w-64 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-card" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-card rounded w-3/4" />
                  <div className="h-3 bg-card rounded w-1/2" />
                  <div className="h-4 bg-card rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
