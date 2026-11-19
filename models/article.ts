import { ObjectId } from 'mongodb';
import { getArticlesCollection } from '../config/server.js';

export interface ArticleDocument {
  _id?: ObjectId;
  title: string;
  content: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
}

// Utilitaire pour transformer _id (ObjectId) en id (string)
function mapArticle(doc: ArticleDocument): Article {
  return {
    id: doc._id!.toString(),
    title: doc.title,
    content: doc.content,
  };
}

export const ArticleModel = {
  findAll: async (): Promise<Article[]> => {
    const docs = await getArticlesCollection().find().toArray();
    return docs.map(mapArticle);
  },

  findById: async (id: string): Promise<Article | undefined> => {
    if (!ObjectId.isValid(id)) return undefined;
    const doc = await getArticlesCollection().findOne({ _id: new ObjectId(id) });
    return doc ? mapArticle(doc) : undefined;
  },

  create: async (data: Omit<Article, 'id'>): Promise<Article> => {
    const result = await getArticlesCollection().insertOne(data);
    return {
      id: result.insertedId.toString(),
      ...data,
    };
  },

  delete: async (id: string): Promise<void> => {
    if (!ObjectId.isValid(id)) return;
    await getArticlesCollection().deleteOne({ _id: new ObjectId(id) });
  },
};

export function validateArticle(data: Omit<Article, 'id'>): boolean {
  const { title, content } = data;
  if (typeof title !== 'string' || title.trim().length < 5) {
    return false;
  }
  if (typeof content !== 'string' || content.trim().length < 10) {
    return false;
  }
  return true;
}
