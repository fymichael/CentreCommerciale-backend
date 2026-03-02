const subscriptionShopService = require('../services/subscriptionShop.service');

exports.createSubscription = async (req, res) => {
  try {
    const subscriptionShop = await subscriptionShopService.create(req.body);
    res.status(201).json(subscriptionShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptionShops = await subscriptionShopService.findAllWithFilters(req.user, req.query);
    res.json(subscriptionShops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await subscriptionShopService.findById(req.params.id);
    if (!subscription)
      return res.status(404).json({ message: 'Abonnement introuvable' });

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const role = await subscriptionShopService.update(req.params.id, req.body);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubscriptionState = async (req, res) => {
  try {
    const { state } = req.body;

    const subscription = await subscriptionShopService.updateState(req.params.id, state);

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    await subscriptionShopService.delete(req.params.id);
    res.json({ message: 'Abonnement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMySubscriptions = async (req, res) => {
  try {
     const userId = req.user.id;

      const result = await subscriptionShopService.findByUserId(
        userId,
        req.query
      );

    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({
        message: "Erreur lors de la récupération des abonnements",
        error: error.message
      });
    }
};