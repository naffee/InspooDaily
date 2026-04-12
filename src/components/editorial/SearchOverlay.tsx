"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { searchPosts, Post } from "@/lib/wordpress";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Debounced Search Logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsLoading(true);
        try {
          const data = await searchPosts(query);
          setResults(data);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-2xl flex flex-col p-6 md:p-12 animate-in fade-in duration-500">
      {/* Search Header */}
      <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto w-full">
        <h2 className="font-serif italic text-2xl text-on-surface">The Atelier Search</h2>
        <button 
          onClick={onClose}
          className="p-3 bg-surface-variant/50 rounded-full hover:bg-surface-variant transition-colors group"
        >
          <span className="material-symbols-outlined text-on-surface group-hover:rotate-90 transition-transform">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-w-7xl mx-auto w-full custom-scrollbar">
        {/* Input Area */}
        <div className="relative mb-16">
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, trends, or culture..."
            className="w-full bg-transparent border-b-2 border-outline/10 focus:border-primary py-8 md:py-12 px-2 font-serif italic text-4xl md:text-7xl transition-all outline-none placeholder:text-outline/40 placeholder:not-italic"
          />
          {isLoading && (
            <div className="absolute right-4 bottom-8">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Results Area */}
        <div className="pb-32">
          {query.trim().length > 2 ? (
            <>
              <p className="font-manrope text-[10px] uppercase tracking-[0.3em] text-outline font-bold mb-8">
                {results.length > 0 ? `Found ${results.length} Matches` : isLoading ? "Searching the archives..." : "No stories found"}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {results.map((post) => {
                  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
                  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || "Trends";
                  const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || "uncategorized";

                  return (
                    <Link 
                      key={post.id} 
                      href={`/categories/${categorySlug}/${post.slug}`}
                      onClick={onClose}
                      className="group flex gap-6 items-center border-b border-outline/5 pb-8 hover:bg-surface-container/20 rounded-xl p-4 transition-colors"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative overflow-hidden rounded-lg shadow-sm">
                        <Image 
                          src={featuredImage}
                          alt={post.title.rendered}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-manrope text-[10px] uppercase font-bold tracking-widest text-secondary block mb-2">{category}</span>
                        <h3 
                          className="font-serif italic text-xl md:text-2xl text-on-surface group-hover:text-primary transition-colors leading-tight line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="font-manrope text-[10px] uppercase tracking-widest font-bold">Read Feature</span>
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-manrope text-[10px] uppercase tracking-[0.3em] text-outline font-bold mb-6">Suggested Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {['Fashion', 'Skincare', 'Makeup', 'Travel', 'Lifestyle'].map(tag => (
                    <Link 
                      key={tag}
                      href={`/categories/${tag.toLowerCase()}`}
                      onClick={onClose}
                      className="px-6 py-3 border border-outline/10 rounded-full font-serif italic hover:bg-primary hover:text-on-primary hover:border-primary transition-all text-lg"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-manrope text-[10px] uppercase tracking-[0.3em] text-outline font-bold mb-6">Trending Searches</h4>
                <div className="space-y-4">
                  <p className="font-serif text-2xl italic text-on-surface opacity-40">Luxury Skincare Routine</p>
                  <p className="font-serif text-2xl italic text-on-surface opacity-40">Paris Fashion Week 2026</p>
                  <p className="font-serif text-2xl italic text-on-surface opacity-40">Meditation & Mindful Travel</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
