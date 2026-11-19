import { type Request, type Response } from 'express';
import { ArticleService } from '../services/articleService.js';

export const ArticleController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    const articles = await ArticleService.getAllArticles();
    res.json(articles);
  },

  getOne: async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'Identifiant manquant' });
      return;
    }
    const article = await ArticleService.getArticleById(id);
    if (!article) {
      res.status(404).json({ error: 'Article introuvable' });
      return;
    }
    res.json(article);
  } catch (error) {
    res.status(404).json({ error: 'Article introuvable' });
  }
},


  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content } = req.body;
      const newArticle = await ArticleService.createArticle(title, content);
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(400).json({ error: 'Données invalides (titre ou contenu trop court)' });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') {
        res.status(404).json({ error: 'Article introuvable' });
        return;
      }
      await ArticleService.deleteArticle(id);
      res.status(204).send();
    } catch (error: any) {
      console.error('Erreur delete :', error);
      if (error.message === 'ARTICLE_NOT_FOUND') {
        res.status(404).json({ error: 'Article introuvable' });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
