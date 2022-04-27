const idValidator = (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const quantityValidator = (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantity < 0) {
    return res.status(400).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  idValidator,
  quantityValidator,
};
