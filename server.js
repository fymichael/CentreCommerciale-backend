const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();

// 1. GESTION DU DOSSIER UPLOADS (Uniquement hors Vercel)
// Vercel est en lecture seule, mkdir ferait crash l'app
if (!process.env.VERCEL) {
    const dir = './uploads/products';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log("📁 Dossier local uploads/products vérifié/créé");
    }
}

// Middleware
app.use(cors());
app.use(express.json());

// 2. CONNEXION MONGODB (Optimisée pour Serverless)
mongoose.set('debug', true);

// Sur Vercel, on évite de se reconnecter à chaque appel si déjà connecté
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(process.env.MONGO_URI);
};

// Appel initial pour le local, pour Vercel chaque route devrait idéalement appeler connectDB
connectDB()
    .then(() => console.log('✅ MongoDB connecté'))
    .catch(err => {
        console.error('❌ Erreur MongoDB :', err.message);
        // On ne fait pas process.exit(1) sur Vercel sinon la fonction ne redémarrera pas
        if (!process.env.VERCEL) process.exit(1);
    });

// Enregistrement des modèles
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
app.use('/invoices', require('./routes/invoice.routes'));
app.use('/payment-types', require('./routes/paymentType.routes'));
app.use('/payments', require('./routes/payment.routes'));
app.use('/roles', require('./routes/role.routes'));
app.use('/users', require('./routes/user.routes'));

// 3. ADAPTATION POUR VERCEL
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
        console.log(`🚀 Serveur démarré en local sur : http://localhost:${PORT}`)
    );
}

// 4. EXPORT POUR VERCEL (Indispensable)
module.exports = app;