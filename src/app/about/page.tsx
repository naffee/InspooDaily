"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { FollowPopup, ContactPopup } from "@/components/editorial/AuthorPopups";
import { getAuthor, getPostsByAuthor, User, Post } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";

export default function AboutMePage() {
  const AUTHOR_ID = 1; // Primary author for "About me"
  
  const [author, setAuthor] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isFollowOpen, setIsFollowOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const authorData = await getAuthor(AUTHOR_ID);
        const authorPosts = await getPostsByAuthor(AUTHOR_ID, 12);
        setAuthor(authorData);
        setPosts(authorPosts);
      } catch (error) {
        console.error("Failed to load author data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center" suppressHydrationWarning>
        <div className="animate-pulse font-serif italic text-2xl text-primary" suppressHydrationWarning>Loading Atelier...</div>
      </main>
    );
  }

  if (!author) return <div>Atelier currently unavailable.</div>;

  const placeholderAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuCNKMxJxVQRchZHJ_hXXttAPXlSCOahjaRhqB_Yiqi82nvTT8-sq2EhkUDKsG9IQU567MSwUjmuUXc-r9CC1RJWM6dM2vVljT5QqMzElqtxUDZNW0fcq2tkIeB0MBG43quVD3w8UslEaonBK7Waw2_ctiTplCRAPJlA1pgFXihbsRrBMRKBhEcSJTpmiTo8s9Du2svGudXeXeZ8TAqEoKYo0HvUY_CFDNj1mQNHT3PyGnJO07I491sCxK8HHYDDZsHZx-Cim5KLJbk";

  return (
    <main className="min-h-screen selection:bg-primary/20 pb-32" suppressHydrationWarning>
      
      {/* Editorial Identity Header */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto pt-40 md:pt-48">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Circular Portrait */}
          <div className="relative group flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-surface-container-low shadow-xl">
              <Image 
                src={author.avatar_urls?.['96'] || placeholderAvatar} 
                alt={author.name}
                width={256}
                height={256}
                className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-3 rounded-full shadow-lg">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          
          {/* Narrative & Bio */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <span className="font-manrope text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">
                The Creative Director
              </span>
              <h1 className="font-serif text-5xl md:text-8xl mt-2 text-on-surface leading-tight">
                {author.name}
              </h1>
            </div>
            <p className="font-serif italic text-xl md:text-2xl text-on-surface-variant leading-relaxed max-w-3xl">
              {author.description || "Synthesizing sustainable luxury with botanical aesthetics to redefine modern elegance."}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4 font-manrope">
              <button 
                onClick={() => setIsFollowOpen(true)}
                className="px-12 py-5 bg-primary text-on-primary rounded-full font-bold shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-[10px]"
              >
                Join the Atelier
              </button>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-12 py-5 border border-outline/10 text-on-surface rounded-full font-bold hover:bg-surface-container-low transition-all uppercase tracking-widest text-[10px]"
              >
                Direct Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Stats Grid */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: posts.length, label: "Narratives Authored" },
            { value: "48k", label: "Monthly Readers" },
            { value: "12", label: "Editorial Awards" },
            { value: "Paris", label: "Studio Location" }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-4xl font-serif italic text-on-surface mb-2">{stat.value}</div>
              <div className="font-manrope text-[10px] uppercase tracking-widest text-on-surface/40 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Bento Grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-serif text-4xl italic text-on-surface">Curated Stories</h2>
          <div className="h-[2px] bg-outline/5 flex-1 mx-12 mb-4 hidden md:block"></div>
          <Link href="/categories" className="font-serif italic text-primary border-b-2 border-primary/20 hover:border-primary transition-all pb-1">View Collection</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 auto-rows-[350px]">
          {posts.map((post, i) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
            const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || "Lifestyle";
            
            // Replicate the high-end bento structure
            const isLarge = i === 0;
            const isPortrait = i === 1 || i === 4;
            
            let colSpan = "md:col-span-4";
            let rowSpan = "md:row-span-1";
            
            if (isLarge) {
              colSpan = "md:col-span-8";
              rowSpan = "md:row-span-2";
            } else if (isPortrait) {
              rowSpan = "md:row-span-2";
            }
            
            return (
              <Link 
                key={post.id} 
                href={`/categories/${post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized'}/${post.slug}`} 
                className={`${colSpan} ${rowSpan} group relative overflow-hidden rounded-xl bg-surface-container shadow-sm`}
              >
                <Image 
                  src={featuredImage} 
                  alt={post.title.rendered}
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 p-10 w-full">
                  <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-manrope text-[10px] font-bold tracking-widest uppercase">{category}</span>
                  <h3 
                    className={`font-serif text-on-surface mt-6 italic leading-tight group-hover:text-primary transition-colors ${isLarge ? 'text-4xl md:text-5xl' : 'text-2xl'}`} 
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popups */}
      <Modal 
        isOpen={isFollowOpen} 
        onClose={() => setIsFollowOpen(false)} 
        title="Editorial Subscription"
      >
        <FollowPopup authorName={author.name} />
      </Modal>

      <Modal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        title="Direct Correspondence"
      >
        <ContactPopup authorName={author.name} />
      </Modal>

      
    </main>
  );
}
