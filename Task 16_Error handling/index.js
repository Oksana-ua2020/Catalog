const a = 10;
const b = 'jjjjj';
let result;

class NumericalDataError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NumericalDataError'
    }
}

function summa(a, b) {

    const position = typeof a !== "number" ? a 
        : typeof b !== "number" ? b 
        : false;

    if (position) throw new NumericalDataError(`${position} not a number`);

    return a + b;
}

try {
    result = summa(a, b);
} catch (err) {
    result = 'Attantion! Incorrect data.';
    console.error(err);
}

console.log(result);