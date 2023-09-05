const anyevent = require('../../anyevent');

const mockCallBack = jest.fn(param => {
    // const copy = Object.assign({}, param);
    // param['idx'] = param['idx'] + 1;
    return {
        idx: param['idx'] + 1
    }
})

test('should ', async () => {
    anyevent('event1', { idx: 1 }, mockCallBack);

    //call 횟수
    expect(mockCallBack.mock.calls).toHaveLength(1);
    //첫번째 전달된 인자 확인
    expect(mockCallBack.mock.calls[0][0]).toEqual({ idx: 1 });

    //결과 확인
    expect(mockCallBack.mock.results[0].value).toEqual({
        idx: 2
    });

    mockCallBack.mockClear();
});

test('mock return values', async () => {
    const myMock = jest.fn();

    myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

    expect(myMock()).toBe(10);
    expect(myMock()).toBe('x');
    expect(myMock()).toBe(true);

    myMock.mockClear();
});

test("filterTest fn", () => {
    const filterTestFn = jest.fn();
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

    const result = [11, 12].filter(num => filterTestFn(num));

    expect(result).toEqual([11]);

    expect(filterTestFn.mock.calls[0][0]).toBe(11);
    expect(filterTestFn.mock.calls[1][0]).toBe(12);
});
