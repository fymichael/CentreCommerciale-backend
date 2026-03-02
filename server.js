const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');

const app = express();

// 1. GESTION DU DOSSIER UPLOADS (Uniquement hors Vercel)
if (!process.env.VERCEL) {
    const dir = './uploads/products';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log("📁 Dossier local uploads/products vérifié/créé");
    }
}

// 2. MIDDLEWARES DE BASE
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: false
}));
app.use(express.json());

// 3. CONNEXION MONGODB (Optimisée pour Serverless / Vercel)
const connectDB = async () => {
    if (mongoose.connection.readyState === 2) return; // 2 = connected
    return mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4,
        heartbeatFrequencyMS: 10000,
        maxPoolSize: 1
    });
};

// 4. MIDDLEWARE CONNEXION AVANT CHAQUE REQUÊTE (indispensable sur Vercel)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('❌ Connexion MongoDB échouée:', err.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// 5. ENREGISTREMENT DES MODÈLES
require('./models/Shop');
require('./models/Category');
require('./models/Product');
require('./models/User');
require('./models/Invoice');
require('./models/Payment');
require('./models/PaymentType');
require('./models/Storage');
require('./models/SubscriptionShop');

// 6. ROUTES
app.use('/uploads', express.static('uploads'));
app.use('/products', require('./routes/product.routes'));
app.use('/categorys', require('./routes/category.routes'));
app.use('/shops', require('./routes/shop.routes'));
app.use('/invoices', require('./routes/invoice.routes'));
app.use('/payment-types', require('./routes/paymentType.routes'));
app.use('/payments', require('./routes/payment.routes'));
app.use('/roles', require('./routes/role.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/subscriptions', require('./routes/subscriptionShop.routes'));
app.use('/storages', require('./routes/storage.routes'));

// 7. DÉMARRAGE LOCAL (ignoré sur Vercel)
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
        console.log(`🚀 Serveur démarré en local sur : http://localhost:${PORT}`)
    );
}

// 8. EXPORT POUR VERCEL (indispensable)
module.exports = app;