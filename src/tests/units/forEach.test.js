const forEach = require('../../forEach');

const mockCallBack = jest.fn(x => 42 + x);

test('foreach mock function', () => {
    forEach([0, 1], mockCallBack);

    //call 횟수
    expect(mockCallBack.mock.calls).toHaveLength(2);

    //첫번째 전달된 인자 확인

    //두번째 전달된 인자 확인
});