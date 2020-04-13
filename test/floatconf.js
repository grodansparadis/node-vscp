var b1 = Buffer.alloc(4);
b1.fill(0);
b1.writeFloatBE(3.14159,0);
console.log("Float",b1.readFloatBE(0));

var b2 = Buffer.alloc(8);
b2.fill(0);
b2.writeDoubleBE(3.14159,0);
console.log("Double",b2.readDoubleBE(0));

if ( !Buffer.isBuffer(b2) ) {
    throw(new Error("Parameter error: 'data' should be a numeric buffer."))
}

console.log("Length of b2 ",b2.length);

var testArray = [1,2,3,4,5,6];
testArray = Buffer.from(testArray);
if ( !Buffer.isBuffer(testArray) ) {
    throw(new Error("Parameter error: 'data' should be a numeric buffer."))
}

console.log(testArray[1],testArray[6],testArray.length);