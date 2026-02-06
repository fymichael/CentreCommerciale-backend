use mallDb;

// Création des collections
db.createCollection("shops");
db.createCollection("categories");
db.createCollection("products");

// Insertion des données de test
db.shops.insertMany([
  { name: "Shop A", description: "Boutique A", price_in_month: 100.0, state: 1, createdAt: new Date(), updatedAt: new Date() },
  { name: "Shop B", description: "Boutique B", price_in_month: 150.0, state: 1, createdAt: new Date(), updatedAt: new Date() }
]);

db.categories.insertMany([
  { name: "Electronics", description: "Produits électroniques", createdAt: new Date(), updatedAt: new Date() },
  { name: "Clothing", description: "Vêtements", createdAt: new Date(), updatedAt: new Date() }
]);

var shopA = db.shops.findOne({ name: "Shop A" })._id;
var shopB = db.shops.findOne({ name: "Shop B" })._id;

var catElectronics = db.categories.findOne({ name: "Electronics" })._id;
var catClothing = db.categories.findOne({ name: "Clothing" })._id;

db.products.insertMany([
  {
    code: "P001",
    name: "Laptop",
    description: "Ordinateur portable",
    unit_price: 1200.0,
    discount_rate: 10.0,
    shop_id: shopA,
    category_id: catElectronics,
    image: "laptop.jpg",
    state: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "P002",
    name: "T-Shirt",
    description: "T-Shirt en coton",
    unit_price: 20.0,
    discount_rate: 5.0,
    shop_id: shopB,
    category_id: catClothing,
    image: "tshirt.jpg",
    state: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

