import { type Article, ArticleModel, validateArticle } from '../models/article.js';

export const ArticleService = {
  getAllArticles: async (): Promise<Article[]> => {
    return await ArticleModel.findAll();
  },

  getArticleById: async (id: string): Promise<Article> => {
    const article = await ArticleModel.findById(id);
    if (!article) {
      throw new Error('ARTICLE_NOT_FOUND');
    }
    return article;
  },

  createArticle: async (title: string, content: string): Promise<Article> => {
    const articleData = { title, content };

    if (!validateArticle(articleData)) {
      throw new Error('INVALID_ARTICLE_DATA');
    }

    return await ArticleModel.create({
      title: title.trim(),
      content: content.trim(),
    });
  },

  deleteArticle: async (id: string): Promise<void> => {
    const article = await ArticleModel.findById(id);
    if (!article) {
      throw new Error('ARTICLE_NOT_FOUND');
    }
    await ArticleModel.delete(id);
  },
};
