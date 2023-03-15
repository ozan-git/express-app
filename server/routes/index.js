import { Router } from 'express';

// middlewares
import { encode } from '../middlewares/jwt.js';

const router = Router();

router.post('/login/:userId', encode, (req, res) => {
    return res.status(200).json({
        success: true,
        authorization: req.authToken,
    });
});

export default router;
