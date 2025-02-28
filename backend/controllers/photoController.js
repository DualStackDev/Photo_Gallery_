import { Photo } from '../models/Photo.js';
import { v2 as cloudinary } from 'cloudinary';

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos', error });
  }
};

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
        { width: 800, height: 800, crop: 'limit', quality: 'auto' }, // Optimized version
        { width: 200, height: 200, crop: 'thumb', quality: 'auto' }, // Thumbnail version
      ],
    });

    // Save photo URLs to MongoDB
    const newPhoto = new Photo({
      imageUrl: result.secure_url, // High-quality image
      thumbnailUrl: result.eager[0].secure_url, // Thumbnail image
      description: req.body.description || '',
    });

    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo', error });
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