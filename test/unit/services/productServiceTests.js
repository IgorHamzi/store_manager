const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const productsService = require('../../../services/productsService');

describe('Retorna todos os produtos do BD', () => {
  describe('quando é retornado com sucesso', () => {
    before(async () => {
      const expectedResult = [[ { id: 1, name: 'Martelo do thor', quantity: 10 }, { id: 2, name: 'Traje de encolhimento', quantity: 20 } ]];
  
      sinon.stub(ProductsModel, 'getAll').resolves(expectedResult);
    });
  
    after(async () => {
      ProductsModel.getAll.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.a('array');
      expect(response[0][0]).to.be.a('object');
    });

    it('o elemento do array possui todas as propriedades', async () => {
      const response = await productsService.getAll();

      expect(response[0][0]).to.have.a.property('id');
      expect(response[0][0]).to.have.a.property('name');
      expect(response[0][0]).to.have.a.property('quantity');
    });

  });
});

describe('Retorna um produto do BD', () => {
  describe('quando é retornado com sucesso', () => {
    const id = 1;

    before(async () => {
      const expectedResult = [{ id: 1, name: 'Martelo do thor', quantity: 10 }];
  
      sinon.stub(ProductsModel, 'getById').resolves(expectedResult);
    });
  
    after(async () => {
      ProductsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.getById(id);

      expect(response).not.to.be.equal(undefined);
      expect(response).to.be.a('object');
    });

    it('o elemento possui todas as propriedades', async () => {
      const response = await productsService.getById(id);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

  });
});

describe('Cria uma produto no BD', () => {
  describe('quando é retornado com sucesso', () => {

    before(async () => {
      const expectedResult = [ { id: 1, name: 'Martelo do thor', quantity: 10 }, { id: 2, name: 'Traje de encolhimento', quantity: 20 } ];
      const returnUndefined = undefined;
  
      sinon.stub(ProductsModel, 'getAll').resolves(expectedResult);
      sinon.stub(ProductsModel, 'createProduct').resolves(returnUndefined);
    });
  
    after(async () => {
      ProductsModel.getAll.restore();
      ProductsModel.createProduct.restore();
    });

    it('retorna um objeto', async () => {
      const name = "Capa do Batman";
      const quantity = 25;

      const response = await productsService.createProduct(name, quantity);

      expect(response).not.to.be.equal(undefined);
      expect(response).to.be.a('object');
    });

    it('o elemento possui todas as propriedades', async () => {
      const name = "Capa do Batman";
      const quantity = 25;

      const response = await productsService.createProduct(name, quantity);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });

  describe('quando o produto já existe no BD', () => {

    before(async () => {
      const expectedResult = [ { id: 1, name: 'Martelo do thor', quantity: 10 }, { id: 2, name: 'Traje de encolhimento', quantity: 20 } ];
      const returnUndefined = undefined;
  
      sinon.stub(ProductsModel, 'getAll').resolves(expectedResult);
      sinon.stub(ProductsModel, 'createProduct').resolves(returnUndefined);
    });
  
    after(async () => {
      ProductsModel.getAll.restore();
      ProductsModel.createProduct.restore();
    });
    
    it('retorna um objeto', async () => {
      const name = "Martelo do thor";
      const quantity = 25;

      const response = await productsService.createProduct(name, quantity);

      expect(response).not.to.be.equal(undefined);
      expect(response).to.be.equal(false);
    });
  });
});