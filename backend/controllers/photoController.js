// controllers/photoController.js
import Photo from '../models/Photo.js';
import { v2 as cloudinary } from 'cloudinary';

// Get candid photos (e.g., photos with the "candid" tag)
export const getCandidPhotos = async (req, res) => {
  try {
    const candidPhotos = await Photo.find({ tags: 'candid' }).sort({ createdAt: -1 });
    res.status(200).json(candidPhotos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candid photos', error });
  }
};

// Get photos by folder (e.g., "cats", "cars")
export const getPhotosByFolder = async (req, res) => {
  try {
    const { folderName } = req.params;
    const photos = await Photo.find({ folder: folderName }).sort({ createdAt: -1 });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos by folder', error });
  }
};

// Upload a photo (admin only)
export const uploadPhoto = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload image to Cloudinary with optimization
    const result = await cloudinary.uploader.upload(file.buffer.toString('base64'), {
      folder: 'photographer', // Folder in Cloudinary
      transformation: [
        { width: 800, height: 800, crop: 'limit', quality: 'auto' }, // High-quality version
        { width: 200, height: 200, crop: 'thumb', quality: 'auto' }, // Thumbnail version
      ],
    });

    // Save photo details to MongoDB
    const { description, tags, folder } = req.body;
    const newPhoto = new Photo({
      imageUrl: result.secure_url, // High-quality image
      thumbnailUrl: result.eager[0].secure_url, // Thumbnail image
      description,
      tags: tags.split(',').map((tag) => tag.trim()), // Convert tags string to array
      folder,
    });

    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo', error });
  }
};

// Get details of a specific photo (for the dialog box)
export const getPhotoDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photo details', error });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(photo.imageUrl);

    // Delete photo from MongoDB
    await Photo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting photo', error });
  }
};