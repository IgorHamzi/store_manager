const validateProductId = async (req, res, next) => {
  const { productId } = req.body[0];

  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  next();
};

module.exports = {
  validateProductId,
};
