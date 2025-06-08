import Contact from "../models/Contact.js";

// Submit Get In Touch form
export const submitContactForm = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    const newContact = new Contact({
      name,
      phone,
      email,
      subject,
      message,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Form submitted successfully!",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting form",
      error: error.message,
    });
  }
};

// Get all contact forms (latest first) for notifications
export const getContactNotifications = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 }) // Newest first
      .limit(10); // Last 10 submissions

    // Mark as read after fetching (optional)
    await Contact.updateMany(
      { _id: { $in: contacts.map((c) => c._id) } },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};
