require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const { validateName } = require('./middlewares/validateName');
const { validateQuantity } = require('./middlewares/validateQuantity');
const { validateProductId } = require('./middlewares/validateProductId');
const { validateProductQuantity } = require('./middlewares/validateProductQuantity');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', productsController.getById);
app.get('/products', productsController.getAll);
app.post('/products', validateName, validateQuantity, productsController.createProduct);
app.put('/products/:id', validateName, validateQuantity, productsController.updateProduct);
app.delete('/products/:id', productsController.deleteProduct);

app.get('/sales/:id', salesController.getById);
app.get('/sales', salesController.getAll);
app.post('/sales', validateProductId, validateProductQuantity, salesController.createSale);
app.put('/sales/:id', validateProductId, validateProductQuantity, salesController.updateSale);
app.delete('/sales/:id', salesController.deleteSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
