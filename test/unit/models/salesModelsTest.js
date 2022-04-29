const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');

describe('Retorna todas as vendas do BD', () => {
  before(async () => {
    const expectedResult = [[ { id: 1, date: '2021-09-09 00:45:23' }, { id: 2, date: '2021-09-09 00:45:23' } ]];

    sinon.stub(connection, 'execute').resolves(expectedResult); 
  });

  after(async () => {
    connection.execute.restore();
  });


  describe('quando é retornado com sucesso', () => {

    it('retorna um array de objetos', async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
    });

    it('o elemento do array possui todas as propriedades', async () => {
      const response = await SalesModel.getAll();

      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('date');
    });

  });
});

describe('Retorna uma venda do BD', () => {

  describe('quando é retornado com sucesso', () => {
    const id = 1;
    
    before(async () => {
      const expectedResult = [[ { id: 1, date: '2021-09-09 00:45:23' } ]];
  
  
      sinon.stub(connection, 'execute').resolves(expectedResult);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesModel.getById(id);

      expect(response.length).not.to.be.equal(undefined);
      expect(response[0]).to.be.a('object');
    });

    it('o elemento possui todas as propriedades', async () => {
      const response = await SalesModel.getById(id);
      
      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('date');
    });

  });
});