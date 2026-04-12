import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/wordpress";

interface StoryBlockProps {
  post: Post;
  reversed?: boolean;
}

export default function StoryBlock({ post, reversed = false }: StoryBlockProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
  const category = post._embedded?.['wp:term']?.[0]?.find(t => t.taxonomy === 'category')?.name || "Fashion";

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16 items-center ${reversed ? 'md:flex-row-reverse' : ''}`}>
      <div className={`md:col-span-7 ${reversed ? 'md:order-2' : ''}`}>
        <div className="aspect-[16/10] bg-surface-container rounded-xl overflow-hidden editorial-shadow transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            width={800}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className={`md:col-span-5 z-10 ${reversed ? 'md:order-1 md:-mr-24' : 'md:-ml-24'}`}>
        <div className="bg-surface/90 backdrop-blur-xl p-8 md:p-12 rounded-xl editorial-shadow">
          <span className="bg-secondary-container text-on-secondary-container font-manrope text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">
            {category}
          </span>
          <h4 
            className="font-serif text-3xl md:text-4xl italic mb-6 leading-tight text-on-surface"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div 
            className="font-manrope text-on-surface-variant mb-8 leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          <Link href={`/categories/${post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized'}/${post.slug}`} className="font-serif italic text-primary group flex items-center gap-2 hover:text-secondary transition-colors">
            Read More 
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
