const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res
    .status(200)
    .send(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getById(id);

  if (sales.length < 1) {
    return res
      .status(404)
      .send({ message: 'Sale not found' });
  }

  res
    .status(200)
    .send(sales);
};

const createSale = async (req, res) => {
  const sales = await salesService.createSale(req.body);
   // if (sales === false) {
   //  res
   //    .status(422)
   //    .send({ message: "Such amount is not permitted to sell" });
   // }

  res
    .status(201)
    .send(sales);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  if (quantity <= 0) {
    return res.status(422).json({ 
    message: '"quantity" must be greater than or equal to 1', 
    });
  }
  const product = await salesService.updateSale(id, productId, quantity);

  res
    .status(200)
    .send(product);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.deleteSale(id);

  if (!sale) {
    return res.status(404).json({ 
    message: 'Sale not found', 
    });
  }

  res
    .status(204)
    .end();
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};
