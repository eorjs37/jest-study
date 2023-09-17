# jest

## 테스트 커버리지
> 실제코드가 얼만큼 테스트 되고 있는지 것에 대한 지표

### 구문(Stmts) 커버리지
> 실제코드를 테스트했을때의 명령문이 실행된 비율  
계산 :  **(실행된명령문/전체명령문) x 100**


```javascript
//statement.js
function test(n) {
    if (n > 0) {
        console.log("success")
    }
}
module.exports = {
    stament: test
}
```
#### 테스트 코드

```javascript
//statement.test.js
const { stament } = require('../../statement')
describe('Name of the group', () => {
    test('testing1', () => {
        expect(stament(-1)).toBe(undefined)
    });
});
```
> 위와 같이 실행하였을 때 아래표 처럼 나온다  
인자에 -1을 대입하였기 때문에, Stmts와,Lines가 80%가 나오며, 4번째 라인은 테스트가 되지 않았다.

File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------|---------|----------|---------|---------|-------------------
All files     |      80 |       50 |     100 |      80 |                   
 statement.js |       <span style="color:red;font-weight:bold">80</span> |       50 |     100 |      <span style="color:red;font-weight:bold">80</span> | 4                 



### 분기(Branches)

### 줄(Lines)


## mock 함수
mock에서는 다양한 함수를 제공한다. 가짜로 return해주거나, 즉시 함수 가짜로 구현하여 실행해준다.
### mockReturnValue
> 가짜 함수를 만들어 값을 return 해주고 싶을때 사용된다.  
object도 return이 가능하다.
```javascript
 test('mock Rerturn value', () => {
        const mock = jest.fn();
        mock.mockReturnValue(42);
        const returnValue = mock();
        console.log(returnValue) //42가 찍힌다.
    });
```

### mockReturnValueOnce
> 가짜 함수의 리턴값을 한번만 호출하고 끝내고 싶을때 사용된다.  

```javascript
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
        console.log(result4) //42 => mockReturnValue를 먼저 선언하여도 mockReturnValueOnce가 존재할 경우 mockReturnValueOnce호출된것들이 다 끝나야 mockReturnValue이 호출된다.
    });
```
### mockResolvedValue
> 비동기 처리를 하기 위해 사용되는 함수이며 인자에 return 되는 값을 넣어준다.  
다만 사용할때 async/await 가 필요하다.

```javascript
test('mockResolvedValue testing ', async () => {
        const asyncMock = jest.fn().mockResolvedValue(43);
        const returnValue1 = await asyncMock();
        console.log("returnValue1 : ", returnValue1)
    });
```

### mockResolvedValue
> 비동기 처리를 하기 위해 사용되는 함수이며 한번만 호출된다. mockResolvedValue와 같이 return되는 값을 인자에 넣어준다.  
다만 사용할때 async/await 가 필요하다.

```javascript
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
        console.log("result 3 : ", result3)  // 43 mockResolvedValueOnce에 값이 존재 하지 않을 경우 마지막으로 호출된다.
    });
```

### mockImplementation
> 함수를 가짜로 만들고 싶을때 사용한다.
```javascript
test('mockImplementation testing ', async () => {
        //mockImplementation를 통해 인자 X 2 를 return해주는 함수를 만든다.
        const fn = jest.fn().mockImplementation(val => val * 2);

        const result = fn(3);
        console.log("fn result : ", result); //6
    });
```

### mockImplementationOnce
> 함수를 가짜로 만들고 한번만 호출하고 싶을때 사용한다.
```javascript
const onceFn = jest.fn()
            .mockImplementation(cb => cb(null, 2))
            .mockImplementationOnce(cb => cb(null, true))
            .mockImplementationOnce(cb => cb(null, false));

        onceFn((err, val) => console.log("onceFn1 : ", val)) //true
        onceFn((err, val) => console.log("onceFn2 : ", val)) //false 
        onceFn((err, val) => console.log("onceFn3 : ", val)) //2를 호출하며, 다만 mockImplementationOnce를 다 호출하였을 때 mockImplementation를 호출한다.

```

### mockRejectedValue
> 비동기 함수에서 reject를 리턴할때 사용된다.
```javascript
test('mockRejectedValue testing ', async () => {
        const asyncMock = jest
            .fn()
            .mockRejectedValue(new Error("error"));
        try {
            const result = await asyncMock(); // throws 'Async error message'    
            console.log("error result : ", result)
        } catch (error) {
            console.log("error : ", error)
        }
    });
```

### mockRejectedValueOnce
> 비동기 함수에서 reject를 리턴할때 사용되며, 한번 호출하고 종료가 된다.

```javascript
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
```

### mockClear 
> mockFn.mock.calls, mockFn.mock.instances, mockFn.mock.contexts and mockFn.mock.results 를 다 비워준다.

```javascript
let mockFnClear;
    beforeEach(() => {
        mockFnClear = jest.fn().mockImplementation(val => val * 2)
    });
   test("mock clear Fn call", async () => {
        await mockFnClear(3);
    }) 
afterAll(() => {
        //mock의 calls,instances,contexts 프로퍼티들의 값들이 존재한다.
        console.log(mockFnClear.mock);
        console.log("afterEach");
        //mockClear 호출
        mockFnClear.mockClear();
        //mock의 calls,instances,contexts 프로퍼티들의 값들을 비운다.
        console.log(mockFnClear.mock)
    });
```
