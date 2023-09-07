const condition = require('../../condition')
describe('condition test', () => {
    test('testing', () => {
        expect(condition(-1, -1)).toBe(1)
    });

});