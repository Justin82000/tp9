import { MongoClient, Collection } from 'mongodb';
import { type ArticleDocument } from '../models/article.js';

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);

let collection: Collection<ArticleDocument>;

export async function connectDB(): Promise<void> {
  await client.connect();
  collection = client.db('mon_projet').collection<ArticleDocument>('articles');
  console.log('Connecté à MongoDB');
}

export function getArticlesCollection(): Collection<ArticleDocument> {
  if (!collection) {
    throw new Error("La base de données n'est pas initialisée.");
  }
  return collection;
}
