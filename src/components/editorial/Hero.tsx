import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/wordpress";

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";

  return (
    <section className="relative w-full min-h-[751px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={featuredImage}
          alt={post.title.rendered}
          fill
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/20 to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-6 md:px-16 max-w-4xl">
        <span className="font-manrope text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4 block">
          Editorial Pick
        </span>
        <h2 
          className="font-serif text-5xl md:text-8xl text-on-surface leading-[0.9] italic mb-8 -ml-1"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div 
          className="font-manrope text-lg md:text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <Link href={`/categories/${post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized'}/${post.slug}`}>
          <button className="bg-primary text-on-primary font-manrope font-bold py-4 px-10 rounded-full hover:opacity-90 transition-all editorial-shadow uppercase tracking-[0.1em] text-sm">
            Read the Feature
          </button>
        </Link>
      </div>
    </section>
  );
}
