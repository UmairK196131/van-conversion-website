import { prisma } from '../lib/prisma.js';

const BLOG_LIST_SELECT = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  coverImage: true,
  publishedAt: true,
  author: {
    select: {
      email: true,
    },
  },
};

function formatAuthor(author) {
  if (!author?.email) return 'Van Conversion Team';
  const localPart = author.email.split('@')[0];
  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function mapBlogPost(post) {
  return {
    ...post,
    authorName: formatAuthor(post.author),
    author: undefined,
  };
}

export async function listBlogPosts(_req, res, next) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      select: BLOG_LIST_SELECT,
    });

    res.json({ data: posts.map(mapBlogPost) });
  } catch (error) {
    next(error);
  }
}

export async function getBlogPostBySlug(req, res, next) {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: req.params.slug,
        isPublished: true,
      },
      select: {
        ...BLOG_LIST_SELECT,
        content: true,
      },
    });

    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }

    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        slug: { not: post.slug },
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: BLOG_LIST_SELECT,
    });

    res.json({
      data: {
        ...mapBlogPost(post),
        relatedPosts: relatedPosts.map(mapBlogPost),
      },
    });
  } catch (error) {
    next(error);
  }
}
