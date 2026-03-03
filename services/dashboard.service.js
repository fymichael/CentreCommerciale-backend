// dashboard.service.js
const User = require('../models/User');
const Shop = require('../models/Shop');
const SubscriptionShop = require('../models/SubscriptionShop');
const Product = require('../models/Product');
const Invoice = require('../models/Invoice');
const invoiceService = require('./invoice.service');

class DashboardService {

    async getMallStats(year) {
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31T23:59:59`);
        const totalUsers = await User.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate }
        });
        const activeUsers = await User.countDocuments({ 
            createdAt: { $gte: startDate, $lte: endDate },
            state: 5 
        });
        const inactiveUsers = await User.countDocuments({ 
            createdAt: { $gte: startDate, $lte: endDate },
            state: 0 
        });
        const totalShops = await Shop.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
        });
        const activeShops = await Shop.countDocuments({ 
            createdAt: { $gte: startDate, $lte: endDate },
            state: 5 
        });

        const inactiveShops = await Shop.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
            state: { $ne: 5 }
        });

        const revenueTotalSubscription = await SubscriptionShop.aggregate([
             {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    state: 5
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenu: {
                        $sum: "$price"
                    }
                }
            }
        ]);

        const totalRevenu = revenueTotalSubscription.length > 0 
            ? revenueTotalSubscription[0].totalRevenu 
            : 0;


        return {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalShops,
        activeShops,
        inactiveShops,
        totalRevenu
        };
    }

   async getShopStats(year) {
        const totalClients = await User.countDocuments({ id: 3 });
        const totalProducts = await Product.countDocuments();
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31T23:59:59`);
        const revenueResult = await Invoice.aggregate([
             {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    state: 5
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenu: {
                        $sum: { $multiply: ["$unit_price", "$quantity"] }
                    }
                }
            }
        ]);

        const totalRevenu = revenueResult.length > 0 
            ? revenueResult[0].totalRevenu 
            : 0;

        const cumpResult = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalCump: { $sum: "$average_cost" }
                }
            }
        ]);

        const totalCump = cumpResult.length > 0
            ? cumpResult[0].totalCump
            : 0;

        return {
            totalClients,
            totalProducts,
            totalRevenu,
            totalCump
        };
    }

    async getYearlySubscriptionGraph(year) {

        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31T23:59:59`);

        const data = await SubscriptionShop.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    state: 5
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalRevenue: { $sum: "$price" },
                    totalSubscriptions: { $sum: 1 }
                }
            }
        ]);

        // Initialiser les 12 mois à 0
        const months = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            totalRevenue: 0,
            totalSubscriptions: 0
        }));

        // Injecter les vraies données
        data.forEach(item => {
            const monthIndex = item._id - 1;
            months[monthIndex].totalRevenue = item.totalRevenue;
            months[monthIndex].totalSubscriptions = item.totalSubscriptions;
        });

        return months;
    }

    async getDashboard(user, year) {

        if (user.role === "Admin mall") {

            const [dashboard, graphSubscriptions] = await Promise.all([
                this.getMallStats(year),
                this.getYearlySubscriptionGraph(year)
            ]);

            return { type: "mall", dashboard, graphSubscriptions };
        }

        if (user.role === "Admin shop") {
            const [dashboard, graphInvoices] = await Promise.all([
                this.getShopStatsForUser(user.id, year),
                this.getTotalOrdersByYearForUser(user.id, year)
            ]);

            return { type: "shop", dashboard, graphInvoices };
        }

        return null;
    }

    async getShopStatsForUser(userId, year) {
        // Récupérer toutes les boutiques liées à l'utilisateur
        console.log("user", userId);
        const subscriptions = await SubscriptionShop.find({ user_id: userId, state: 5 }).select('shop_id');
        const shopIds = subscriptions.map(s => s.shop_id);
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31T23:59:59`);

        if (shopIds.length === 0) {
            return {
                totalClients: 0,
                totalProducts: 0,
                totalRevenu: 0,
                totalCump: 0
            };
        }

        // Total clients pour ces boutiques
        // Ici on considère "clients" comme les utilisateurs qui ont fait des commandes (Invoice) pour ces shops
        const clients = await Invoice.distinct('user_id', { 
            createdAt: { $gte: startDate, $lte: endDate },
            state: 5, // factures payées
            product_id: { $in: await Product.find({ shop_id: { $in: shopIds } }).distinct('_id') }
        });
        const totalClients = clients.length;

        // Total produits
        const totalProducts = await Product.countDocuments({ shop_id: { $in: shopIds } });

        // Total revenu (factures payées)
        const revenueResult = await Invoice.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    state: 5
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            { $match: { 'product.shop_id': { $in: shopIds } } },
            {
                $group: {
                    _id: null,
                    totalRevenu: { $sum: { $multiply: ['$unit_price', '$quantity'] } }
                }
            }
        ]);
        const totalRevenu = revenueResult.length > 0 ? revenueResult[0].totalRevenu : 0;

        // Total CUMP
        const cumpResult = await Product.aggregate([
            { $match: { shop_id: { $in: shopIds } } },
            { $group: { _id: null, totalCump: { $sum: '$average_cost' } } }
        ]);
        const totalCump = cumpResult.length > 0 ? cumpResult[0].totalCump : 0;

        return { totalClients, totalProducts, totalRevenu, totalCump };
    }

    async getTotalOrdersByYearForUser(userId, year) {
        // Récupérer toutes les boutiques liées à l'utilisateur
        const subscriptions = await SubscriptionShop.find({ user_id: userId, state: 1 }).select('shop_id');
        const shopIds = subscriptions.map(s => s.shop_id);

        if (shopIds.length === 0) {
            // Si pas de boutique, retourner 12 mois à 0
            return Array.from({ length: 12 }, (_, i) => ({ month: i + 1, totalOrders: 0 }));
        }

        // Filtrer les produits appartenant aux boutiques de l'utilisateur
        const productIds = await Product.find({ shop_id: { $in: shopIds } }).distinct('_id');

        // Agréger les commandes payées (state = 5) sur l'année
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31T23:59:59`);

        const ordersData = await Invoice.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    state: 5,
                    product_id: { $in: productIds } // Filtrer selon les produits des boutiques
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalOrders: { $sum: 1 }
                }
            }
        ]);

        // Initialiser 12 mois à 0
        const months = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            totalOrders: 0
        }));

        // Injecter les vraies valeurs
        ordersData.forEach(item => {
            const index = item._id - 1;
            months[index].totalOrders = item.totalOrders;
        });

        return months;
    }
}

module.exports = new DashboardService();