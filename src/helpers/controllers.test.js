require('chai').should();
const controllers = require('./controllers');
const server = require('./server');

function ResponseTest() {

    this.status = 0;
    this.body = {};

    return {

        status(status) {
            this.status = status;
            return this;
        },

        json(body) {
            this.body = body;
            return this;
        },

        result() {
            return {
                status: this.status,
                body: this.body
            }
        }
    }

}

describe('Controllers Helper', () => {

    it('should return a promise', () => {

        const promisse = async (params) => undefined;
        const handler = controllers.handler(promisse);
        const response = ResponseTest();
        handler(undefined, response, undefined).should.be.a('promise');

    });

    it('shouldn\'t break without params', () => {

        const promisse = async () => undefined;
        const handler = controllers.handler(promisse);
        const response = ResponseTest();
        handler(undefined, response, undefined).then((result) =>
            result.result().body.should.be.an('object').and.include({ message: 'OK' })
        );

    });

    it('should pass the result', () => {

        const promisse = async () => { return { message: 'Result' } };
        const handler = controllers.handler(promisse);
        const response = ResponseTest();
        handler(undefined, response, undefined).then((result) =>
            result.result().body.should.be.an('object').and.include({ message: 'Result' })
        );

    });

    it('should deal with errors', () => {

        const promisse = async (params) => { throw new server.ServerError('Message', 500) };
        const handler = controllers.handler(promisse);
        const response = ResponseTest();
        handler(undefined, response, undefined).then((result) => {
            const resultObject = result.result();
            resultObject.status.should.be.deep.equals(500);
            resultObject.body.should.be.an('object').and.include({ error: 'Message' } );
        });

    });
 
});