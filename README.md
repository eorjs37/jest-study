# jest

## mock
> 외부의존성이 필요한 부분을 가짜로 대체  
> 이벤트가 발생할때마다, callback함수를 발동하는 함수를 생성
```javascript
// anyevent.js
let history = [];
function eventTrigger(eventname, param = {}, callback) {
    add(eventname);
    callback(param);
}

function add(eventname) {
    history.push(eventname)
}


module.exports = eventTrigger;
```

```javascript
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

```