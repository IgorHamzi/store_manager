const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Ao chamar o controller de getAll', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      const expectedResult = [[ { id: 1, date: '2021-09-09 00:45:23' }, { id: 2, date: '2021-09-09 00:45:23' } ]];
  
      sinon.stub(salesService, 'getAll').resolves(expectedResult);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
      await salesController.getAll(request, response);
      const expectedResult = [[ { id: 1, date: '2021-09-09 00:45:23' }, { id: 2, date: '2021-09-09 00:45:23' } ]];

      expect(response.send.calledWith(expectedResult)).to.be.equal(true);
    });

  });
});

describe('Ao chamar o controller de getById', () => {
  describe('quando o id informado é válido', () => {
    const response = {};
    const request = {};
  
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
  
      request.params = {
        id: 1
      }
  
      const expectedResult = [
        { date: '2022-04-17T13:21:47.000Z', productId: 1, quantity: 5 },
        { date: '2022-04-17T13:21:47.000Z', productId: 2, quantity: 10 }
      ];
  
      sinon.stub(salesService, 'getById').resolves(expectedResult);
    });
  
    after(() => {
      salesService.getById.restore();
    });
  
    it('é chamado o status com o código 200', async () => {
      await salesController.getById(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o send retornando o produto', async () => {
      await salesController.getById(request, response);
      const expectedResult = [
        { date: '2022-04-17T13:21:47.000Z', productId: 1, quantity: 5 },
        { date: '2022-04-17T13:21:47.000Z', productId: 2, quantity: 10 }
      ];
  
      expect(response.send.calledWith(expectedResult)).to.be.equal(true);
    });
  
  });
  
  describe('quando o id informado não é válido', () => {
    const response = {};
    const request = {};
  
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
  
      request.params = {
        id: undefined,
      }
  
      const expectedResult = [];
  
      sinon.stub(salesService, 'getById').resolves(expectedResult);
    });
  
    after(() => {
      salesService.getById.restore();
    });
  
    it('é chamado o status com o código 404', async () => {
      await salesController.getById(request, response);
  
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  
    it('é chamado o send com a mensagem "Sale not found"', async () => {
      await salesController.getById(request, response);
      const expectedResult = { message: 'Sale not found' };
  
  
      expect(response.send.calledWith(expectedResult)).to.be.equal(true);
    });
  
  });
});

describe('Ao chamar o controller de createSale', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      
      request.body =
        [
          {
            productId: 1,
            quantity: 3,
          },
        ];

      const expectedResult = { id: 3, itemsSold: [ { productId: 1, quantity: 3 } ] };
  
      sinon.stub(salesService, 'createSale').resolves(expectedResult);
    });

    after(() => {
      salesService.createSale.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await salesController.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o send retornando a sale', async () => {
      await salesController.createSale(request, response);
      const expectedResult = { id: 3, itemsSold: [ { productId: 1, quantity: 3 } ] };

      expect(response.send.calledWith(expectedResult)).to.be.equal(true);
    });

  });
});