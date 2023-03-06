const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// GET /user (ROUTES)
router
    .get('/', userController.getAll)
    .get('/:id', userController.getById)
    .post('/', userController.createUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser);

module.exports = router;