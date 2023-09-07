function test(n) {
    console.log("start") //1번 구문 실행
    if (n > 0) { //2번 구문 실행
        console.log("do something") //3번 구문 실행
    }
    console.log("end") //4번 구문 실행
}

module.exports = {
    stament: test,
}