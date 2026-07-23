import { prisma } from '../../lib/prisma.js';
import { logActivity } from '../../lib/activityLog.js';
import { slugify } from '../../utils/slugify.js';

export async function listBlogPosts(_req, res, next) {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { email: true } },
      },
    });
    res.json({ data: posts });
  } catch (error) {
    next(error);
  }
}

export async function getBlogPost(req, res, next) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        author: { select: { email: true } },
      },
    });

    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }

    res.json({ data: post });
  } catch (error) {
    next(error);
  }
}

export async function createBlogPost(req, res, next) {
  try {
    const { title, content, excerpt, coverImage, isPublished } = req.body;

    if (!title?.trim() || !content?.trim()) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }

    const published = Boolean(isPublished);

    const post = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug: slugify(title),
        content: content.trim(),
        excerpt: excerpt?.trim() || null,
        coverImage: coverImage || null,
        isPublished: published,
        publishedAt: published ? new Date() : null,
        authorId: req.user.id,
      },
    });

    await logActivity(req.user.id, 'CREATE', 'blog_post', post.id, { title: post.title });

    res.status(201).json({ data: post });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A blog post with this slug already exists' });
      return;
    }
    next(error);
  }
}

export async function updateBlogPost(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, content, excerpt, coverImage, isPublished } = req.body;

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }

    const data = {};
    if (title !== undefined) {
      data.title = title.trim();
      data.slug = slugify(title);
    }
    if (content !== undefined) data.content = content.trim();
    if (excerpt !== undefined) data.excerpt = excerpt?.trim() || null;
    if (coverImage !== undefined) data.coverImage = coverImage || null;
    if (isPublished !== undefined) {
      data.isPublished = Boolean(isPublished);
      if (isPublished && !existing.publishedAt) {
        data.publishedAt = new Date();
      }
    }

    const post = await prisma.blogPost.update({ where: { id }, data });

    await logActivity(req.user.id, 'UPDATE', 'blog_post', post.id, { title: post.title });

    res.json({ data: post });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A blog post with this slug already exists' });
      return;
    }
    next(error);
  }
}

export async function deleteBlogPost(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.blogPost.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }

    await prisma.blogPost.delete({ where: { id } });
    await logActivity(req.user.id, 'DELETE', 'blog_post', id, { title: existing.title });

    res.json({ data: { id } });
  } catch (error) {
    next(error);
  }
}
