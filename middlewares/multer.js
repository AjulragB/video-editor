import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'video') {
            cb(null, path.join(__dirname, '../uploads/videos'));
        } else if (file.fieldname === 'audio') {
            cb(null, path.join(__dirname, '../uploads/audio'));
        } else if (file.fieldname === 'image') {
            cb(null, path.join(__dirname, '../uploads/image'));
        } else {
            cb(new Error('Invalid file field'));
        }
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({
    storage: multerStorage,
});

export default upload;
