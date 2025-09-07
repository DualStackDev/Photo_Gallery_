// Utility to compress images above 10MB before upload
// Requires: npm install browser-image-compression
import imageCompression from "browser-image-compression";

/**
 * Compresses an image file if its size is above 10MB.
 * @param {File} imageFile - The image file to check and compress.
 * @returns {Promise<File>} - The original or compressed image file.
 */
export async function compressImageIfNeeded(imageFile) {
  const TEN_MB = 10 * 1024 * 1024;
  if (imageFile.size <= TEN_MB) {
    return imageFile;
  }

  // Compression options
  const options = {
    maxSizeMB: 5, // Target size below 10MB
    maxWidthOrHeight: 1920, // Resize if needed
    useWebWorker: true,
    initialQuality: 0.7,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    return imageFile; // Fallback to original
  }
}
