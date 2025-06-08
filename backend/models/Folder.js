import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, // Ensure folder names are unique
    trim: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Folder', folderSchema);