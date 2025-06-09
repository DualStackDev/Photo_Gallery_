import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Use in your route: upload.single("file")
export default upload;
