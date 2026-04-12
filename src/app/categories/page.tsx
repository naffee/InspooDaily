"use client";

import Image from "next/image";
import Link from "next/link";
import { getCategories, getCategoryPosts, Category, Post } from "@/lib/wordpress";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const { openSearch } = useSearch();
  const [categoriesWithImagery, setCategoriesWithImagery] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const allCategories = await getCategories();
      const activeCategories = allCategories.filter((cat: any) => cat.count > 0 && cat.slug !== 'uncategorized');

      const dataWithImagery = await Promise.all(
        activeCategories.map(async (cat: any, i: number) => {
          const posts = await getCategoryPosts(cat.id, 1);
          const latestPost = posts[0];
          const image = latestPost?._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
          
          let layout = { colSpan: "md:col-span-4", rowSpan: "md:row-span-1", type: "square" };
          
          if (i === 0) {
            layout = { colSpan: "md:col-span-8", rowSpan: "md:row-span-2", type: "feature" };
          } else if (i === 1) {
            layout = { colSpan: "md:col-span-4", rowSpan: "md:row-span-2", type: "portrait" };
          } else if (i > 3) {
            layout = { colSpan: "md:col-span-12", rowSpan: "md:row-span-1", type: "wide" };
          }

          return { ...cat, image, ...layout };
        })
      );
      setCategoriesWithImagery(dataWithImagery);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen selection:bg-primary/20 pt-32 pb-32 px-6 max-w-7xl mx-auto">
      
      
      {/* Search Section */}
      <section className="mb-12">
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">search</span>
          </div>
          <input 
            className="w-full bg-surface-variant border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 py-4 pl-12 pr-4 font-manrope transition-all outline-none cursor-pointer" 
            placeholder="Search specific trends..." 
            type="text"
            readOnly
            onClick={openSearch}
          />
        </div>
      </section>

      {/* Page Header */}
      <header className="mb-12 text-center">
        <p className="font-manrope text-[10px] uppercase tracking-[0.2rem] text-secondary font-bold mb-3">The Digital Atelier</p>
        <h2 className="font-serif text-5xl md:text-7xl italic leading-tight text-on-surface">
          Category <span className="font-normal not-italic">&</span> Discover
        </h2>
      </header>

      {/* Category Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
        {categoriesWithImagery.map((cat, i) => (
          <Link 
            key={cat.id} 
            href={`/category/${cat.slug}`}
            className={`${cat.colSpan} ${cat.rowSpan} group relative overflow-hidden rounded-xl bg-surface-container-low cursor-pointer`}
          >
            <Image 
              src={cat.image} 
              alt={cat.name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {cat.type === "square" ? (
              <>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-surface/90 backdrop-blur-md px-8 py-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                    <h3 className="font-manrope text-xs uppercase tracking-[0.1rem] text-on-surface font-bold">{cat.name}</h3>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="font-manrope text-[10px] uppercase tracking-[0.15rem] text-primary-container font-bold block mb-2">{cat.count} Stories</span>
                  <h3 className={`font-serif text-on-surface italic ${cat.type === 'feature' ? 'text-4xl' : 'text-3xl'}`}>{cat.name}</h3>
                </div>
              </>
            )}
          </Link>
        ))}
      </div>

      {/* Secondary CTA Section */}
      <section className="mt-24 mb-12 p-12 rounded-xl bg-surface-container-low relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <h4 className="font-serif text-3xl italic text-on-surface mb-6">Curated just for you.</h4>
          <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-manrope text-xs font-bold tracking-widest hover:bg-primary-dim transition-all active:scale-95 uppercase">
            View Trend Report
          </button>
        </div>
      </section>

      
    </main>
  );
}
