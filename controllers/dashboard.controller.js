const dashboardService = require('../services/dashboard.service');

exports.getMallStats = async (req, res) => {
  try {
    const dashboard = await dashboardService.getMallStats();
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShopStats = async (req, res) => {
  try {
    const dashboard = await dashboardService.getShopStats();
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getYearlySubscriptionGraph = async (req, res) => {
  try {
    const revenyMonthly = await dashboardService.getYearlySubscriptionGraph(req.params.year);
    res.status(201).json(revenyMonthly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const { year } = req.params;

    if (!year) {
      return res.status(400).json({
        message: "Année obligatoire"
      });
    }

    const data = await dashboardService.getDashboard(req.user, year);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};