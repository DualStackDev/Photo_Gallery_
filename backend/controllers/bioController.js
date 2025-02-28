import { Bio } from '../models/Bio.js';

export const getBio = async (req, res) => {
  try {
    const bio = await Bio.findOne();
    res.status(200).json(bio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bio', error });
  }
};

export const updateBio = async (req, res) => {
  try {
    const { profileImage, name, bio, contactInfo } = req.body;
    let existingBio = await Bio.findOne();

    if (existingBio) {
      existingBio.profileImage = profileImage;
      existingBio.name = name;
      existingBio.bio = bio;
      existingBio.contactInfo = contactInfo;
      await existingBio.save();
    } else {
      existingBio = new Bio({ profileImage, name, bio, contactInfo });
      await existingBio.save();
    }

    res.status(200).json(existingBio);
  } catch (error) {
    res.status(500).json({ message: 'Error updating bio', error });
  }
};