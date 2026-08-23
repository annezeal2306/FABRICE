"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const categories = [
  "All",
  "T-Shirts",
  "Hoodies",
  "Shirts",
  "Bottomwear",
  "Outerwear",
  "Tops",
  "Dresses",
];

const genders = [
  "All",
  "Men",
  "Women",
  "Unisex",
];

const priceRanges = [
  "All",
  "Under ₹1,000",
  "₹1,000 – ₹1,500",
  "₹1,500 – ₹2,000",
  "₹2,000+",
];

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
];

export default function ShopPage() {
  const searchParams = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category");

  const initialCategory =
    categories.includes(
      categoryFromUrl ?? ""
    )
      ? categoryFromUrl!
      : "All";

  const [activeCategory, setActiveCategory] =
    useState(initialCategory);

  const [activeGender, setActiveGender] =
    useState("All");

  const [activePrice, setActivePrice] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Featured");

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // =====================================
    // CATEGORY
    // =====================================

    if (activeCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category === activeCategory
      );
    }

    // =====================================
    // GENDER
    // =====================================

    if (activeGender !== "All") {
      result = result.filter(
        (product) =>
          product.gender === activeGender
      );
    }

    // =====================================
    // PRICE
    // =====================================

    if (activePrice === "Under ₹1,000") {
      result = result.filter(
        (product) => product.price < 1000
      );
    }

    if (activePrice === "₹1,000 – ₹1,500") {
      result = result.filter(
        (product) =>
          product.price >= 1000 &&
          product.price <= 1500
      );
    }

    if (activePrice === "₹1,500 – ₹2,000") {
      result = result.filter(
        (product) =>
          product.price > 1500 &&
          product.price <= 2000
      );
    }

    if (activePrice === "₹2,000+") {
      result = result.filter(
        (product) => product.price > 2000
      );
    }

    // =====================================
    // SORT
    // =====================================

    if (sortBy === "Price: Low to High") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "Price: High to Low") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [
    activeCategory,
    activeGender,
    activePrice,
    sortBy,
  ]);

  // =====================================
  // FILTER COUNT
  // =====================================

  const activeFilterCount = [
    activeCategory !== "All",
    activeGender !== "All",
    activePrice !== "All",
  ].filter(Boolean).length;

  // =====================================
  // CLEAR FILTERS
  // =====================================

  const clearFilters = () => {
    setActiveCategory("All");
    setActiveGender("All");
    setActivePrice("All");
  };

  return (
    <main className="min-h-screen bg-[#f5f3ee]">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="border-b border-black/10 px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pb-14 lg:pt-24">

        <div className="mx-auto max-w-[1600px]">

          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-black/45">
            Fabrice / Shop
          </p>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.07em] sm:text-7xl lg:text-[9rem]">
                Shop
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-black/55">
                Everyday essentials, statement pieces
                and contemporary silhouettes made for
                your wardrobe.
              </p>

            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">
              {filteredProducts.length} Products
            </p>

          </div>

        </div>

      </section>

      {/* =====================================
          DESKTOP FILTER BAR
      ===================================== */}

      <section className="sticky top-0 z-20 hidden border-b border-black/10 bg-[#f5f3ee]/95 px-5 backdrop-blur-md lg:block sm:px-8 lg:px-12">

        <div className="mx-auto max-w-[1600px]">

          <div className="flex items-center justify-between gap-8 py-4">

            {/* CATEGORY */}

            <div className="flex min-w-0 gap-5 overflow-x-auto scrollbar-hide">

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`
                    shrink-0
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    transition-colors
                    ${
                      activeCategory === category
                        ? "font-bold text-black"
                        : "text-black/40 hover:text-black"
                    }
                  `}
                >
                  {category}
                </button>
              ))}

            </div>

            {/* RIGHT CONTROLS */}

            <div className="flex shrink-0 items-center gap-6">

              {/* GENDER */}

              <div className="flex items-center gap-3 border-l border-black/10 pl-6">

                <span className="text-[9px] uppercase tracking-[0.2em] text-black/40">
                  Gender
                </span>

                <select
                  value={activeGender}
                  onChange={(event) =>
                    setActiveGender(
                      event.target.value
                    )
                  }
                  className="bg-transparent text-[10px] uppercase tracking-[0.12em] outline-none"
                >
                  {genders.map((gender) => (
                    <option
                      key={gender}
                      value={gender}
                    >
                      {gender}
                    </option>
                  ))}
                </select>

              </div>

              {/* PRICE */}

              <div className="flex items-center gap-3 border-l border-black/10 pl-6">

                <span className="text-[9px] uppercase tracking-[0.2em] text-black/40">
                  Price
                </span>

                <select
                  value={activePrice}
                  onChange={(event) =>
                    setActivePrice(
                      event.target.value
                    )
                  }
                  className="bg-transparent text-[10px] uppercase tracking-[0.12em] outline-none"
                >
                  {priceRanges.map((price) => (
                    <option
                      key={price}
                      value={price}
                    >
                      {price}
                    </option>
                  ))}
                </select>

              </div>

              {/* SORT */}

              <div className="flex items-center gap-3 border-l border-black/10 pl-6">

                <span className="text-[9px] uppercase tracking-[0.2em] text-black/40">
                  Sort
                </span>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="bg-transparent text-[10px] uppercase tracking-[0.12em] outline-none"
                >
                  {sortOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>

              </div>

              {/* CLEAR */}

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[9px] font-bold uppercase tracking-[0.15em] underline underline-offset-4"
                >
                  Clear
                </button>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          MOBILE FILTER BAR
      ===================================== */}

      <section className="sticky top-0 z-20 border-b border-black/10 bg-[#f5f3ee]/95 px-5 backdrop-blur-md lg:hidden">

        <div className="flex items-center justify-between py-4">

          <button
            type="button"
            onClick={() =>
              setFiltersOpen(true)
            }
            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <SlidersHorizontal
              size={15}
              strokeWidth={1.3}
            />

            Filters

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[8px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
            className="bg-transparent text-[10px] uppercase tracking-[0.12em] outline-none"
          >
            {sortOptions.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>

        </div>

      </section>

      {/* =====================================
          PRODUCTS
      ===================================== */}

      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">

        <div className="mx-auto max-w-[1600px]">

          {filteredProducts.length > 0 ? (

            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}

            </div>

          ) : (

            <div className="flex min-h-[400px] items-center justify-center">

              <div className="text-center">

                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/40">
                  No products
                </p>

                <h2 className="text-3xl font-bold uppercase tracking-[-0.05em]">
                  Nothing here yet.
                </h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 border border-black px-6 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
                >
                  Clear Filters
                </button>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* =====================================
          MOBILE FILTER DRAWER
      ===================================== */}

      {filtersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setFiltersOpen(false)
            }
            className="absolute inset-0 bg-black/40"
          />

          {/* DRAWER */}

          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[#f5f3ee]">

            {/* DRAWER HEADER */}

            <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">

              <div>

                <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                  Filter
                </p>

                <h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.05em]">
                  Refine
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setFiltersOpen(false)
                }
                aria-label="Close filters"
              >
                <X
                  size={21}
                  strokeWidth={1.4}
                />
              </button>

            </div>

            <div className="px-5 py-6">

              {/* CATEGORY */}

              <div className="border-b border-black/10 pb-7">

                <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.25em]">
                  Category
                </p>

                <div className="grid grid-cols-2 gap-2">

                  {categories.map(
                    (category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          setActiveCategory(
                            category
                          )
                        }
                        className={`
                          border
                          px-4
                          py-3
                          text-left
                          text-[9px]
                          uppercase
                          tracking-[0.15em]
                          transition-colors
                          ${
                            activeCategory ===
                            category
                              ? "border-black bg-black text-white"
                              : "border-black/10 hover:border-black"
                          }
                        `}
                      >
                        {category}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* GENDER */}

              <div className="border-b border-black/10 py-7">

                <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.25em]">
                  Gender
                </p>

                <div className="flex flex-wrap gap-2">

                  {genders.map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() =>
                        setActiveGender(gender)
                      }
                      className={`
                        border
                        px-5
                        py-3
                        text-[9px]
                        uppercase
                        tracking-[0.15em]
                        ${
                          activeGender === gender
                            ? "border-black bg-black text-white"
                            : "border-black/10"
                        }
                      `}
                    >
                      {gender}
                    </button>
                  ))}

                </div>

              </div>

              {/* PRICE */}

              <div className="py-7">

                <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.25em]">
                  Price
                </p>

                <div className="flex flex-col gap-2">

                  {priceRanges.map(
                    (price) => (
                      <button
                        key={price}
                        type="button"
                        onClick={() =>
                          setActivePrice(price)
                        }
                        className={`
                          flex
                          items-center
                          justify-between
                          border-b
                          border-black/10
                          py-4
                          text-left
                          text-[10px]
                          uppercase
                          tracking-[0.15em]
                          ${
                            activePrice === price
                              ? "font-bold"
                              : "text-black/60"
                          }
                        `}
                      >
                        {price}

                        {activePrice === price && (
                          <span>✓</span>
                        )}

                      </button>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* DRAWER FOOTER */}

            <div className="sticky bottom-0 flex gap-3 border-t border-black/10 bg-[#f5f3ee] px-5 py-4">

              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 border border-black py-4 text-[9px] font-bold uppercase tracking-[0.2em]"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() =>
                  setFiltersOpen(false)
                }
                className="flex-1 bg-black py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white"
              >
                Show {filteredProducts.length} Products
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}