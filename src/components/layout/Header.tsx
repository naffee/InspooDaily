"use client";

import { useState } from "react";
import Link from "next/link";
import SearchOverlay from "@/components/editorial/SearchOverlay";
import { useSearch } from "@/context/SearchContext";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSearchOpen, openSearch, closeSearch } = useSearch();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md shadow-editorial" suppressHydrationWarning>
        <div className="flex justify-between items-center w-full px-6 h-20" suppressHydrationWarning>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-on-surface hover:text-secondary transition-all duration-300 active:opacity-80"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          
          <Link href="/">
            <h1 className="text-2xl font-serif italic tracking-tighter text-on-surface mt-1">
              InspoDaily
            </h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden md:block font-serif font-normal italic text-primary hover:opacity-80 transition-opacity">Home</Link>
            <Link href="/categories" className="hidden md:block font-serif font-normal italic text-on-surface hover:text-secondary transition-colors">Categories</Link>
            <Link href="/about" className="hidden md:block font-serif font-normal italic text-on-surface hover:text-secondary transition-colors">About me</Link>
            <button 
              onClick={openSearch}
              className="text-on-surface hover:text-secondary transition-all duration-300 active:opacity-80"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-background/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[400px] bg-surface z-[70] shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-16">
            <h2 className="font-serif italic text-3xl text-on-surface">Menu</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-on-surface hover:text-secondary transition-all p-2 rounded-full hover:bg-surface-container"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-8 flex-1">
            <Link onClick={() => setIsSidebarOpen(false)} href="/" className="font-serif text-3xl group flex items-center justify-between border-b border-outline/5 pb-6">
              <span className="group-hover:italic transition-all">Home</span>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-all text-sm -translate-x-4 group-hover:translate-x-0">arrow_forward</span>
            </Link>
            <Link onClick={() => setIsSidebarOpen(false)} href="/categories" className="font-serif text-3xl group flex items-center justify-between border-b border-outline/5 pb-6">
              <span className="group-hover:italic transition-all">Categories</span>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-all text-sm -translate-x-4 group-hover:translate-x-0">arrow_forward</span>
            </Link>
            <Link onClick={() => setIsSidebarOpen(false)} href="/about" className="font-serif text-3xl group flex items-center justify-between border-b border-outline/5 pb-6">
              <span className="group-hover:italic transition-all">About me</span>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-all text-sm -translate-x-4 group-hover:translate-x-0">arrow_forward</span>
            </Link>
          </nav>

          <div className="mt-auto mb-16 pt-8">
            <p className="font-manrope text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em] mb-6">Social Ateliers</p>
            <div className="flex gap-6">
              <a href="#" className="font-serif text-xl italic hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="font-serif text-xl italic hover:text-primary transition-colors">Pinterest</a>
            </div>
          </div>
        </div>
      </div>
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
