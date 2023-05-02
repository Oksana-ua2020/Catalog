const arr = [100, 7, 6, 9, 11]

function callBackFunction(previousValue, currentValue) {
    return previousValue * currentValue;
}

function polyfillReduce(arr, initialValue) {
    let value;
    let index = 0;
    if (arr?.length > 0) {
        if (!initialValue) {
            value = arr[0];
            index = 1;
        } else {
            value = initialValue;
        }
        for (let i = index; i < arr.length; i++) {
            value = callBackFunction(value, arr[i]);
        }
    } else {
        value = new Error('Empty array')
    }
    return value
}

console.log(polyfillReduce(arr));
