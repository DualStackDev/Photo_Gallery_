import Photo from '../models/Photo.js';
import Folder from '../models/Folder.js';
import { v2 as cloudinary } from 'cloudinary';

export const deleteByName = async (req, res) => {
  const { name, type } = req.body; // type = 'photo' or 'folder'

  try {
    if (type === 'photo') {
      // ===== PHOTO DELETION =====
      const photo = await Photo.findOne({ description: name }); // Match by description/name
      
      if (!photo) {
        return res.status(404).json({ success: false, message: 'Photo not found' });
      }

      // Delete from Cloudinary
      const publicId = photo.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`photographer/${publicId}`);

      // Delete from MongoDB
      await Photo.findByIdAndDelete(photo._id);

      return res.status(200).json({
        success: true,
        message: `Photo "${name}" deleted successfully`
      });

    } else if (type === 'folder') {
      // ===== FOLDER DELETION =====
      const folder = await Folder.findOne({ name });
      
      if (!folder) {
        return res.status(404).json({ success: false, message: 'Folder not found' });
      }

      // Delete all photos in the folder
      const photos = await Photo.find({ folder: folder._id });
      const deletePromises = photos.map(photo => {
        const publicId = photo.imageUrl.split('/').pop().split('.')[0];
        return cloudinary.uploader.destroy(`photographer/${publicId}`);
      });
      await Promise.all(deletePromises);

      // Delete folder and its photos from MongoDB
      await Photo.deleteMany({ folder: folder._id });
      await Folder.findByIdAndDelete(folder._id);

      return res.status(200).json({
        success: true,
        message: `Folder "${name}" and ${photos.length} photos deleted`
      });

    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Use "photo" or "folder"'
      });
    }

  } catch (error) {
    console.error('Deletion error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during deletion',
      error: error.message
    });
  }
};