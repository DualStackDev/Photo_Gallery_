// controllers/photoController.js
import Photo from "../models/Photo.js";
import { v2 as cloudinary } from "cloudinary";
import Folder from "../models/Folder.js";

// Get candid photos (e.g., photos with the "candid" tag)
export const getCandidPhotos = async (req, res) => {
  try {
    const candidPhotos = await Photo.find({ tags: "candid" }).sort({
      createdAt: -1,
    });
    res.status(200).json(candidPhotos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candid photos", error });
  }
};

// Get photos by folder (e.g., "cats", "cars")
export const getPhotosByFolder = async (req, res) => {
  try {
    const { folderName } = req.params;
    // Find the folder by name
    const folder = await Folder.findOne({ name: folderName });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    // Fetch all photos with this folder's ObjectId
    const photos = await Photo.find({ folder: folder._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching photos by folder", error });
  }
};

// Upload a photo (admin only)
export const uploadPhoto = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { imageName, tags, folderName } = req.body;

    // ===== 1. CHECK IF FOLDER EXISTS =====
    let folder = await Folder.findOne({ name: folderName });

    // ===== 2. IF FOLDER DOESN'T EXIST, CREATE IT =====
    if (!folder) {
      folder = new Folder({ name: folderName });
      await folder.save();
      console.log(`Created new folder: ${folderName}`);
    }

    // ===== 3. UPLOAD IMAGE TO CLOUDINARY USING STREAM =====
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "photographer",
            // ...add transformations if needed...
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(file.buffer);

    // ===== 4. SAVE PHOTO TO DATABASE =====
    const newPhoto = new Photo({
      image: result.secure_url,
      imageName,
      tags: tags.split(",").map((tag) => tag.trim()),
      folder: folder._id, // Reference the folder's ObjectId
    });

    await newPhoto.save();

    res.status(201).json({
      photo: newPhoto,
      folder: { _id: folder._id, name: folder.name }, // Return folder info for confirmation
    });
  } catch (error) {
    console.error("Error in uploadPhoto:", error);
    res.status(500).json({
      message: "Error uploading photo",
      error: error.message,
    });
  }
};

// Get details of a specific photo (for the dialog box)
export const getPhotoDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching photo details", error });
  }
};
