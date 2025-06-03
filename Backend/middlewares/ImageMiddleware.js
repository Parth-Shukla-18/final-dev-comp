import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../DataBase/clodinary';
import cloudinary from '../DataBase/clodinary.js'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'userUploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

export default upload;
