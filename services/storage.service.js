const Storage = require('../models/Storage');
const Product = require('../models/Product');

class StorageService {

    async addEntry(productId, quantity, unitCost) {

        const product = await Product.findById(productId);
        if (!product) throw new Error('Produit introuvable');

        const oldStock = product.stock_quantity;
        const oldCump = product.average_cost;

        const newStock = oldStock + quantity;

        const newCump =
        ((oldStock * oldCump) + (quantity * unitCost)) / newStock;

        const newStockValue = newStock * newCump;

        // Mise à jour produit
        product.stock_quantity = newStock;
        product.average_cost = newCump;
        product.stock_value = newStockValue;

        await product.save();

        return await Storage.create({
            product_id: productId,
            type: 'IN',
            quantity,
            unit_cost: unitCost,
            total_cost: quantity * unitCost
        });
    }

    async addExit(productId, quantity) {

        const product = await Product.findById(productId);
        if (!product) throw new Error('Produit introuvable');

        if (product.stock_quantity < quantity)
        throw new Error('Stock insuffisant');

        const newStock = product.stock_quantity - quantity;

        product.stock_quantity = newStock;
        product.stock_value = newStock * product.average_cost;

        await product.save();

        return await Storage.create({
        product_id: productId,
        type: 'OUT',
        quantity,
        unit_cost: product.average_cost,
        total_cost: quantity * product.average_cost
        });
    }

    async getStockState() {
        return await Product.find()
            .populate('shop_id')
            .lean();
    }
}

module.exports = new StorageService();