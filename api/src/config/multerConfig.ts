import multer from "multer";

const storage = multer.memoryStorage(); // Guarda archivos en la RAM temporalmente

const upload = multer({ storage });

export default upload;
