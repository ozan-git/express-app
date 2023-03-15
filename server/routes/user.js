import { Router } from 'express';
import user from '../controllers/user.js';

const router = Router();

// GET /user (ROUTES)
router
    .get('/', user.onGetAllUsers)
    .get('/:id', user.onGetUserById)
    .post('/', user.onCreateUser)
    .delete('/:id', user.onDeleteUserById)

export default router;
