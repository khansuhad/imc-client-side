"use client";
import React, { useState } from "react";
import { Menu, X, Home, Settings, User, LogOut, List } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import AdminNavItem from "./(DashboardComponents)/AdminNavItems/AdminNavItem";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession()
  const userRole = session?.data?.user?.role ;
  console.log(userRole);
  // Close sidebar when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex h-screen  relative  ">
      {/* Overlay */}
      {isOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0  slider-background lg:text-white slider-background text-black  w-64 p-5 transition-all h-screen z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } lg:relative lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-5 ">
          <Link href="/" className="text-xl font-bold">Dashboard</Link>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <AdminNavItem/>
      </div>

      {/* Main Content */}
      <div className="flex-1  overflow-auto">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden  text-black p-2 rounded-md m-4"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
