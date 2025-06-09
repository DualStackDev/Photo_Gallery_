// models/Photo.js
import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    }, // URL of the image (stored in Cloudinary)

    imageName: {
      type: String,
      required: true,
    },

    tags: [{ type: String }], // Tags for filtering (e.g., "cats", "cars", "weddings")

    folder: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Folder model
      ref: "Folder",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Photo", photoSchema);
