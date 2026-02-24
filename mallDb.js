use mallDb;

// Création des collections
db.createCollection("shops");
db.createCollection("categories");
db.createCollection("products");
db.createCollection("roles");
db.createCollection("users");
db.createCollection("paymentType");
db.createCollection("payment");
db.createCollection("invoice");

// Insertion des données de test
db.shops.insertMany([
  { name: "Shop A", description: "Boutique A", price_in_month: 100.0, state: 1, createdAt: new Date(), updatedAt: new Date() },
  { name: "Shop B", description: "Boutique B", price_in_month: 150.0, state: 1, createdAt: new Date(), updatedAt: new Date() }
]);

db.categories.insertMany([
  { name: "Eléctronique", description: "Produits électroniques", createdAt: new Date(), updatedAt: new Date() },
  { name: "Habits", description: "Vêtements", createdAt: new Date(), updatedAt: new Date() },
  { name: "Loisirs", description: "Jeux de société", createdAt: new Date(), updatedAt: new Date() },
  { name: "Maison", description: "Déco et materiaux de construction", createdAt: new Date(), updatedAt: new Date() },
]);

db.roles.insertMany([
  { id: 1, name: "Admin shop", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: "Admin mall", createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: "Client", createdAt: new Date(), updatedAt: new Date() }
]);

var shopA = db.shops.findOne({ name: "Shop A" })._id;
var shopB = db.shops.findOne({ name: "Shop B" })._id;

var catElectronics = db.categories.findOne({ name: "Eléctronique" })._id;
var catClothing = db.categories.findOne({ name: "Habits" })._id;
var catGames = db.categories.findOne({ name: "Loisirs" })._id;
var catHouse = db.categories.findOne({ name: "Maison" })._id;

db.products.insertMany([
  {
    code: "P001",
    name: "Asus Rog Strix",
    description: "Ordinateur portable",
    unit_price: 6000000.0,
    discount_rate: 0,
    shop_id: shopA,
    category_id: catElectronics,
    image: "laptop.jpg",
    state: 1,
    color: "#262626-#1890ff-#ff4d4f",
    build_material: "Aluminium",
    stockage: "16/500-8/256",
    quality: "Authentique",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "P002",
    name: "T-Shirt",
    description: "T-Shirt en coton",
    unit_price: 30000.0,
    discount_rate: 5.0,
    shop_id: shopB,
    category_id: catClothing,
    image: "tshirt.jpg",
    state: 1,
    color: "#262626-#1890ff-#ff4d4f",
    build_material: "Coton",
    stockage: "M-L-XL",
    quality: "Authentique",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "P003",
    name: "Scrabble",
    description: "Le meilleur des jeux de société, recommandée pour passer une belle soirée avec la famille ou amis",
    unit_price: 20.0,
    discount_rate: 5.0,
    shop_id: shopB,
    category_id: catGames,
    image: "tshirt.jpg",
    state: 1,
    color: "#262626-#1890ff-#ff4d4f",
    build_material: "Plastique",
    stockage: "15*15-30*30",
    quality: "Authentique",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "P004",
    name: "Porte manteau",
    description: "Une porte manteau solide, parfaitement taillé a la main",
    unit_price: 20.0,
    discount_rate: 5.0,
    shop_id: shopB,
    category_id: catGames,
    image: "tshirt.jpg",
    state: 1,
    color: "#ff5900ff",
    build_material: "Coton",
    stockage: "30*30-50*50-70*70",
    quality: "Authentique",
    createdAt: new Date(),
    updatedAt: new Date()
  }

]);

