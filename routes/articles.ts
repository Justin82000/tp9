import { Router } from 'express';
import { login } from "../controllers/auth.js";
import { ArticleController } from '../controllers/articleController.js';

const router = Router();

router.get('/', ArticleController.getAll);
router.get('/:id', ArticleController.getOne);
router.post('/', ArticleController.create);
router.post("/login", login);
router.delete('/:id', ArticleController.delete);

export default router;
