import Link from "next/link";
import Image from "next/image";
import { Post, getLatestPosts } from "@/lib/wordpress";

interface RelatedStoriesProps {
  currentPostId: number;
}

export default async function RelatedStories({ currentPostId }: RelatedStoriesProps) {
  const posts = await getLatestPosts(3, currentPostId);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="bg-surface-container-low mt-32 py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-serif italic text-4xl text-on-surface">More from the Collection</h2>
          <Link 
            href="/categories" 
            className="font-serif italic text-primary border-b-2 border-tertiary/20 pb-1 hover:border-primary transition-all"
          >
            Browse All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: Post) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
            const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || "Trends";
            const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || "uncategorized";

            return (
              <Link key={post.id} href={`/categories/${categorySlug}/${post.slug}`} className="group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-surface-variant relative shadow-sm">
                  <Image
                    src={featuredImage}
                    alt={post.title.rendered}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="font-manrope text-[10px] font-bold tracking-[0.05rem] uppercase text-secondary mb-2 block">
                  {category}
                </span>
                <h3 
                  className="font-serif italic text-2xl text-on-surface group-hover:text-primary transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
