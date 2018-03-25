require('chai').should();
const server = require('./server');

describe('Server Helper', () => {

    it('should load the arguments to the "ServerError" object', () => {
        
        new server.ServerError("Message").should.to.be.an('object').that.include({message: "Message", status: 500});
        new server.ServerError("Message", 200).should.to.be.an('object').that.include({message: "Message", status: 200});
        
    });

});