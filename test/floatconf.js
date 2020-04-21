var assert = require('assert');
const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');
const vscp = require("../src/vscp.js");

describe('Javascript floating point', function() {

    it('should return 3.14159 as number.', function() {
        var b1 = Buffer.alloc(4);
        b1.fill(0);
        b1.writeFloatBE(3.14159,0);
        assert.equal(vscp.toFixed(b1.readFloatBE(0),5), 3.14159);
    });

    it('should return 3.14159 as number.', function() {
        var b2 = Buffer.alloc(8);
        b2.fill(0);
        b2.writeDoubleBE(3.14159,0);
        console.log("Double",b2.readDoubleBE(0));
        assert.equal(b2.readDoubleBE(0), 3.14159);
    });

    it('should return true as buffer.', function() {
        var b2 = Buffer.alloc(8);
        b2.fill(0);
        b2.writeDoubleBE(3.14159,0);
        assert.equal(Buffer.isBuffer(b2), true);
    });

    it('should return true as buffer.', function() {
        var testArray = [1,2,3,4,5,6];
        testArray = Buffer.from(testArray); 
        assert.equal(Buffer.isBuffer(testArray), true);
    });

});

var testArray = [1,2,3,4,5,6];
testArray = Buffer.from(testArray);
if ( !Buffer.isBuffer(testArray) ) {
    throw(new Error("Parameter error: 'data' should be a numeric buffer."))
}

console.log(testArray[1],testArray[6],testArray.length);