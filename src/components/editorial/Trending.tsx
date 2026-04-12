import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/wordpress";

interface TrendingProps {
  posts: Post[];
}

export default function Trending({ posts }: TrendingProps) {
  return (
    <section className="py-20 bg-surface-low">
      <div className="px-6 md:px-16 mb-12 flex justify-between items-end">
        <div>
          <h3 className="font-serif text-3xl italic text-on-surface">Trending Now</h3>
          <p className="font-manrope text-sm text-outline tracking-wider uppercase mt-2">The Season's Best</p>
        </div>
        <Link href="/categories" className="font-serif italic text-primary border-b-2 border-tertiary-fixed pb-1 hover:text-secondary transition-colors">
          View All
        </Link>
      </div>
      
      <div className="flex overflow-x-auto gap-8 px-6 md:px-16 hide-scrollbar pb-8">
        {posts.map((post, index) => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
          const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
          return (
            <Link key={post.id} href={`/categories/${categorySlug}/${post.slug}`} className="min-w-[280px] md:min-w-[340px] group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-xl mb-6 relative shadow-md">
                <Image
                  src={featuredImage}
                  alt={post.title.rendered}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>bookmark</span>
                </div>
              </div>
              <span className="font-manrope text-[10px] font-bold tracking-[0.1em] text-secondary uppercase">
                Look {String(index + 1).padStart(3, '0')}
              </span>
              <h4 
                className="font-serif text-xl mt-2 group-hover:text-primary transition-colors line-clamp-1"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
