import express from 'express';
import multer from 'multer';
import { scanImage } from '../controllers/scanImageControllers.js'

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // Basic image type validation
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image file.'), false);
    }
  }
});

router.post('/', upload.single('image'), scanImage);

export default router;