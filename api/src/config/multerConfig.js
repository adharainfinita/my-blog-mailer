// src/multerConfig.js
import multer from 'multer';

export const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['text/plain', 'application/pdf'];
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  },
});
