import { getPosts } from "@/lib/wordpress";
import Hero from "@/components/editorial/Hero";
import Trending from "@/components/editorial/Trending";
import StoryBlock from "@/components/editorial/StoryBlock";
import Newsletter from "@/components/editorial/Newsletter";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts("&per_page=12");
  
  const heroPost = posts[0];
  const trendingPosts = posts.slice(1, 6);
  const featureStories = posts.slice(6, 8);
  const bentoStories = posts.slice(8, 11);

  return (
    <main className="min-h-screen selection:bg-primary/20 pt-32" suppressHydrationWarning>
      
      {heroPost && <Hero post={heroPost} />}
      
      {trendingPosts.length > 0 && <Trending posts={trendingPosts} />}

      {/* Latest Stories Section */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <h3 className="font-serif text-4xl italic mb-16 text-center">Latest Stories</h3>
        
        <div className="space-y-24">
          {featureStories.map((post: any, index: number) => (
            <StoryBlock key={post.id} post={post} reversed={index % 2 !== 0} />
          ))}

          {/* Bento Grid Style for smaller articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {bentoStories.map((post: any) => {
              const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
              return (
                <Link key={post.id} href={`/categories/${post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized'}/${post.slug}`} className="group space-y-6">
                  <div className="aspect-square overflow-hidden rounded-xl bg-surface-container">
                    <Image 
                      src={featuredImage}
                      alt={post.title.rendered}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h5 
                    className="font-serif text-2xl italic group-hover:text-primary transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div 
                    className="font-manrope text-sm text-on-surface-variant line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <span className="flex items-center gap-2 font-serif italic text-sm text-primary">
                    Learn More
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Newsletter />

      <footer className="bg-surface-highest py-24 mb-20 md:mb-0">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/" className="font-serif text-3xl italic tracking-tighter text-on-surface">
            InspoDaily
          </Link>
          <p className="mt-8 font-manrope text-sm text-on-surface/40 uppercase tracking-[0.1em]">
            © 2026 InspoDaily Atelier. All Rights Reserved.
          </p>
        </div>
      </footer>

      
    </main>
  );
}
