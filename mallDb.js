use mallDb;

// Création des collections
db.createCollection("shops");
db.createCollection("categories");
db.createCollection("products");
db.createCollection("roles");
db.createCollection("users");
db.createCollection("paymentType");
db.createCollection("payment");
db.createCollection("invoices");

// Insertion des données de test
db.shops.insertMany([
  { 
    proprioName: "Jean Dupont",
    name: "Shop A", 
    description: "Boutique spécialisée en électronique", 
    fiscal_number: "STAT-123-456-789",
    logo: "logos/shop-a.png",
    email: "contact@shopa.mg",
    password: "Shop2026",
    contact: "034 00 123 45",
    address: "Ankorondrano, Antananarivo",
    price_in_month: 100.0, 
    state: 1, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    proprioName: "Marie Rakoto",
    name: "Shop B", 
    description: "Boutique de mode et prêt-à-porter", 
    fiscal_number: "STAT-987-654-321",
    logo: "logos/shop-b.png",
    email: "sales@shopb.mg",
    password: "Shop2026",
    contact: "032 11 987 65",
    address: "Analakely, Antananarivo",
    price_in_month: 150.0, 
    state: 1, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  }
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

var clientRules = db.roles.findOne({ name: "Client" })._id;
var adminRules = db.roles.findOne({ name: "Admin mall" })._id;

db.users.insertMany([
  {
    role_id: adminRules,
    first_name: "Admin",
    last_name: "Mall",
    birthday: new Date("1999-12-12"),
    email: "Admin.mall@gmail.com",
    password: "Admin2026",
    contact: "034 56 987 00",
    address: "LOT ITE 001 Ivandry",
    cin: "113 489 389 383",
    username: "Admin Mall",
    state: 5
  },
  {
    role_id: clientRules,
    first_name: "Ravao",
    last_name: "Solo",
    birthday: new Date("1998-10-19"),
    email: "Ravao.Solo@gmail.com",
    password: "User2026",
    contact: "033 23 937 34",
    address: "LOT ITH 019 Ivato",
    cin: "101 003 023 033",
    state: 5
  }
]);
