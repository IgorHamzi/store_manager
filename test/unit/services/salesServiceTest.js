const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Retorna todas as sales do BD', () => {
  describe('quando é retornado com sucesso', () => {
    before(async () => {
      const expectedResult = [
        {
          saleId: 1,
          date: "2022-04-17T13:21:47.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: "2022-04-17T13:21:47.000Z",
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: "2022-04-17T13:21:47.000Z",
          productId: 3,
          quantity: 15
        }
      ];
  
      sinon.stub(SalesModel, 'getAll').resolves(expectedResult);
    });
  
    after(async () => {
      SalesModel.getAll.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
    });

    it('o elemento do array possui todas as propriedades', async () => {
      const response = await salesService.getAll();

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });
  });
});

describe('Retorna uma sale do BD', () => {
  describe('quando é retornado com sucesso', () => {
    const id = 1;

    before(async () => {
      const expectedResult = [
        {
          saleId: 1,
          date: "2022-04-17T13:21:47.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: "2022-04-17T13:21:47.000Z",
          productId: 2,
          quantity: 10
        }
      ];
  
      sinon.stub(SalesModel, 'getById').resolves(expectedResult);
    });
  
    after(async () => {
      SalesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesService.getById(id);

      expect(response).not.to.be.equal(undefined);
      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
    });

    it('o elemento possui todas as propriedades', async () => {
      const response = await salesService.getById(id);

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });
  });
});

describe('Cria uma sale no BD', () => {
  describe('quando é retornado com sucesso', () => {

    before(async () => {
      const expectedResult = [
        {
          saleId: 1,
          date: "2022-04-17T13:21:47.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: "2022-04-17T13:21:47.000Z",
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: "2022-04-17T13:21:47.000Z",
          productId: 3,
          quantity: 15
        }
      ];
      const returnUndefined = undefined;
      sinon.stub(SalesModel, 'getAllSales').resolves(expectedResult);
      sinon.stub(SalesModel, 'createSale').resolves(returnUndefined);
      sinon.stub(SalesModel, 'createSalesProducts').resolves(returnUndefined);
    });
  
    after(async () => {
      SalesModel.getAllSales.restore();
      SalesModel.createSale.restore();
      SalesModel.createSalesProducts.restore();
    });

    it('retorna um objeto', async () => {

      const arraySales = [
        {
          "productId": 1,
          "quantity": 3
        }
      ];

      const response = await salesService.createSale(arraySales);

      expect(response).not.to.be.equal(undefined);
      expect(response).to.be.a('object');
      expect(response.itemsSold).to.be.a('array');
    });

    it('o elemento possui todas as propriedades', async () => {
      const arraySales = [
        {
          "productId": 1,
          "quantity": 3
        }
      ];

      const response = await salesService.createSale(arraySales);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('itemsSold');
      expect(response.itemsSold[0]).to.have.a.property('productId');
      expect(response.itemsSold[0]).to.have.a.property('quantity');
    });
  });
});
