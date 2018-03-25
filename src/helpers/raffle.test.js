require('chai').should();
const raffle = require('./raffle');

describe('Raffle Helper', () => {

    it('shouldn\'t break without arguments', () => {
        
        raffle.raffleElements().should.be.an('array').with.lengthOf(0);
        
    });

    it('should return a specific amount of arguments', () => {

        const ids = ['123456', '654321'];
        const raffleAmount = 5;
        raffle.raffleElements(ids, raffleAmount).should.be.an('array').with.lengthOf(ids.length);
        
    });

    it('should return a not sorted list', () => {

        const ids = ['13524', '46575', '141654', '2465462', '25421354', '5456533', '465762465',
            '4462312', '132465', '13542222', '1354321', '13541321', '135432132', '241546543', 
            '43543543', '13216241', '2416354165', '7984652165', '654654132', '154654321',
            '21546313', '21213213', '1321321', '354132163', '35354654', '4684651', '43541321'].sort();
        const raffleAmount = 100;
        const raffledList = raffle.raffleElements(ids, raffleAmount);
        
        raffledList.should.be.an('array').with.lengthOf(ids.length).that.have.members(ids);
        raffledList.toString().should.not.be.equal(ids.toString());
        raffledList.toString().should.not.be.equal(ids.reverse().toString());
        
    });

});