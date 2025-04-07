"use client";

import { ChevronDown, Heart, LockIcon, Share, ShoppingBag } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function ProfileSection() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 bg-white rounded-xl">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-full bg-slate-400"></div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-semibold truncate">
              Hi, Ange Cédric Joël DUAKON
            </h1>
            <a
              href="https://pmuv.com/jocode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:underline text-sm"
            >
              pmuv.com/jocode
            </a>
          </div>
        </div>
        <Button
          variant="default"
          className="gap-2 rounded-full bg-zinc-900 hover:bg-zinc-800 w-full sm:w-auto"
        >
          <Share className="h-4 w-4 sm:h-5 sm:w-5" />
          Share page
        </Button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Earnings</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 rounded-full px-4 border-gray-200 text-sm sm:text-base w-full sm:w-auto"
              >
                Last 30 days
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 days</DropdownMenuItem>
              <DropdownMenuItem>All time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-5xl sm:text-6xl font-bold leading-none tracking-tight">
            $0
          </h3>

          <div className="flex flex-wrap gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="size-4 sm:size-5 rounded bg-yellow-100"></div>
              <span className="font-medium">$0</span>
              <span className="text-gray-500 text-sm sm:text-base">
                Supporters
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="size-4 sm:size-5 rounded bg-pink-100"></div>
              <span className="font-medium">$0</span>
              <span className="text-gray-500 text-sm sm:text-base">
                Membership
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="size-4 sm:size-5 rounded bg-cyan-100"></div>
              <span className="font-medium">$0</span>
              <span className="text-gray-500 text-sm sm:text-base">Shop</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
