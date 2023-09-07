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