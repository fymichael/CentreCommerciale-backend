const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => {
    console.error('❌ Erreur MongoDB :', err.message);
    process.exit(1);
  });

// Enregistrement GLOBAL des modèles
require('./models/Shop');
require('./models/Category');
require('./models/Product');
require('./models/User');
require('./models/Invoice');
require('./models/Payment');
require('./models/PaymentType');
require('./models/Storage');
require('./models/SubscriptionShop');

// Routes
app.use('/uploads', express.static('uploads'));
app.use('/products', require('./routes/product.routes'));
app.use('/categorys', require('./routes/category.routes'));
app.use('/shops', require('./routes/shop.routes'));

app.listen(PORT, () =>
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
);
