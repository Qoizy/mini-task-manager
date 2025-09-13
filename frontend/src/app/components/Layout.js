"use client";

import { useAuth } from "../utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowConfirm(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Task Manager
              </Link>
            </div>

            {user && (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-gray-900 font-semibold text-sm sm:text-base">
                  Hello, {user.name}
                </span>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-indigo-600 text-white p-2 sm:px-4 sm:py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center"
                  aria-label="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:hidden"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <ConfirmModal
        show={showConfirm}
        message="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default Layout;
