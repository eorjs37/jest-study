describe('mock function testing', () => {
    let mockFnClear;
    beforeEach(() => {
        mockFnClear = jest.fn().mockImplementation(val => val * 2)
    });
    test('mock Rerturn value', () => {
        const mock = jest.fn();
        mock.mockReturnValue(42);
        const returnValue = mock();
        console.log(returnValue)

        mock.mockReturnValue({ a: 1 });
        const returnValue2 = mock();
        console.log(returnValue2)
    });

    test('mockReturnValueOnce testing ', () => {
        const mockOnce = jest.fn();
        mockOnce
            .mockReturnValue(42)
            .mockReturnValueOnce("1")
            .mockReturnValueOnce("2")
            .mockReturnValueOnce("3");
        const result1 = mockOnce();
        const result2 = mockOnce();
        const result3 = mockOnce();
        const result4 = mockOnce();
        console.log(result1) //1
        console.log(result2) //2
        console.log(result3) //3
        console.log(result4) //42
    });

    test('mockResolvedValue testing ', async () => {
        const asyncMock = jest.fn().mockResolvedValue(43);
        const returnValue1 = await asyncMock();
        console.log("returnValue1 : ", returnValue1)
    });

    test('mockResolvedValueOnce testing ', async () => {
        const asyncMock =
            jest.fn()
                .mockResolvedValue(43)
                .mockResolvedValueOnce('first call')
                .mockResolvedValueOnce('second call');
        const result1 = await asyncMock();
        const result2 = await asyncMock();
        const result3 = await asyncMock();

        console.log("result 1 : ", result1) // first call
        console.log("result 2 : ", result2)  // second call
        console.log("result 3 : ", result3)  // 43
    });


    test('mockImplementation testing ', async () => {
        const fn = jest.fn().mockImplementation(val => val * 2);

        const result = fn(3);
        console.log("fn result : ", result)
    });

    test('mockImplementationOnce testing ', async () => {
        const onceFn = jest.fn()
            .mockImplementation(cb => cb(null, 2))
            .mockImplementationOnce(cb => cb(null, true))
            .mockImplementationOnce(cb => cb(null, false));

        onceFn((err, val) => console.log("onceFn1 : ", val))
        onceFn((err, val) => console.log("onceFn2 : ", val))
        onceFn((err, val) => console.log("onceFn3 : ", val))
    });

    test('mockRejectedValue testing ', async () => {
        const asyncMock = jest
            .fn()
            .mockRejectedValue(new Error("error"));
        try {
            const result = await asyncMock(); // throws 'Async error message'    
            console.log("error result : ", result)
        } catch (error) {
            // console.log("error : ", error)
        }

    });

    test('mockRejectedValueOnce testing ', async () => {
        const asyncMock = jest
            .fn()
            .mockResolvedValueOnce('first call')
            .mockRejectedValueOnce(new Error('Async error message'));
        try {
            const result = await asyncMock(); // throws 'Async error message'    
            console.log("error result : ", result)
            await asyncMock(); // throws 'Async error message'
        } catch (error) {
            // console.log("error : ", error)
        }
    });

    test("mock clear Fn call", async () => {
        await mockFnClear(3);
    })

    afterAll(() => {
        console.log(mockFnClear.mock)
        console.log("afterEach");
        mockFnClear.mockClear();
        console.log(mockFnClear.mock)
    });
});