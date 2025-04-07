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
      <div className="flex items-center justify-between p-6 bg-white rounded-xl">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-400"></div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              Hi, Ange Cédric Joël DUAKON
            </h1>
            <a
              href="https://pmuv.com/jocode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:underline"
            >
              pmuv.com/jocode
            </a>
          </div>
        </div>
        <Button
          variant="default"
          className="gap-2 rounded-full bg-zinc-900 hover:bg-zinc-800"
        >
          <Share className="h-5 w-5" />
          Share page
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Earnings</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 rounded-full px-4 border-gray-200"
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

        <div className="space-y-6">
          <h3 className="text-6xl font-bold leading-none tracking-tight">$0</h3>

          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded bg-yellow-100"></div>
              <span className="font-medium">$0</span>
              <span className="text-gray-500">Supporters</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="size-5 rounded bg-pink-100"></div>
              <span className="font-medium">$0</span>
              <span className="text-gray-500">Membership</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="size-5 rounded bg-cyan-100"></div>
              <span className="font-medium">$0</span>
              <span className="text-gray-500">Shop</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
