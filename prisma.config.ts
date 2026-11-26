import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations'
  },
  datasource: {
    // Écrit directement l'URL SQLite ici
    url: 'file:./dev.db', 
  },
});
