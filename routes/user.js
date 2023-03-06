const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// middleware that is specific to this router
const auth  = require('../middlewares/auth');

// GET /user (ROUTES)
router
    .get('/', auth.decode, userController.getAll)
    .post('/middleware-login-demo', auth.encode, (req, res) => {
        return res.status(200).json({ success: true, token: req.token })
    })
    .get('/:id', userController.getById)
    .post('/', userController.createUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)



module.exports = router;