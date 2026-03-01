const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuration avec tes variables d'environnement
cloudinary.config({
  cloud_name: 'duh7bnqhv',
  api_key: '419569562119462',
  api_secret: 'loxU2utxTJW6KDSOWiXeH8rq4dg'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] 
  },
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;