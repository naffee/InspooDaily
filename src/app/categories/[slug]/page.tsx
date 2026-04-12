import Image from "next/image";
import Link from "next/link";
import { getCategoryBySlug, getPostsByCategory, Post } from "@/lib/wordpress";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id, 20);

  return (
    <main className="min-h-screen selection:bg-primary/20 pt-32 pb-32 px-6 max-w-7xl mx-auto">
      
      
      {/* Category Header */}
      <header className="mb-20 text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-outline/20"></div>
          <p className="font-manrope text-[10px] uppercase tracking-[0.3rem] text-secondary font-bold">Category Archives</p>
          <div className="h-[1px] w-12 bg-outline/20"></div>
        </div>
        <h1 className="font-serif text-6xl md:text-8xl italic leading-tight text-on-surface mb-6">
          {category.name}
        </h1>
        {category.description && (
          <p className="font-serif text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto italic opacity-80">
            {category.description}
          </p>
        )}
      </header>

      {/* Bento Grid Feed */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px]">
        {posts.map((post: Post, i: number) => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
          
          // Logic for grid sizing to keep things editorial
          const isMain = i === 0;
          const isPortrait = i === 1 || i === 4;
          
          let colSpan = "md:col-span-4";
          let rowSpan = "md:row-span-1";
          
          if (isMain) {
            colSpan = "md:col-span-8";
            rowSpan = "md:row-span-2";
          } else if (isPortrait) {
            rowSpan = "md:row-span-2";
          }

          return (
            <Link 
              key={post.id} 
              href={`/categories/${category.slug}/${post.slug}`}
              className={`${colSpan} ${rowSpan} group relative overflow-hidden rounded-xl bg-surface-container-low cursor-pointer shadow-sm`}
            >
              <Image 
                src={featuredImage} 
                alt={post.title.rendered}
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 
                  className={`font-serif text-on-surface italic leading-tight group-hover:text-primary transition-colors ${isMain ? 'text-4xl' : 'text-2xl'}`}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-500">
                  <span className="font-manrope text-[10px] uppercase tracking-widest font-bold text-on-surface shadow-sm">Read Article</span>
                  <div className="h-[1px] flex-1 bg-outline/20"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="py-32 text-center">
          <p className="font-serif italic text-2xl text-on-surface-variant">No stories found in this collection yet.</p>
          <Link href="/categories" className="inline-block mt-8 text-primary border-b border-primary font-manrope font-bold text-sm tracking-widest uppercase">
            Browse other categories
          </Link>
        </div>
      )}

      
    </main>
  );
}
