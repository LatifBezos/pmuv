"use client";

import { ArrowRight, File, Lock, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function EarningWaysSection() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-semibold">More ways to earn</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Membership Card */}
        <div className="bg-white p-6 rounded-xl">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-md">
              <Lock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">Membership</h3>
          <p className="text-gray-600 mb-8">
            Monthly membership for your biggest fans and supporters.
          </p>

          <Link
            href="/dashboard/memberships"
            className="flex items-center justify-between w-full px-6 py-3 rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
          >
            <span>Enable</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Shop Card */}
        <div className="bg-white p-6 rounded-xl">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-md">
              <ShoppingBag className="h-6 w-6 text-yellow-500" />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">Shop</h3>
          <p className="text-gray-600 mb-8">
            Introducing Shop, the creative way to sell.
          </p>

          <Link
            href="/dashboard/shop"
            className="flex items-center justify-between w-full px-6 py-3 rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
          >
            <span>Enable</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Exclusive Posts Card */}
        <div className="bg-white p-6 rounded-xl">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-md">
              <File className="h-6 w-6 text-yellow-500" />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">Exclusive posts</h3>
          <p className="text-gray-600 mb-8">
            Publish your best content exclusively for your supporters and
            members.
          </p>

          <Link
            href="/dashboard/posts/new"
            className="flex items-center justify-between w-full px-6 py-3 rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
          >
            <span>Write a post</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="flex gap-6 text-gray-500 mt-4">
        <Link href="/help" className="hover:underline">
          Help Center
        </Link>
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <Link href="/refer" className="hover:underline">
          Refer a Creator
        </Link>
      </div>
    </div>
  );
}
