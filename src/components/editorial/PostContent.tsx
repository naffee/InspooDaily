import { Post } from "@/lib/wordpress";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <div 
      className="atelier-content flex-1 order-1 md:order-2 space-y-12 font-manrope text-lg md:text-xl leading-[1.8] text-on-surface-variant"
      dangerouslySetInnerHTML={{ __html: post.content.rendered }}
    />
  );
}
