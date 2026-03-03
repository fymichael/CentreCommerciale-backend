const invoiceService = require('../services/invoice.service');

exports.createInvoice = async (req, res) => {
  try {
    const invoice = await invoiceService.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceService.findAll();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLatestInvoice = async (req, res) => {
  try {
    const invoice = await invoiceService.getNextReference();
    if (!invoice)      return res.status(404).json({ message: 'Aucune facture trouvée' });

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await invoiceService.findById(req.params.id);
    if (!invoice)
      return res.status(404).json({ message: 'Facture introuvable' });

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoiceByUserId = async (req, res) => {
  try {
    const invoices = await invoiceService.findByIdUser(req.params.idUser);
    if (!invoices || invoices.length === 0)
      return res.status(404).json({ message: 'Commandes introuvables pour cet utilisateur' });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoiceByShopId = async (req, res) => {
  try {
    const invoices = await invoiceService.findByIdShop(req.params.idShop);
    if (!invoices || invoices.length === 0)
      return res.status(404).json({ message: 'Commandes introuvables pour cette boutique' });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await invoiceService.update(req.params.id, req.body);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    await invoiceService.delete(req.params.id);
    res.json({ message: 'Facture supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalOrdersByYear = async (req, res) => {
  try {
    const { year } = req.params;

    if (!year) {
      return res.status(400).json({
        message: "Année obligatoire"
      });
    }

    const data = await invoiceService.getTotalOrdersByYear(year);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};