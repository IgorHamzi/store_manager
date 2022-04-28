const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Ao chamar o controller de getAll', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      const expectedResult = [[ { id: 1, name: 'Martelo do thor', quantity: 10 }, { id: 2, name: 'Traje de encolhimento', quantity: 20 } ]];
  
      sinon.stub(productsService, 'getAll').resolves(expectedResult);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
      await productsController.getAll(request, response);
      const expectedResult = [[ { id: 1, name: 'Martelo do thor', quantity: 10 }, { id: 2, name: 'Traje de encolhimento', quantity: 20 } ]];

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
  
      const expectedResult = [[ { id: 1, name: 'Martelo do thor', quantity: 10 } ]];
  
      sinon.stub(productsService, 'getById').resolves(expectedResult);
    });
  
    after(() => {
      productsService.getById.restore();
    });
  
    it('é chamado o status com o código 200', async () => {
      await productsController.getById(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o send retornando o produto', async () => {
      await productsController.getById(request, response);
      const expectedResult = [[ { id: 1, name: 'Martelo do thor', quantity: 10 } ]];
  
  
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
  
      const expectedResult = undefined;
  
      sinon.stub(productsService, 'getById').resolves(expectedResult);
    });
  
    after(() => {
      productsService.getById.restore();
    });
  
    it('é chamado o status com o código 404', async () => {
      await productsController.getById(request, response);
  
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  
    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
      await productsController.getById(request, response);
      const expectedResult = { message: 'Product not found' };
  
  
      expect(response.send.calledWith(expectedResult)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de createProduct', () => {
  describe('quando o produto informado é válido', () => {
    const response = {};
    const request = {};
  
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
  
      request.body = {
        name: "produto",
        quantity: 100
      }
  
      const expectedResult = { id: 4, name: 'produto', quantity: 100 };
  
      sinon.stub(productsService, 'createProduct').resolves(expectedResult);
    });
  
    after(() => {
      productsService.createProduct.restore();
    });
  
    it('é chamado o status com o código 201', async () => {
      await productsController.createProduct(request, response);
  
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  
    it('é chamado o send retornando o produto', async () => {
      await productsController.createProduct(request, response);
      const expectedResult = { id: 4, name: 'produto', quantity: 100 };
  
      expect(response.send.calledWith(expectedResult)).to.be.equal(true);
    });
  
  });
  
  describe('quando o produto informado é inválido', () => {
    const response = {};
    const request = {};
  
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
  
      request.body = {
        name: "produto inválido",
        quantity: 100
      }
  
      const expectedResult = false;
  
      sinon.stub(productsService, 'createProduct').resolves(expectedResult);
    });
  
    after(() => {
      productsService.createProduct.restore();
    });
  
    it('é chamado o status com o código 409', async () => {
      await productsController.createProduct(request, response);
  
      expect(response.status.calledWith(409)).to.be.equal(true);
    });
  
    it('é chamado o send retornando o produto', async () => {
      await productsController.createProduct(request, response);
      const expectedResult = { message: 'Product already exists' };
  
      expect(response.send.calledWith(expectedResult)).to.be.equal(true);
    });
  
  });
});
