import Folder from "../models/Folder.js";

// Get all folders
export const getAllFolders = async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: -1 });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching folders",
      error: error.message,
    });
  }
};
