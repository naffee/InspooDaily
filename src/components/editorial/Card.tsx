import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/wordpress";

interface CardProps {
  post: Post;
  priority?: boolean;
}

export default function Card({ post, priority = false }: CardProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
  const category = post._embedded?.['wp:term']?.[0]?.find(t => t.taxonomy === 'category')?.name || "Lifestyle";

  return (
    <article className="group overflow-hidden bg-surface-low transition-colors duration-500 hover:bg-surface-container">
      <Link href={`/categories/${post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized'}/${post.slug}`}>
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:rounded-xl">
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Category Chip (Silk Label style) */}
          <div className="absolute top-4 left-4">
             <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold tracking-[0.05rem] text-on-secondary-container uppercase">
                {category}
             </span>
          </div>
        </div>
        
        <div className="px-4 py-8 sm:px-6">
          <h3 
            className="font-serif text-2xl leading-snug text-on-surface transition-colors hover:text-primary sm:text-3xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div 
            className="mt-4 font-manrope text-sm leading-relaxed text-on-surface/70 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          
          <div className="mt-6 flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-widest text-on-surface/40 uppercase">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2 font-serif italic text-sm text-primary">
              Read More 
              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
