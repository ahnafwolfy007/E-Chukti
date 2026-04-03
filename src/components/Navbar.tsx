"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image src="/logo.png" alt="eChukti Logo" width={40} height={40} />
              <span className="font-bold text-xl text-gray-900 tracking-tight">eChukti</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>

            {status === "authenticated" ? (
              <>
                <Link href="/profile" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Log In
                </Link>
                <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {status === "authenticated" ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
