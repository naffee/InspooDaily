const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_URL;

export async function wpFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 3600 }, // Default revalidation 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from WordPress: ${response.statusText}`);
  }

  return response.json();
}

export interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

export interface User {
  id: number;
  name: string;
  description: string;
  avatar_urls?: {
    [key: string]: string;
  };
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export async function getPosts(params: string = '') {
  return wpFetch(`/posts?_embed${params}`);
}

export async function getPostBySlug(slug: string) {
  const posts = await wpFetch(`/posts?slug=${slug}&_embed`);
  return posts[0] || null;
}

export async function getCategories() {
  return wpFetch('/categories');
}

export async function getLatestPosts(count: number = 3, excludeId?: number) {
  const excludeParam = excludeId ? `&exclude=${excludeId}` : '';
  return wpFetch(`/posts?per_page=${count}&_embed${excludeParam}`);
}

export async function getAuthor(id: number): Promise<User> {
  return wpFetch(`/users/${id}`);
}

export async function getPostsByAuthor(authorId: number, count: number = 10) {
  return wpFetch(`/posts?author=${authorId}&_embed&per_page=${count}`);
}

export async function getCategoryPosts(categoryId: number, count: number = 1) {
  return wpFetch(`/posts?categories=${categoryId}&_embed&per_page=${count}`);
}

export async function getCategoryBySlug(slug: string) {
  const categories = await wpFetch(`/categories?slug=${slug}`);
  return categories[0] || null;
}

export async function getPostsByCategory(categoryId: number, count: number = 10) {
  return wpFetch(`/posts?categories=${categoryId}&_embed&per_page=${count}`);
}

export async function searchPosts(query: string, count: number = 10) {
  if (!query) return [];
  // Use the search parameter to query title, content, and excerpts
  return wpFetch(`/posts?search=${encodeURIComponent(query)}&_embed&per_page=${count}`);
}
