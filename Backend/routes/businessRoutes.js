const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getBusinessProfile } = require('../controllers/businessProfileController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Only businesses can create or update their profile
router.post('/profile', protect, authorizeRoles('business'), createOrUpdateProfile);

// Anyone authenticated can view a business profile
router.get('/profile/:userId', protect, getBusinessProfile);

module.exports = router;
