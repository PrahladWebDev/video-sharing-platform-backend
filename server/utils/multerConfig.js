import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'avatars',
        allowed_formats: ['jpg', 'jpeg', 'png'], // Only allow specific formats
        transformation: [{ width: 150, height: 150, crop: 'fill' }], // Resize during upload
    },
});

const upload = multer({ storage });

export default upload;
