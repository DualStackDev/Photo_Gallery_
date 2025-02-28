import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema({
    profileImage: { 
        type: String, 
        // required: true 
    }, 
    name: {
         type: String,
          required: true 
        },
    bio: { 
        type: String, 
        required: true 
    },
    contactInfo: { 
        type: String,
         default: '' 
    }, 
  },
  {
    timestamps: true,
  } 
);
  
  export const Bio = mongoose.model('Bio', bioSchema);