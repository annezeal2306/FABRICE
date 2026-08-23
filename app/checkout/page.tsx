"use client";

import Link from "next/link";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { useState } from "react";

import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
    const clearCart = useCartStore(
  (state) => state.clearCart
);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [placed, setPlaced] = useState(false);

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping =
    subtotal >= 599 || subtotal === 0
      ? 0
      :49;

  const total = subtotal + shipping;

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handlePlaceOrder = (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  clearCart();
  setPlaced(true);
};

  /* =====================================
     ORDER SUCCESS
  ===================================== */

  if (placed) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-[#f5f3ee] px-5">

        <div className="w-full max-w-xl text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <Check
              size={28}
              strokeWidth={1.5}
            />
          </div>

          <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-black/40">
            FABRICE / ORDER CONFIRMED
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] sm:text-7xl">
            Thank You.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-black/50">
            Your order has been placed successfully.
            This is a prototype checkout, so no real
            payment has been processed.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/shop"
              className="border border-black px-7 py-4 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="bg-black px-7 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80"
            >
              Back Home
            </Link>

          </div>

        </div>

      </main>
    );
  }

  /* =====================================
     EMPTY CART
  ===================================== */

  if (items.length === 0) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#f5f3ee] px-5">

        <div className="text-center">

          <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
            FABRICE / CHECKOUT
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.07em]">
            Your Bag Is Empty
          </h1>

          <p className="mt-5 text-sm text-black/45">
            Add something to your bag before checking out.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 bg-black px-7 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white"
          >
            <ArrowLeft size={13} />
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee]">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="border-b border-black/10 px-5 py-7 sm:px-8 lg:px-12">

        <div className="mx-auto flex max-w-[1600px] items-center justify-between">

          <Link
            href="/cart"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-black/50 transition-colors hover:text-black"
          >
            <ArrowLeft size={13} />
            Back to Bag
          </Link>

          <div className="text-2xl font-black tracking-[-0.07em]">
            FABRICE
          </div>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-black/40">
            <Lock size={12} />
            Secure Checkout
          </div>

        </div>

      </section>

      {/* =====================================
          CHECKOUT
      ===================================== */}

      <section className="px-5 py-10 sm:px-8 lg:px-12 lg:py-16">

        <div className="mx-auto max-w-[1400px]">

          <div className="mb-10">

            <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
              FABRICE / CHECKOUT
            </p>

            <h1 className="mt-3 text-5xl font-black uppercase leading-[0.85] tracking-[-0.07em] sm:text-6xl lg:text-8xl">
              Checkout
            </h1>

          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">

            {/* =================================
                CUSTOMER DETAILS
            ================================= */}

            <form
              onSubmit={handlePlaceOrder}
              className="space-y-8"
            >

              {/* CONTACT */}

              <div className="border-t border-black/10 pt-6">

                <div className="mb-6 flex items-end justify-between">

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                      01
                    </p>

                    <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.05em]">
                      Contact
                    </h2>
                  </div>

                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) =>
                      updateField(
                        "name",
                        e.target.value
                      )
                    }
                    className="h-14 border border-black/15 bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-black/30 focus:border-black sm:col-span-2"
                  />

                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) =>
                      updateField(
                        "phone",
                        e.target.value
                      )
                    }
                    className="h-14 border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 focus:border-black"
                  />

                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                    className="h-14 border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 focus:border-black"
                  />

                </div>

              </div>

              {/* ADDRESS */}

              <div className="border-t border-black/10 pt-6">

                <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                  02
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.05em]">
                  Delivery Address
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <input
                    required
                    type="text"
                    placeholder="House / Flat / Street Address"
                    value={form.address}
                    onChange={(e) =>
                      updateField(
                        "address",
                        e.target.value
                      )
                    }
                    className="h-14 border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 focus:border-black sm:col-span-2"
                  />

                  <input
                    required
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) =>
                      updateField(
                        "city",
                        e.target.value
                      )
                    }
                    className="h-14 border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 focus:border-black"
                  />

                  <input
                    required
                    type="text"
                    placeholder="State"
                    value={form.state}
                    onChange={(e) =>
                      updateField(
                        "state",
                        e.target.value
                      )
                    }
                    className="h-14 border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 focus:border-black"
                  />

                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={(e) =>
                      updateField(
                        "pincode",
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    className="h-14 border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 focus:border-black"
                  />

                </div>

              </div>

              {/* PAYMENT */}

              <div className="border-t border-black/10 pt-6">

                <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                  03
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.05em]">
                  Payment
                </h2>

                <div className="mt-6 border border-black bg-white p-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-4 border-black">
                      <div className="h-full w-full rounded-full bg-black" />
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-[0.15em]">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        Pay when your order arrives.
                      </p>

                    </div>

                  </div>

                </div>

                <p className="mt-4 text-[9px] uppercase tracking-[0.12em] text-black/35">
                  Online payment will be available in
                  the full version.
                </p>

              </div>

              {/* MOBILE PLACE ORDER */}

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center bg-black text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80 lg:hidden"
              >
                Place Order · ₹
                {total.toLocaleString("en-IN")}
              </button>

            </form>

            {/* =================================
                ORDER SUMMARY
            ================================= */}

            <aside className="h-fit border border-black/10 bg-white lg:sticky lg:top-28">

              <div className="border-b border-black/10 p-6">

                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-black uppercase tracking-[-0.04em]">
                    Your Bag
                  </h2>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40">
                    {items.length} Items
                  </span>

                </div>

              </div>

              {/* ITEMS */}

              <div className="max-h-[420px] overflow-y-auto">

                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.size}-${index}`}
                    className="flex gap-4 border-b border-black/10 p-5"
                  >

                    <div className="h-28 w-20 shrink-0 overflow-hidden bg-[#e9e6df]">

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-[10px] font-bold uppercase leading-4">
                        {item.product.name}
                      </p>

                      <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-black/40">
                        Size: {item.size}
                      </p>

                      <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-black/40">
                        Qty: {item.quantity}
                      </p>

                      <p className="mt-4 text-sm font-bold">
                        ₹
                        {(
                          item.product.price *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* TOTALS */}

              <div className="p-6">

                <div className="space-y-4 text-sm">

                  <div className="flex justify-between">

                    <span className="text-black/45">
                      Subtotal
                    </span>

                    <span>
                      ₹
                      {subtotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-black/45">
                      Shipping
                    </span>

                    <span>
                      {shipping === 0
                        ? "FREE"
                        : `₹${shipping}`}
                    </span>

                  </div>

                </div>

                <div className="my-6 border-t border-black/10" />

                <div className="flex items-end justify-between">

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Total
                  </span>

                  <span className="text-2xl font-black">
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* DESKTOP PLACE ORDER */}

                <button
                  type="button"
                  onClick={() => {
                    const formElement =
                      document.querySelector(
                        "form"
                      ) as HTMLFormElement | null;

                    formElement?.requestSubmit();
                  }}
                  className="mt-7 hidden h-14 w-full items-center justify-center bg-black text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80 lg:flex"
                >
                  Place Order
                </button>

                <p className="mt-5 text-center text-[8px] uppercase leading-4 tracking-[0.12em] text-black/30">
                  By placing your order, you agree
                  to FABRICE&apos;s terms and conditions.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}