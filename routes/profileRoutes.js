const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.post('/', profileController.createProfile);
router.get('/', profileController.getProfiles);
router.get('/search', profileController.searchProfiles);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
