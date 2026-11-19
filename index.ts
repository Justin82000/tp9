import express from 'express';
import articleRoutes from './routes/articles.js';
import { connectDB } from './config/server.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api/articles', articleRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Impossible de se connecter à MongoDB :', err);
    process.exit(1);
  });
