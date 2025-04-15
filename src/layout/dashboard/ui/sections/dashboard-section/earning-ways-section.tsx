"use client";

import { ArrowRight, File, Lock, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function EarningWaysSection() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      <h2 className="text-xl sm:text-2xl font-semibold">More ways to earn</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Membership Card */}
        <div className="bg-white p-5 sm:p-6 rounded-xl">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-md">
              <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-2">Membership</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Monthly membership for your biggest fans and supporters.
          </p>

          <Link
            href="/dashboard/memberships"
            className="flex items-center justify-between w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50 transition text-sm sm:text-base"
          >
            <span>Enable</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>

        {/* Shop Card */}
        <div className="bg-white p-5 sm:p-6 rounded-xl">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-md">
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-2">Shop</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Introducing Shop, the creative way to sell.
          </p>

          <Link
            href="/dashboard/shop"
            className="flex items-center justify-between w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50 transition text-sm sm:text-base"
          >
            <span>Enable</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>

        {/* Exclusive Posts Card */}
        <div className="bg-white p-5 sm:p-6 rounded-xl">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-md">
              <File className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Exclusive posts
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Publish your best content exclusively for your supporters and
            members.
          </p>

          <Link
            href="/dashboard/posts/new"
            className="flex items-center justify-between w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50 transition text-sm sm:text-base"
          >
            <span>Write a post</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-500 mt-4 text-sm sm:text-base">
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
