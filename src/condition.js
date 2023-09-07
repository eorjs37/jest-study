function test2(a, b) {
    console.log("1")
    if (a > 0 && b < 0) {
        console.log("success")
    }
    console.log("3");

    bar();
    return 1
}

function bar() { }

module.exports = test2