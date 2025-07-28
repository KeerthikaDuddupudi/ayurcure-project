const SavedRemedy = require("../models/SavedRemedy");
const Notification = require("../models/Notification");

// Save a remedy
exports.saveRemedy = async (req, res) => {
  try {
    const { userEmail, remedy } = req.body;
    console.log("🔸 Received save request:", req.body);

    if (!userEmail || !remedy || typeof remedy !== "object") {
      console.log("❗ Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newSavedRemedy = new SavedRemedy({
      userEmail,
      remedy,
    });

    await newSavedRemedy.save();
    console.log("✅ Remedy saved with ID:", newSavedRemedy._id);

    // Create notification
    const message = "Your remedy has been saved successfully";
    const newNotification = new Notification({
      email: userEmail,
      message,
    });

    await newNotification.save();
    console.log("📩 Notification created for:", userEmail);

    res.status(201).json({
      message: "Remedy saved successfully",
      remedy: newSavedRemedy,
    });
  } catch (err) {
    console.error("❌ Error saving remedy:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all saved remedies for a user
exports.getRemedies = async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    console.log("📩 Getting remedies for:", userEmail);

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    const remedies = await SavedRemedy.find({ userEmail }).sort({ createdAt: -1 });

    console.log(`✅ Found ${remedies.length} remedies`);
    res.status(200).json(remedies);
  } catch (err) {
    console.error("❌ Error fetching saved remedies:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a saved remedy by ID
exports.deleteRemedy = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("🗑️ Deleting remedy with ID:", id);

    if (!id) {
      return res.status(400).json({ message: "Remedy ID is required" });
    }

    const deleted = await SavedRemedy.findByIdAndDelete(id);

    if (!deleted) {
      console.log("⚠️ Remedy not found for deletion");
      return res.status(404).json({ message: "Remedy not found" });
    }

    console.log("✅ Deleted remedy:", id);
    res.status(200).json({ message: "Remedy deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting remedy:", err);
    res.status(500).json({ message: "Server error" });
  }
};
