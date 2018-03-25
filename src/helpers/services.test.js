const sinon = require('sinon')
require('chai').should();
const services = require('./services');

describe('Services Helper', () => {

    this.testFrame = (spyingMethodName, testingMethodName) => {
        const externalAPI = {};
        externalAPI[spyingMethodName] = sinon.spy();    
        const crudOperations = services.crudOperations(externalAPI);
        crudOperations[testingMethodName]();
        return externalAPI;
    }

    it('should execute findAll with external library call', () => {
        this.testFrame('find', 'findAll').find.called.should.be.true;
    });

    it('should execute find with external library call', () => {
        this.testFrame('find', 'find').find.called.should.be.true;
    });

    it('should execute findOne with external library call', () => {
        this.testFrame('findOne', 'findOne').findOne.called.should.be.true;
    });
    
    it('should execute findById with external library call', () => {
        this.testFrame('findById', 'findById').findById.called.should.be.true;
    });
    
    it('should execute remove with external library call', () => {
        this.testFrame('remove', 'remove').remove.called.should.be.true;
    });
    
    it('should execute create with external library call', () => {
        this.testFrame('create', 'create').create.called.should.be.true;
    });
    
    it('should execute update with external library call', () => {
        this.testFrame('findByIdAndUpdate', 'update').findByIdAndUpdate.called.should.be.true;
    });
    
    it('should return an empty object when doesn\'t receive an argument', () => {
        services.crudOperations().should.be.an('object').which.is.empty;
    });
        
});