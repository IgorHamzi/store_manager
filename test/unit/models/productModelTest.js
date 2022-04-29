const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');

describe('Retorna todos os produtos do BD', () => {

  describe('quando é retornado com sucesso', () => {
    before(async () => {
      const expectedResult = [[ { id: 1, name: 'Martelo do thor', quantity: 10 }, { id: 2, name: 'Traje de encolhimento', quantity: 20 } ]];
  
      sinon.stub(connection, 'execute').resolves(expectedResult);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await ProductsModel.getAll();

      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
    });

    it('o elemento do array possui todas as propriedades', async () => {
      const response = await ProductsModel.getAll();

      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
    });

  });
});

describe('Retorna um produto do BD', () => {

  describe('quando é retornado com sucesso', () => {
    const id = 1;
    
    before(async () => {
      const expectedResult = [[ { id: 1, name: 'Martelo do thor', quantity: 10 } ]];
  
      sinon.stub(connection, 'execute').resolves(expectedResult);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsModel.getById(id);

      expect(response.length).not.to.be.equal(undefined);
      expect(response[0]).to.be.a('object');
    });

    it('o elemento possui todas as propriedades', async () => {
      const response = await ProductsModel.getById(id);

      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
    });

  });
});