const SubscriptionShop = require('../models/SubscriptionShop');
const ShopService = require('../services/shop.service');
const UserService = require('../services/user.service');

class SubscriptionShopService {

    
    async generateReference() {

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const datePart = `${year}${month}${day}`;

        // Compter combien d'abonnements ont été créés aujourd'hui
        const startOfDay = new Date(year, today.getMonth(), today.getDate());
        const endOfDay = new Date(year, today.getMonth(), today.getDate() + 1);

        const count = await SubscriptionShop.countDocuments({
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        const sequence = String(count + 1).padStart(4, '0');

        return `SUB-${datePart}-${sequence}`;
    }

    async create(data) {

        const shop = await ShopService.findById(data.shop_id);
        if (!shop) {
            throw new Error("Boutique introuvable");
        }

        const user = await UserService.findById(data.user_id);
        if (!user) {
            throw new Error("utilisateur introuvable");
        }
        if(user.state != 5) {
            throw new Error("Utilisateur non validé");
        }
        
        let reference = data.reference;

        if (!reference || reference.trim() === "") {
            reference = await this.generateReference();
        }

        const subscriptionData = {
            reference,
            shop_id: data.shop_id,
            user_id: data.user_id,
            price: shop.price_in_month,
            state: data.state || "pending"
        };

        return await SubscriptionShop.create(subscriptionData);
    }

    async findAllWithFilters(user, queryParams) {
        const {
            search,
            shop,
            state,
            createdFrom,
            createdTo,
            page = 1,
            limit = 10
        } = queryParams;

        const filter = {};

        if (user.role !== "Admin mall") {
            filter.user_id = user.id;
        }

        if (search) {
            filter.$or = [
                { reference: { $regex: search, $options: 'i' } }
            ];
        }

        if (shop) {
            filter.shop_id = shop;
        }

        if (state !== undefined && state !== '') {
            filter.state = Number(state);
        }

        if (createdFrom || createdTo) {
            filter.createdAt = {};
        if (createdFrom) filter.createdAt.$gte = new Date(createdFrom);
        if (createdTo) filter.createdAt.$lte = new Date(createdTo);
        }

        const skip = (page - 1) * limit;

        const [subscriptionShops, total] = await Promise.all([
        SubscriptionShop.find(filter)
            .populate('shop_id')
            .populate('user_id')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        SubscriptionShop.countDocuments(filter)
        ]);

        return {
            data: subscriptionShops,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        };
    }

    async findById(id) {
        return await SubscriptionShop.findById(id)
                                    .populate('user_id')
                                    .populate('shop_id');
    }
  
    async update(id, data) {
        const subscriptionShop = await SubscriptionShop.findById(id);

        if (!subscriptionShop) {
            throw new Error("Boutique introuvable");
        }

        const shop = await ShopService.findById(data.shop_id);
        if (!shop) throw new Error("Boutique introuvable");

        if(data.state == -1) {
            shop.state = 0;
        } else {
            shop.state = data.state;
        }

        await shop.save();
        return await SubscriptionShop.findByIdAndUpdate(id, data, { new: true });
    }

    async updateState(id, newState) {
        const subscriptionShop = await SubscriptionShop.findById(id);
        if (!subscriptionShop) throw new Error("Abonnement boutique introuvable");
        const shop = await Shop.findById(subscriptionShop.shop_id);
        if (!shop) throw new Error("Boutique introuvable");

        subscriptionShop.state = newState;
        if(newState == -1) {
            shop.state = 0;
        } else {
            shop.state = newState;
        }

        await subscriptionShop.save();
        await shop.save();

        return subscriptionShop;
    }

    async delete(id) {
        return await SubscriptionShop.findByIdAndDelete(id);
    }

    async findByUserId(userId, queryParams = {}) {
        const {
            page = 1,
            limit = 10
        } = queryParams;

        const filter = {
            user_id: userId
        };

        const skip = (page - 1) * limit;

        const [subscriptions, total] = await Promise.all([
            SubscriptionShop.find(filter)
                .populate('shop_id')
                .populate('user_id')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),

            SubscriptionShop.countDocuments(filter)
        ]);

        return {
            data: subscriptions,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        };
    }
}

module.exports = new SubscriptionShopService();
