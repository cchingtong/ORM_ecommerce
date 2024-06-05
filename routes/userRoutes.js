const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/search', userController.searchUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
