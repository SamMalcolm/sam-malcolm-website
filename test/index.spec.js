const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

describe('index page', () => {
    it('should be alive', () => {
        expect(200).to.equal(200);
    })
})