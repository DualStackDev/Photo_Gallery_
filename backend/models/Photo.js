import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  imageUrl: { 
    type: String, 
    required: true
 }, 
 
  thumbnailUrl: { 
    type: String, 
    required: true
 }, 
 
 
  createdAt: {
     type: Date, 
     default: Date.now 
    },
},
{
    timestamps: true,
  }
);

export const Photo = mongoose.model('Photo', photoSchema);
