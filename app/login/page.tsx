"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-[calc(100vh-144px)] bg-[#f5f3ee] px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[520px]">

        {/* HEADER */}

        <div className="mb-12 text-center">
          <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-black/40">
            Welcome Back
          </p>

          <h1 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl">
            LOGIN
          </h1>

          <p className="mx-auto mt-5 max-w-[360px] text-sm leading-6 text-black/50">
            Sign in to your FABRICE account to continue
            shopping.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 border border-red-500/20 bg-red-50 px-4 py-3 text-center text-[10px] uppercase tracking-[0.12em] text-red-600">
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          {/* EMAIL */}

          <div>
            <label
              htmlFor="email"
              className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em]"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              required
              disabled={loading}
              className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-black/25 focus:border-black disabled:opacity-50"
            />
          </div>

          {/* PASSWORD */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[9px] font-bold uppercase tracking-[0.2em]"
              >
                Password
              </label>

              <button
                type="button"
                className="text-[9px] uppercase tracking-[0.15em] text-black/40 transition-opacity hover:opacity-100"
              >
                Forgot Password?
              </button>
            </div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
              disabled={loading}
              className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-black/25 focus:border-black disabled:opacity-50"
            />
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center bg-black text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        {/* DEMO ACCOUNT */}

        <div className="mt-8 border border-black/10 px-5 py-4">
          <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.2em] text-black/40">
            Test Account
          </p>

          <p className="text-xs text-black/60">
            demo@fabrice.com
          </p>

          <p className="mt-1 text-xs text-black/60">
            password123
          </p>
        </div>

        {/* SIGNUP */}

        <div className="mt-10 border-t border-black/10 pt-8 text-center">
          <p className="text-sm text-black/50">
            Don&apos;t have an account?
          </p>

          <Link
            href="/signup"
            className="mt-3 inline-block text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-4 transition-opacity hover:opacity-50"
          >
            Create Account
          </Link>
        </div>

      </div>
    </main>
  );
}