// middlewares/upload.middleware.js
const fs = require('fs');
const multer = require('multer');

const dir = 'uploads/products';

// 1. On ne crée le dossier QUE si on n'est PAS sur Vercel
if (!process.env.VERCEL) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// 2. On configure le stockage intelligemment
const storage = process.env.VERCEL 
    ? multer.memoryStorage() // Sur Vercel, on garde le fichier en RAM temporairement
    : multer.diskStorage({   // Sur ton PC, on garde le stockage sur disque
        destination: (req, file, cb) => {
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

const upload = multer({ storage: storage });

module.exports = upload;