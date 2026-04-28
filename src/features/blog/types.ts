export interface BlogAuthor {
  name: string;
  avatar: string;
}

export type ArticleSectionType = "h2" | "p" | "img";

export interface ArticleSection {
  type: ArticleSectionType;
  id?: string;
  content: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: BlogAuthor;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  sections: ArticleSection[];
}
