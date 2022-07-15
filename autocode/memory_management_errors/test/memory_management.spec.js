const memoryManagement = require('../src/memory_management');
const sinon = require('sinon');

const cache = memoryManagement.cache;
const tryCatchParseJSON = memoryManagement.tryCatchParseJSON;
const windowParseJSON = memoryManagement.windowParseJSON;


describe('cache function', () => {
  it('should call complex function', () => {
    const complexFunction = sinon.stub().callsFake((arg1, arg2) => {
      return arg1 + arg2;
    });
    const cachedFunction = cache(complexFunction);
    cachedFunction(1, 2);
    sinon.assert.calledWith(complexFunction, 1, 2);
    sinon.assert.calledOnce(complexFunction);
  });

  it('should not call complex function again', () => {
    const complexFunction = sinon.stub().callsFake((arg1, arg2) => {
      return arg1 + arg2;
    });
    const cachedFunction = cache(complexFunction);
    cachedFunction(1, 2);
    const ret = cachedFunction(1, 2);
    expect(ret).to.be.equal(3);
    sinon.assert.calledWith(complexFunction, 1, 2);
    sinon.assert.calledOnce(complexFunction);
  });

  it('should call complex function if arguments are different', () => {
    const complexFunction = sinon.stub().callsFake((arg1, arg2) => {
      return arg1 + arg2;
    });
    const cachedFunction = cache(complexFunction);
    const ret1 = cachedFunction(1, 2);
    expect(ret1).to.be.equal(3);
    const ret2 = cachedFunction(1, 5);
    expect(ret2).to.be.equal(6);
    sinon.assert.calledWith(complexFunction, 1, 2);
    sinon.assert.calledWith(complexFunction, 1, 5);
    sinon.assert.calledTwice(complexFunction);
  });
});


describe('tryCatchParseJSON', () => {
  it(`Should parse JSON strings`, () => {
    expect(tryCatchParseJSON('{"name": "John", "age": 30, "isAdmin": false, "courses": ["html","css","js"], "wife": null}'))
        .to.eql({'name': 'John', 'age': 30, 'isAdmin': false, 'courses': ['html', 'css', 'js'], 'wife': null});
  });
  it('Should return null if function receives incorrect JSON string', function() {
    expect(tryCatchParseJSON('{name: John, age: 30, isAdmin: false, courses: ["html","css","js"], wife: null}'))
        .to.eql(null);
  });
});

describe('windowParseJSON', () => {
  before(function() {
    this.jsdom = require('jsdom-global')();
  });
  it(`Should parse JSON strings`, () => {
    expect(windowParseJSON('{"name": "Johnny", "company": "EPAM"}'))
        .to.eql({'name': 'Johnny', 'company': 'EPAM'});
  });
  it('Should throw error if properties "name" or "company" do not exist', function() {
    expect(function() {
      windowParseJSON('{"name": "Johnny", "surname": "Bravo"}');
    }).to.throw(Error);
    expect(function() {
      windowParseJSON('{name: John, company: EPAM}');
    }).to.throw(Error);
  });
});
