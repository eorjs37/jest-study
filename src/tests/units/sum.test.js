const sum = require('../../sum');

test('adds 1 + 2 to equal 3 ', async () => {
    expect(sum(1, 2)).toBe(3);
});

