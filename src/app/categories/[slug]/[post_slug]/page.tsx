import { getPostBySlug } from "@/lib/wordpress";
import PostHero from "@/components/editorial/PostHero";
import PostContent from "@/components/editorial/PostContent";
import RelatedStories from "@/components/editorial/RelatedStories";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string; post_slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { post_slug } = await params;
  const post = await getPostBySlug(post_slug);

  if (!post) {
    notFound();
  }

  // Calculate reading time
  const words = post.content.rendered.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen selection:bg-primary/20 pb-32">
      
      <PostHero post={post} />

      <article className="max-w-screen-xl mx-auto px-6 mt-16 md:mt-32">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Sticky Meta Sidebar */}
          <aside className="w-full md:w-48 flex-shrink-0 order-2 md:order-1 pt-4">
            <div className="sticky top-32 space-y-10">
              <div>
                <p className="font-manrope text-[10px] font-bold tracking-[0.05rem] uppercase text-outline mb-2">Published</p>
                <p className="font-manrope text-sm text-on-surface">{formattedDate}</p>
              </div>
              <div>
                <p className="font-manrope text-[10px] font-bold tracking-[0.05rem] uppercase text-outline mb-2">Reading Time</p>
                <p className="font-manrope text-sm text-on-surface">{readingTime} Minutes</p>
              </div>
              <div className="pt-4 border-t border-outline/10">
                <p className="font-manrope text-[10px] font-bold tracking-[0.05rem] uppercase text-outline mb-4">Share</p>
                <div className="flex gap-4">
                  <button className="text-on-surface hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">share</span>
                  </button>
                  <button className="text-on-surface hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">link</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Body Text */}
          <PostContent post={post} />
        </div>

        {/* Share Section Bottom */}
        <section className="mt-24 pt-16 border-t border-outline/10">
          <div className="bg-surface-container-low rounded-xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-serif italic text-2xl mb-2 text-on-surface">Share this Story</h4>
              <p className="font-manrope text-sm text-on-surface-variant">Stay inspired with the latest from the InspoDaily collective.</p>
            </div>
            <button className="bg-secondary text-on-secondary px-10 py-4 rounded-full font-manrope text-xs font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-lg">
              Subscribe to InspoDaily
            </button>
          </div>
        </section>
      </article>

      {/* Related Content */}
      <RelatedStories currentPostId={post.id} />

      
    </main>
  );
}
