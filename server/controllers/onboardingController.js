const UserOnboarding = require("../models/UserOnboarding");

// Create or update user onboarding data
exports.updateOnboarding = async (req, res) => {
  try {
    const { name, age, gender, location, fitnessGoals } = req.body;
    const userId = req.user._id; // Assuming user ID is attached by auth middleware

    // Validate required fields
    if (!name || !age || !gender || !location || !fitnessGoals) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Find existing onboarding data or create new
    let onboarding = await UserOnboarding.findOne({ userId });

    if (onboarding) {
      // Update existing onboarding data
      onboarding.name = name;
      onboarding.age = age;
      onboarding.gender = gender;
      onboarding.location = location;
      onboarding.fitnessGoals = fitnessGoals;
      onboarding.onboarded = true;
      await onboarding.save();
    } else {
      // Create new onboarding data
      onboarding = await UserOnboarding.create({
        userId,
        name,
        age,
        gender,
        location,
        fitnessGoals,
        onboarded: true,
      });
    }

    res.status(200).json({
      success: true,
      data: onboarding,
    });
  } catch (error) {
    console.error("Onboarding update error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating onboarding data",
    });
  }
};

// Get user onboarding data
exports.getOnboarding = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is attached by auth middleware
    const onboarding = await UserOnboarding.findOne({ userId });

    if (!onboarding) {
      return res.status(404).json({
        success: false,
        message: "Onboarding data not found",
      });
    }

    res.status(200).json({
      success: true,
      data: onboarding,
    });
  } catch (error) {
    console.error("Onboarding fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching onboarding data",
    });
  }
};
