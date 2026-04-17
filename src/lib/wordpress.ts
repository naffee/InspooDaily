
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
  taxonomy: string;
}

const MOCK_AUTHORS: User[] = [
  {
    id: 1,
    name: "Elena Vance",
    description: "Lead Editor at InspoDaily with a passion for sustainable fashion and minimalist lifestyle.",
    slug: "elena-vance",
    avatar_urls: { "96": "https://lh3.googleusercontent.com/a/ACg8ocL-f_XoX_K_O_V_G_H_I_J_K_L?s=96" }
  }
];

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Fashion", slug: "fashion", description: "The latest trends and editorial selects.", count: 12, taxonomy: "category" },
  { id: 2, name: "Skincare", slug: "skincare", description: "Rituals and products for radiant health.", count: 8, taxonomy: "category" },
  { id: 3, name: "Makeup", slug: "makeup", description: "Artistry and beauty tips.", count: 15, taxonomy: "category" },
  { id: 4, name: "Lifestyle", slug: "lifestyle", description: "Design, wellness, and mindful living.", count: 20, taxonomy: "category" },
  { id: 5, name: "Travel", slug: "travel", description: "Dispatches from the world's most beautiful places.", count: 6, taxonomy: "category" },
];

const MOCK_POSTS: Post[] = [
  {
    id: 101,
    title: { rendered: "The Art of Italian Minimalism" },
    excerpt: { rendered: "Explore how Milan's design houses are redefining contemporary elegance through restraint and high-quality materials." },
    content: { rendered: "<p>Minimalism isn't just a style; it's a philosophy. In the heart of Milan, a new movement is emerging that prioritizes craftsmanship over excess...</p>" },
    date: "2024-03-20T10:00:00",
    slug: "italian-minimalism",
    featured_media: 1,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200", alt_text: "Fashion editorial" }],
      'wp:term': [[MOCK_CATEGORIES[0]]]
    }
  },
  {
    id: 102,
    title: { rendered: "Radiant Morning: A Ritual for Glowing Skin" },
    excerpt: { rendered: "The secret to a perfect complexion starts with hydration and the right sequence of botanicals." },
    content: { rendered: "<p>Waking up your skin requires more than just water. Discover the step-by-step ritual that leading dermatologists recommend for that morning glow...</p>" },
    date: "2024-03-18T09:00:00",
    slug: "radiant-morning-ritual",
    featured_media: 2,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200", alt_text: "Skincare products" }],
      'wp:term': [[MOCK_CATEGORIES[1]]]
    }
  },
  {
    id: 103,
    title: { rendered: "Boutique Stays in the Heart of Kyoto" },
    excerpt: { rendered: "From traditional ryokans to modern architectural wonders, Kyoto offers some of the most unique stays in Japan." },
    content: { rendered: "<p>Kyoto is a city that preserves the past while embracing the future. Our guide takes you inside the most exclusive boutique hotels...</p>" },
    date: "2024-03-15T14:30:00",
    slug: "kyoto-boutique-stays",
    featured_media: 3,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200", alt_text: "Kyoto Temple" }],
      'wp:term': [[MOCK_CATEGORIES[4]]]
    }
  },
  {
    id: 104,
    title: { rendered: "Spring/Summer 2024 Palette: Soft Earth Tones" },
    excerpt: { rendered: "Discover the colors that will dominate the coming season, from terracotta to dusty sage." },
    content: { rendered: "<p>Season shifts are always exciting. This year, we're seeing a return to nature with a palette that feels grounded and serene...</p>" },
    date: "2024-03-12T11:00:00",
    slug: "ss24-palette",
    featured_media: 4,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1523381282611-ad77540605b4?auto=format&fit=crop&q=80&w=1200", alt_text: "Color swatches" }],
      'wp:term': [[MOCK_CATEGORIES[0]]]
    }
  },
  {
    id: 105,
    title: { rendered: "The Ultimate Guide to Sculptural Makeup" },
    excerpt: { rendered: "How to use light and shadow to enhance your natural features without the weight of traditional contouring." },
    content: { rendered: "<p>Makeup is about enhancement, not concealment. Sculptural makeup uses creamy textures and soft blending to highlight the bone structure...</p>" },
    date: "2024-03-10T16:00:00",
    slug: "sculptural-makeup-guide",
    featured_media: 5,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200", alt_text: "Makeup artistry" }],
      'wp:term': [[MOCK_CATEGORIES[2]]]
    }
  },
  {
    id: 106,
    title: { rendered: "Mindful Living in the Urban Jungle" },
    excerpt: { rendered: "Finding peace and presence amidst the chaos of city life through small, intentional changes." },
    content: { rendered: "<p>Living in a city can be overwhelming. But with a few mindful practices, you can create an oasis of calm in your own apartment...</p>" },
    date: "2024-03-08T08:00:00",
    slug: "mindful-urban-living",
    featured_media: 6,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1200", alt_text: "Modern interior" }],
      'wp:term': [[MOCK_CATEGORIES[3]]]
    }
  },
  {
    id: 107,
    title: { rendered: "Linen: The Sustainable Choice for Summer" },
    excerpt: { rendered: "Why linen remains the gold standard for eco-conscious summer wardrobes." },
    content: { rendered: "<p>Linen is one of the oldest textiles in the world, and for good reason. It's durable, breathable, and biodegradable...</p>" },
    date: "2024-03-05T12:00:00",
    slug: "linen-summer-choice",
    featured_media: 7,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1591361528633-5147575239e1?auto=format&fit=crop&q=80&w=1200", alt_text: "Linen clothing" }],
      'wp:term': [[MOCK_CATEGORIES[0]]]
    }
  },
  {
    id: 108,
    title: { rendered: "Double Cleansing: Is It Worth the Hype?" },
    excerpt: { rendered: "Deconstructing the two-step cleansing method and why your skin might need it." },
    content: { rendered: "<p>If you wear SPF or makeup, a single cleanse might not be enough. Here's why the double cleanse is a game-changer...</p>" },
    date: "2024-03-02T20:00:00",
    slug: "double-cleansing-worth-it",
    featured_media: 8,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200", alt_text: "Skin product" }],
      'wp:term': [[MOCK_CATEGORIES[1]]]
    }
  },
  {
    id: 109,
    title: { rendered: "A Weekend in Copenhagen" },
    excerpt: { rendered: "From Nordic cuisine to the best vintage shops, here's how to spend 48 hours in the Danish capital." },
    content: { rendered: "<p>Copenhagen is the epitome of cool. Our weekend itinerary covers the must-visit galleries and the most aesthetic cafes...</p>" },
    date: "2024-02-28T10:00:00",
    slug: "copenhagen-weekend",
    featured_media: 9,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=1200", alt_text: "Copenhagen street" }],
      'wp:term': [[MOCK_CATEGORIES[4]]]
    }
  },
  {
    id: 110,
    title: { rendered: "The Rise of Statement Jewelry" },
    excerpt: { rendered: "Bold, sculptural pieces are taking center stage in 2024. Here's how to style them." },
    content: { rendered: "<p>Jewelry is getting bigger and bolder. From chunky gold earrings to artistic necklaces, the accessories are the outfit this year...</p>" },
    date: "2024-02-25T15:00:00",
    slug: "statement-jewelry-rise",
    featured_media: 10,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1535633302708-1a55c202029c?auto=format&fit=crop&q=80&w=1200", alt_text: "Jewelry" }],
      'wp:term': [[MOCK_CATEGORIES[0]]]
    }
  },
  {
    id: 111,
    title: { rendered: "Interior Trends: Warm Minimalism" },
    excerpt: { rendered: "Moving away from cold whites to warmer, tactile environments that feel lived-in and layered." },
    content: { rendered: "<p> minimalism is evolving. We're seeing more natural wood, textured linens, and a palette of warm beiges and soft creams...</p>" },
    date: "2024-02-22T09:00:00",
    slug: "warm-minimalism-interiors",
    featured_media: 11,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200", alt_text: "Bedroom interior" }],
      'wp:term': [[MOCK_CATEGORIES[3]]]
    }
  },
  {
    id: 112,
    title: { rendered: "Niacinamide: The All-Rounder Your Skin Needs" },
    excerpt: { rendered: "Everything you need to know about the powerhouse ingredient that addresses pores, texture, and redness." },
    content: { rendered: "<p>If you could only use one serum, many experts would argue it should be niacinamide. This versatile vitamin B3 derivative...</p>" },
    date: "2024-02-18T10:00:00",
    slug: "niacinamide-guide",
    featured_media: 12,
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200", alt_text: "Skincare bottle" }],
      'wp:term': [[MOCK_CATEGORIES[1]]]
    }
  }
];

export async function getPosts(params: string = '') {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredPosts = [...MOCK_POSTS];
  
  if (params.includes('per_page=')) {
    const limit = parseInt(params.split('per_page=')[1]);
    filteredPosts = filteredPosts.slice(0, limit);
  }
  
  return filteredPosts;
}

export async function getPostBySlug(slug: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_POSTS.find(p => p.slug === slug) || null;
}

export async function getCategories() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_CATEGORIES;
}

export async function getLatestPosts(count: number = 3, excludeId?: number) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_POSTS
    .filter(p => p.id !== excludeId)
    .slice(0, count);
}

export async function getAuthor(id: number): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_AUTHORS.find(a => a.id === id) || MOCK_AUTHORS[0];
}

export async function getPostsByAuthor(authorId: number, count: number = 10) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_POSTS.slice(0, count);
}

export async function getCategoryPosts(categoryId: number, count: number = 1) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_POSTS
    .filter(p => p._embedded?.['wp:term']?.[0]?.some(c => c.id === categoryId))
    .slice(0, count);
}

export async function getCategoryBySlug(slug: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_CATEGORIES.find(c => c.slug === slug) || null;
}

export async function getPostsByCategory(categoryId: number, count: number = 10) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_POSTS
    .filter(p => p._embedded?.['wp:term']?.[0]?.some(c => c.id === categoryId))
    .slice(0, count);
}

export async function searchPosts(query: string, count: number = 10) {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (!query) return [];
  const lowercaseQuery = query.toLowerCase();
  return MOCK_POSTS
    .filter(p => 
      p.title.rendered.toLowerCase().includes(lowercaseQuery) || 
      p.excerpt.rendered.toLowerCase().includes(lowercaseQuery)
    )
    .slice(0, count);
}

