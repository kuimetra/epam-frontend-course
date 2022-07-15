const getBigestNumber = require('../src/get-bigest-number');

describe('getBigestNumber', () => {
    it('should throw error if at least one argument’s type is not a number', () => {
        expect(() => getBigestNumber(1, 2, 3, '4')).toThrowError('Wrong argument type');
    });

    it('should throw error if arguments length < 2', () => {
        expect(() => getBigestNumber(1)).toThrowError('Not enough arguments');
    });

    it('should throw error if arguments length > 10', () => {
        expect(() => getBigestNumber(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)).toThrowError('Too many arguments');
    });

    it('should return biggest number', () => {
        expect(getBigestNumber(1, 10, 2, 3, 4)).toBe(10);
    });
});
