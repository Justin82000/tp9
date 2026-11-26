import express from 'express';
import articleRoutes from './routes/articles.js';
import { connectDB } from './config/server.js';
import authRouter from './routes/articles.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api/articles', articleRoutes);
app.use("/auth", authRouter);

//connectDB()
//  .then(() => {
//    console.log('MongoDB est connecté avec succès.');
// })
//  .catch((err) => {
//    console.warn('Impossible de se connecter à MongoDB:', err);
//  });

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
