//Bai 01
export function productInfo(name, price) {
    return `San pham: ${name} - Gia: ${price}`
}

//Bai 02
export function greet(name) {
    return `Xin chao ${name}`
}

//Bai 03
export function sumUpTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i; // sum = sum + i
    }
    return sum;
}

//Bai 04
export function square(n){
    return n * n; // n^2
}

//Bai 05
export function isEven(n){
    return n%2 === 0;
}

//Bai 06
export function firstElement(arr){
    return arr[0];
}

//Bai 09
export function getNames(people){
    const names = people.map(people => people.name);

    return names.join(', ');
}