"use client";

import { useEffect } from "react";

const SuccessModal = ({ show, message, redirect, router }) => {
  useEffect(() => {
    if (show && redirect) {
      const timer = setTimeout(() => {
        router.push(redirect);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, redirect, router]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900">Success 🎉</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <p className="mt-4 text-sm text-gray-400">Redirecting...</p>
      </div>
    </div>
  );
};

export default SuccessModal;
