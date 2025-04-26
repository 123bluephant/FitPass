const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  updateOnboarding,
  getOnboarding,
} = require("../controllers/onboardingController");

// Protected routes - require authentication
router.use(protect);

// Update or create onboarding data
router.post("/", updateOnboarding);

// Get onboarding data
router.get("/", getOnboarding);

module.exports = router;