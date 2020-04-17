var assert = require('assert');
const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');
const vscp = require("../src/vscp.js");

describe('VSCP Measurements', function() {

    describe('vscp.toFixed(value, precision)', function() {

        it('Decimal number should return 1.23', function() {
            assert.equal(vscp.toFixed(1.23456,2), 1.23);
        });

    });

    describe('vscp.varInt2BigInt(data)', function() {

        it('Decimal number should return 11', function() {
            var data = [11];
            assert.equal(vscp.varInt2BigInt(data), 11n);
        });

        it('Decimal number should return -1', function() {
            var data = [255];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

        it('Decimal number should return 28927', function() {
            var data = [0x70,0xff];
            assert.equal(vscp.varInt2BigInt(data), 28927n);
        });

        it('Decimal number should return -1', function() {
            var data = [0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

        it('Decimal number should return 8388607', function() {
            var data = [0x7f,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), 8388607n);
        });

        it('Decimal number should return -1', function() {
            var data = [0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

        it('Decimal number should return 0x7fffffff', function() {
            var data = [0x7f,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), 0x7fffffffn);
        });

        it('Decimal number should return -1', function() {
            var data = [0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

        it('Decimal number should return 0x7fffffffff', function() {
            var data = [0x7f,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), 0x7fffffffffn);
        });

        it('Decimal number should return -1', function() {
            var data = [0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

        it('Decimal number should return 0x7fffffffff', function() {
            var data = [0x7f,0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), 0x7fffffffffffn);
        });

        it('Decimal number should return -1', function() {
            var data = [0xff,0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

        it('Decimal number should return 0x7fffffffffff', function() {
            var data = [0x7f,0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), 0x7fffffffffffn);
        });

        it('Decimal number should return -1', function() {
            var data = [0xff,0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

        it('Decimal number should return 0x7fffffffffff', function() {
            var data = [0x7f,0xff,0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), 0x7fffffffffffffn);
        });

        it('Decimal number should return -1', function() {
            var data = [0xff,0xff,0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

        it('Decimal number should return 0x7fffffffffffff', function() {
            var data = [0x7f,0xff,0xff,0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), 0x7fffffffffffffffn);
        });

        it('Decimal number should return -1', function() {
            var data = [0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff];
            assert.equal(vscp.varInt2BigInt(data), -1n);
        });

    });

    describe('vscp.getDataCoding(datacoding)', function() {

        it('should return 0xE0', function() {
            var datacoding = 0xff;
            assert.equal(vscp.getDataCoding(datacoding), vscp.measurementDataCoding.DATACODING_RESERVED2);
        });

        it('should return 0xC0', function() {
            var datacoding = 0xCf;
            assert.equal(vscp.getDataCoding(datacoding), vscp.measurementDataCoding.DATACODING_RESERVED1);
        });

        it('should return 0xA0', function() {
            var datacoding = 0xAF;
            assert.equal(vscp.getDataCoding(datacoding), vscp.measurementDataCoding.DATACODING_SINGLE);
        });

        it('should return 0x80', function() {
            var datacoding = 0x8F;
            assert.equal(vscp.getDataCoding(datacoding), vscp.measurementDataCoding.DATACODING_NORMALIZED);
        });

        it('should return 0x60', function() {
            var datacoding = 0x6F;
            assert.equal(vscp.getDataCoding(datacoding), vscp.measurementDataCoding.DATACODING_INTEGER);
        });

        it('should return 0x40', function() {
            var datacoding = 0x4F;
            assert.equal(vscp.getDataCoding(datacoding), vscp.measurementDataCoding.DATACODING_STRING);
        });

        it('should return 0x20', function() {
            var datacoding = 0x2F;
            assert.equal(vscp.getDataCoding(datacoding), vscp.measurementDataCoding.DATACODING_BYTE);
        });

        it('should return 0x00', function() {
            var datacoding = 0x1F;
            assert.equal(vscp.getDataCoding(datacoding), vscp.measurementDataCoding.DATACODING_BIT);
        });

    });

    describe('vscp.getUnit(unit)', function() {

        it('should return 0', function() {
            var unit = 0x00;
            assert.equal(vscp.getUnit(unit), 0);
        });

        it('should return 1', function() {
            var unit = 0x08;
            assert.equal(vscp.getUnit(unit), 1);
        });

        it('should return 2', function() {
            var unit = 0x10;
            assert.equal(vscp.getUnit(unit), 2);
        });

        it('should return 3', function() {
            var unit = 0x18;
            assert.equal(vscp.getUnit(unit), 3);
        });

    });

    describe('vscp.getSensorIndex(index)', function() {

        it('should return 0', function() {
            var index = 0x00;
            assert.equal(vscp.getSensorIndex(index), 0);
        });

        it('should return 1', function() {
            var index = 0x01;
            assert.equal(vscp.getSensorIndex(index), 1);
        });

        it('should return 2', function() {
            var index = 0x02;
            assert.equal(vscp.getSensorIndex(index), 2);
        });

        it('should return 3', function() {
            var index = 0x03;
            assert.equal(vscp.getSensorIndex(index), 3);
        });

        it('should return 4', function() {
            var index = 0x04;
            assert.equal(vscp.getSensorIndex(index), 4);
        });

        it('should return 5', function() {
            var index = 0x05;
            assert.equal(vscp.getSensorIndex(index), 5);
        });

        it('should return 6', function() {
            var index = 0x06;
            assert.equal(vscp.getSensorIndex(index), 6);
        });

        it('should return 7', function() {
            var index = 0x07;
            assert.equal(vscp.getSensorIndex(index), 7);
        });

    });

});
