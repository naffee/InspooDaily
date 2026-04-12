import Image from "next/image";
import { Post } from "@/lib/wordpress";

interface PostHeroProps {
  post: Post;
}

export default function PostHero({ post }: PostHeroProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg";
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || "Uncategorized";

  return (
    <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
      <Image
        src={featuredImage}
        alt={post.title.rendered}
        fill
        priority
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 flex flex-col items-center text-center">
        <div className="mb-6">
          <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-manrope text-[10px] font-bold tracking-[0.05rem] uppercase">
            {category}
          </span>
        </div>
        <h1 
          className="text-5xl md:text-8xl font-serif italic leading-tight max-w-5xl text-on-surface -mb-4 md:-mb-8 z-10"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </div>
  );
}
