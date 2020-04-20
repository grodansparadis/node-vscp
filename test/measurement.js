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

    describe('vscp.isMeasurement(vscpClass)', function() {

        it('VSCP_CLASS1_MEASUREMENT should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT), true);
        });
        it('VSCP_CLASS1_MEASUREMENTX1 should return true', function() {            
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENTX1), true);
        });
        it('VSCP_CLASS1_MEASUREMENTX2 should return true', function() {            
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENTX2), true);
        });
        it('VSCP_CLASS1_MEASUREMENTX3 should return true', function() {    
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENTX3), true);
        });
        it('VSCP_CLASS1_MEASUREMENTX4 should return true', function() {    
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENTX4), true);
        });
        
        it('VSCP_CLASS1_MEASUREMENT64 should return true', function() {            
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT64), true);
        });
        it('VSCP_CLASS1_MEASUREMENT64X1 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT64X1), true);
        });
        it('VSCP_CLASS1_MEASUREMENT64X2 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT64X2), true);
        });
        it('VSCP_CLASS1_MEASUREMENT64X3 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT64X3), true);
        });
        it('VSCP_CLASS1_MEASUREMENT64X4 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT64X4), true);
        });

        it('VSCP_CLASS1_MEASUREZONE should return true', function() {            
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREZONE), true);
        });
        it('VSCP_CLASS1_MEASUREZONEX1 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREZONEX1), true);
        });
        it('VSCP_CLASS1_MEASUREZONEX2 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREZONEX2), true);
        });
        it('VSCP_CLASS1_MEASUREZONEX3 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREZONEX3), true);
        });
        it('VSCP_CLASS1_MEASUREZONEX4 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREZONEX4), true);
        });

        it('VSCP_CLASS1_MEASUREMENT32 should return true', function() {            
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT32), true);
        });
        it('VSCP_CLASS1_MEASUREMENT32X1 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT32X1), true);
        });
        it('VSCP_CLASS1_MEASUREMENT32X2 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT32X2), true);
        });
        it('VSCP_CLASS1_MEASUREMENT32X3 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT32X3), true);
        });
        it('VSCP_CLASS1_MEASUREMENT32X4 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_MEASUREMENT32X4), true);
        });

        it('VSCP_CLASS1_SETVALUEZONE should return true', function() {            
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_SETVALUEZONE), true);
        });
        it('VSCP_CLASS1_SETVALUEZONEX1 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_SETVALUEZONEX1), true);
        });
        it('VSCP_CLASS1_SETVALUEZONEX2 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_SETVALUEZONEX2), true);
        });
        it('VSCP_CLASS1_SETVALUEZONEX3 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_SETVALUEZONEX3), true);
        });
        it('VSCP_CLASS1_SETVALUEZONEX4 should return true', function() {
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS1_SETVALUEZONEX4), true);
        });
        
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENTX1 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENTX1), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENTX2 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENTX2), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENTX3 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENTX3), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENTX4 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENTX4), true);
        });
        
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT64 should return true', function() {            
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT64), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT64X1 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT64X1), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT64X2should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT64X2), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT64X3 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT64X3), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT64X4 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT64X4), true);
        });

        it('VSCP_CLASS2_LEVEL1_MEASUREZONE should return true', function() {    
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREZONE), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREZONEX1 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREZONEX1), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREZONEX2 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREZONEX2), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREZONEX3 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREZONEX3), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREZONEX4 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREZONEX4), true);
        });

        it('VSCP_CLASS2_LEVEL1_MEASUREMENT32 should return true', function() {    
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT32), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT32X1 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT32X1), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT32X2 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT32X2), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT32X3 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT32X3), true);
        });
        it('VSCP_CLASS2_LEVEL1_MEASUREMENT32X4 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_MEASUREMENT32X4), true);
        });

        it('VSCP_CLASS2_LEVEL1_SETVALUEZONE should return true', function() {    
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_SETVALUEZONE), true);
        });
        it('VSCP_CLASS2_LEVEL1_SETVALUEZONEX1 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_SETVALUEZONEX1), true);
        });
        it('VSCP_CLASS2_LEVEL1_SETVALUEZONEX2 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_SETVALUEZONEX2), true);
        });
        it('VSCP_CLASS2_LEVEL1_SETVALUEZONEX3 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_SETVALUEZONEX3), true);
        });
        it('VSCP_CLASS2_LEVEL1_SETVALUEZONEX4 should return true', function() {
            assert.equal(vscp.isMeasurement(512+vscp_class.VSCP_CLASS1_SETVALUEZONEX4), true);
        });

        it('VSCP_CLASS2_MEASUREMENT_STR should return true', function() {    
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS2_MEASUREMENT_STR), true);
        });

        it('VSCP_CLASS2_MEASUREMENT_FLOAT should return true', function() {    
            assert.equal(vscp.isMeasurement(vscp_class.VSCP_CLASS2_MEASUREMENT_FLOAT), true);
        });

    });

    describe('vscp.decodeMeasurementClass10(data)', function() {

        // DATACODING_BIT

        it('should return true as return value is array.', function() {
            var data = [0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass10(data);
            assert.equal(Array.isArray(bitarray), true);
        });

        it('should return 16 as length of array', function() {
            var data = [0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass10(data);
            assert.equal(bitarray.length, 16);
        });

        it('should return array with 16 elements true,false...', function() {
            var data = [0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass10(data);
            assert.equal(bitarray[0], true);
            assert.equal(bitarray[1], false);
            assert.equal(bitarray[2], true);
            assert.equal(bitarray[3], false);
            assert.equal(bitarray[4], true);
            assert.equal(bitarray[5], false);
            assert.equal(bitarray[6], true);
            assert.equal(bitarray[7], false);
            assert.equal(bitarray[8], true);
            assert.equal(bitarray[9], false);
            assert.equal(bitarray[10], true);
            assert.equal(bitarray[11], false);
            assert.equal(bitarray[12], true);
            assert.equal(bitarray[13], false);
            assert.equal(bitarray[14], true);
            assert.equal(bitarray[15], false);
        });

        // DATACODING_BYTE

        it('should return true as return value is array.', function() {
            var data = [0x20,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass10(data);
            assert.equal(Array.isArray(bitarray), true);
        });

        it('should return 2 as length of array', function() {
            var data = [0x20,0xAA,0x55];
            var bitarray = vscp.decodeMeasurementClass10(data);
            assert.equal(bitarray.length, 2);
        });

        it('should return two bytes 0xAA and 0+x55', function() {
            var data = [0x20,0xAA,0x55];
            var bitarray = vscp.decodeMeasurementClass10(data);
            assert.equal(bitarray[0], 0xAA);
            assert.equal(bitarray[1], 0x55);
        });

        // DATACODING_STRING

        it('should return true as return value is number.', function() {
            var data = [0x40,0x31,0x30,0x2e,0x38];
            var val = vscp.decodeMeasurementClass10(data);
            assert(typeof val === 'number');
        });

        it('should return 10.8 as number.', function() {
            var data = [0x40,0x31,0x30,0x2e,0x38];
            var val = vscp.decodeMeasurementClass10(data);
            assert(val === 10.8);
        });

        it('should return 10.8127 as number.', function() {
            var data = [0x40,0x31,0x30,0x2e,0x38,0x31,0x32,0x37];
            var val = vscp.decodeMeasurementClass10(data);
            assert(val === 10.8127);
        });

        it('should return 0 as number.', function() {
            var data = [0x40,0x30];
            var val = vscp.decodeMeasurementClass10(data);
            assert(val === 0);
        });

        // DATACODING_INTEGER

        it('should return true as return value is bigint.', function() {
            var data = [0x60,0x55,0xAA];
            var val = vscp.decodeMeasurementClass10(data);
            assert(typeof val === 'bigint');
        });

        it('should return 0x55AAn as bigint.', function() {
            var data = [0x60,0x55,0xAA];
            var val = vscp.decodeMeasurementClass10(data);
            assert(val === 0x55aan);
        });

        it('should return 0x55aa55aa55aa55n as bigint.', function() {
            var data = [0x60,0x55,0xAA,0x55,0xAA,0x55,0xAA,0x55];
            var val = vscp.decodeMeasurementClass10(data);
            assert(val === 0x55aa55aa55aa55n);
        });

        // DATACODING_NORMALIZED

        it('should return true as return value is number.', function() {
            var data = [0x80,0x02,0x1B,0x22];
            var val = vscp.decodeMeasurementClass10(data);
            assert(typeof val === 'number');
        });

        it('should return 6946 as number.', function() {
            var data = [0x80,0x02,0x1B,0x22];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(val,694600);
        });

        it('should return -0.00115 as number.', function() {
            var data = [0x80,0x85,0x8d];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(val,-0.00115);
        });

        it('should return 26.3 as number.', function() {
            var data = [0x80,0x81,0x01,0x07];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(val,26.3);
        });

        it('should return 26.3 as number.', function() {
            var data = [0x80,0x00,0x01,0x07];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(val,263);
        });

        it('should return -1 as number.', function() {
            var data = [0x80,0x00,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(val,-1);
        });

        it('should return -1 as number.', function() {
            var data = [0x80,0x00,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(val,-1);
        });

        it('should return -100 as number.', function() {
            var data = [0x80,0x02,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(val,-100);
        });

        // DATACODING_SINGLE

        it('should return true as return value is number.', function() {
            var data = [0xA0,158,142,30,65];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(typeof val,'number');
        });

        it('should return 9.909819 as return value is number.', function() {
            //var data = [0xA0,158,142,30,65];
            var data = [0xA0,65,30,142,158];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(vscp.toFixed(val,6),9.909819);
        });
        
        it('should return -21489.32 as return value is number.', function() {
            var data = [0xA0,198,167,226,164];
            var val = vscp.decodeMeasurementClass10(data);
            assert.equal(vscp.toFixed(val,2),-21489.32);
        });
    });



    describe('vscp.decodeMeasurementClass60(data)', function() {

        it('should return true as return value is number.', function() {
            var data = [64,95,23,206,217,22,135,43];
            var val = vscp.decodeMeasurementClass60(data);
            assert.equal(typeof val, 'number');
        });

        it('should return 124.372 as number.', function() {
            var data = [64,95,23,206,217,22,135,43];
            var val = vscp.decodeMeasurementClass60(data);
            assert.equal(vscp.toFixed(val,3), 124.372);
        });

        it('should return -876.12 as number.', function() {
            var data = [192,139,96,245,194,143,92,41];
            var val = vscp.decodeMeasurementClass60(data);
            assert.equal(vscp.toFixed(val,2), -876.12);
        });

    });


    describe('vscp.decodeMeasurementClass65(data)', function() {

        // DATACODING_BIT

        it('should return true as return value is array.', function() {
            var data = [0,1,2,0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass65(data);
            assert.equal(Array.isArray(bitarray), true);
        });

        it('should return 16 as length of array', function() {
            var data = [0,1,2,0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass65(data);
            assert.equal(bitarray.length, 16);
        });

        it('should return array with 16 elements true,false...', function() {
            var data = [0,1,2,0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass65(data);
            assert.equal(bitarray[0], true);
            assert.equal(bitarray[1], false);
            assert.equal(bitarray[2], true);
            assert.equal(bitarray[3], false);
            assert.equal(bitarray[4], true);
            assert.equal(bitarray[5], false);
            assert.equal(bitarray[6], true);
            assert.equal(bitarray[7], false);
            assert.equal(bitarray[8], true);
            assert.equal(bitarray[9], false);
            assert.equal(bitarray[10], true);
            assert.equal(bitarray[11], false);
            assert.equal(bitarray[12], true);
            assert.equal(bitarray[13], false);
            assert.equal(bitarray[14], true);
            assert.equal(bitarray[15], false);
        });

        // DATACODING_BYTE

        it('should return true as return value is array.', function() {
            var data = [0,1,2,0x20,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass65(data);
            assert.equal(Array.isArray(bitarray), true);
        });

        it('should return 2 as length of array', function() {
            var data = [0,1,2,0x20,0xAA,0x55];
            var bitarray = vscp.decodeMeasurementClass65(data);
            assert.equal(bitarray.length, 2);
        });

        it('should return two bytes 0xAA and 0+x55', function() {
            var data = [0,1,2,0x20,0xAA,0x55];
            var bitarray = vscp.decodeMeasurementClass65(data);
            assert.equal(bitarray[0], 0xAA);
            assert.equal(bitarray[1], 0x55);
        });

        // DATACODING_STRING

        it('should return true as return value is number.', function() {
            var data = [0,1,2,0x40,0x31,0x30,0x2e,0x38];
            var val = vscp.decodeMeasurementClass65(data);
            assert(typeof val === 'number');
        });

        it('should return 10.8 as number.', function() {
            var data = [0,1,2,0x40,0x31,0x30,0x2e,0x38];
            var val = vscp.decodeMeasurementClass65(data);
            assert(val === 10.8);
        });

        it('should return 10.8127 as number.', function() {
            var data = [0,1,2,0x40,0x31,0x30,0x2e,0x38];
            var val = vscp.decodeMeasurementClass65(data);
            assert(val === 10.8);
        });

        it('should return 0 as number.', function() {
            var data = [0,1,2,0x40,0x30];
            var val = vscp.decodeMeasurementClass65(data);
            assert(val === 0);
        });

        // DATACODING_INTEGER

        it('should return true as return value is bigint.', function() {
            var data = [0,1,2,0x60,0x55,0xAA];
            var val = vscp.decodeMeasurementClass65(data);
            assert(typeof val === 'bigint');
        });

        it('should return 0x55AAn as bigint.', function() {
            var data = [0,1,2,0x60,0x55,0xAA];
            var val = vscp.decodeMeasurementClass65(data);
            assert(val === 0x55aan);
        });

        it('should return 0x55aa55aa55aa55n as bigint.', function() {
            var data = [0,1,2,0x60,0x55,0xAA,0x55,0xAA];
            var val = vscp.decodeMeasurementClass65(data);
            assert(val === 0x55aa55aan);
        });

        // DATACODING_NORMALIZED

        it('should return true as return value is number.', function() {
            var data = [0,1,2,0x80,0x02,0x1B,0x22];
            var val = vscp.decodeMeasurementClass65(data);
            assert(typeof val === 'number');
        });

        it('should return 6946 as number.', function() {
            var data = [0,1,2,0x80,0x02,0x1B,0x22];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(val,694600);
        });

        it('should return -0.00115 as number.', function() {
            var data = [0,1,2,0x80,0x85,0x8d];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(val,-0.00115);
        });

        it('should return 26.3 as number.', function() {
            var data = [0,1,2,0x80,0x81,0x01,0x07];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(val,26.3);
        });

        it('should return 26.3 as number.', function() {
            var data = [0,1,2,0x80,0x00,0x01,0x07];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(val,263);
        });

        it('should return -1 as number.', function() {
            var data = [0,1,2,0x80,0x00,0xFF,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(val,-1);
        });

        it('should return -1 as number.', function() {
            var data = [0,1,2,0x80,0x00,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(val,-1);
        });

        it('should return -100 as number.', function() {
            var data = [0,1,2,0x80,0x02,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(val,-100);
        });

        // DATACODING_SINGLE

        it('should return true as return value is number.', function() {
            var data = [0,1,2,0xA0,158,142,30,65];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(typeof val,'number');
        });

        it('should return 9.909819 as return value is number.', function() {
            //var data = [0xA0,158,142,30,65];
            var data = [0,1,2,0xA0,65,30,142,158];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(vscp.toFixed(val,6),9.909819);
        });
        
        it('should return -21489.32 as return value is number.', function() {
            var data = [0,1,2,0xA0,198,167,226,164];
            var val = vscp.decodeMeasurementClass65(data);
            assert.equal(vscp.toFixed(val,2),-21489.32);
        });

    });

    describe('vscp.decodeMeasurementClass70(data)', function() {

        it('should return true as return value is number.', function() {
            var data = [65,30,142,158];
            var val = vscp.decodeMeasurementClass70(data);
            assert.equal(typeof val, 'number');
        });

        it('should return 9.909819 as number.', function() {
            var data = [65,30,142,158];
            var val = vscp.decodeMeasurementClass70(data);
            assert.equal(vscp.toFixed(val,6),9.909819);
        });

        it('should return -21489.32 as number.', function() {
            var data = [198,167,226,164];
            var val = vscp.decodeMeasurementClass70(data);
            assert.equal(vscp.toFixed(val,2),-21489.32);
        });

    });


    describe('vscp.decodeMeasurementClass85(data)', function() {

        // DATACODING_BIT

        it('should return true as return value is array.', function() {
            var data = [0,1,2,0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass85(data);
            assert.equal(Array.isArray(bitarray), true);
        });

        it('should return 16 as length of array', function() {
            var data = [0,1,2,0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass85(data);
            assert.equal(bitarray.length, 16);
        });

        it('should return array with 16 elements true,false...', function() {
            var data = [0,1,2,0x00,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass85(data);
            assert.equal(bitarray[0], true);
            assert.equal(bitarray[1], false);
            assert.equal(bitarray[2], true);
            assert.equal(bitarray[3], false);
            assert.equal(bitarray[4], true);
            assert.equal(bitarray[5], false);
            assert.equal(bitarray[6], true);
            assert.equal(bitarray[7], false);
            assert.equal(bitarray[8], true);
            assert.equal(bitarray[9], false);
            assert.equal(bitarray[10], true);
            assert.equal(bitarray[11], false);
            assert.equal(bitarray[12], true);
            assert.equal(bitarray[13], false);
            assert.equal(bitarray[14], true);
            assert.equal(bitarray[15], false);
        });

        // DATACODING_BYTE

        it('should return true as return value is array.', function() {
            var data = [0,1,2,0x20,0xAA,0xAA];
            var bitarray = vscp.decodeMeasurementClass85(data);
            assert.equal(Array.isArray(bitarray), true);
        });

        it('should return 2 as length of array', function() {
            var data = [0,1,2,0x20,0xAA,0x55];
            var bitarray = vscp.decodeMeasurementClass85(data);
            assert.equal(bitarray.length, 2);
        });

        it('should return two bytes 0xAA and 0+x55', function() {
            var data = [0,1,2,0x20,0xAA,0x55];
            var bitarray = vscp.decodeMeasurementClass85(data);
            assert.equal(bitarray[0], 0xAA);
            assert.equal(bitarray[1], 0x55);
        });

        // DATACODING_STRING

        it('should return true as return value is number.', function() {
            var data = [0,1,2,0x40,0x31,0x30,0x2e,0x38];
            var val = vscp.decodeMeasurementClass85(data);
            assert(typeof val === 'number');
        });

        it('should return 10.8 as number.', function() {
            var data = [0,1,2,0x40,0x31,0x30,0x2e,0x38];
            var val = vscp.decodeMeasurementClass85(data);
            assert(val === 10.8);
        });

        it('should return 10.8127 as number.', function() {
            var data = [0,1,2,0x40,0x31,0x30,0x2e,0x38];
            var val = vscp.decodeMeasurementClass85(data);
            assert(val === 10.8);
        });

        it('should return 0 as number.', function() {
            var data = [0,1,2,0x40,0x30];
            var val = vscp.decodeMeasurementClass85(data);
            assert(val === 0);
        });

        // DATACODING_INTEGER

        it('should return true as return value is bigint.', function() {
            var data = [0,1,2,0x60,0x55,0xAA];
            var val = vscp.decodeMeasurementClass85(data);
            assert(typeof val === 'bigint');
        });

        it('should return 0x55AAn as bigint.', function() {
            var data = [0,1,2,0x60,0x55,0xAA];
            var val = vscp.decodeMeasurementClass85(data);
            assert(val === 0x55aan);
        });

        it('should return 0x55aa55aa55aa55n as bigint.', function() {
            var data = [0,1,2,0x60,0x55,0xAA,0x55,0xAA];
            var val = vscp.decodeMeasurementClass85(data);
            assert(val === 0x55aa55aan);
        });

        // DATACODING_NORMALIZED

        it('should return true as return value is number.', function() {
            var data = [0,1,2,0x80,0x02,0x1B,0x22];
            var val = vscp.decodeMeasurementClass85(data);
            assert(typeof val === 'number');
        });

        it('should return 6946 as number.', function() {
            var data = [0,1,2,0x80,0x02,0x1B,0x22];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(val,694600);
        });

        it('should return -0.00115 as number.', function() {
            var data = [0,1,2,0x80,0x85,0x8d];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(val,-0.00115);
        });

        it('should return 26.3 as number.', function() {
            var data = [0,1,2,0x80,0x81,0x01,0x07];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(val,26.3);
        });

        it('should return 26.3 as number.', function() {
            var data = [0,1,2,0x80,0x00,0x01,0x07];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(val,263);
        });

        it('should return -1 as number.', function() {
            var data = [0,1,2,0x80,0x00,0xFF,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(val,-1);
        });

        it('should return -1 as number.', function() {
            var data = [0,1,2,0x80,0x00,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(val,-1);
        });

        it('should return -100 as number.', function() {
            var data = [0,1,2,0x80,0x02,0xFF,0xFF];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(val,-100);
        });

        // DATACODING_SINGLE

        it('should return true as return value is number.', function() {
            var data = [0,1,2,0xA0,158,142,30,65];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(typeof val,'number');
        });

        it('should return 9.909819 as return value is number.', function() {
            //var data = [0xA0,158,142,30,65];
            var data = [0,1,2,0xA0,65,30,142,158];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(vscp.toFixed(val,6),9.909819);
        });
        
        it('should return -21489.32 as return value is number.', function() {
            var data = [0,1,2,0xA0,198,167,226,164];
            var val = vscp.decodeMeasurementClass85(data);
            assert.equal(vscp.toFixed(val,2),-21489.32);
        });

    });

    describe('vscp.decodeMeasurementClass1040(data)', function() {

        it('should return true as return value is number.', function() {
            var data = [0,1,2,0,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x2E,0x38,0x39];
            var val = vscp.decodeMeasurementClass1040(data);
            assert.equal(typeof val, 'number');
        });

        it('should return 12345678.9 as number.', function() {
            var data = [0,1,2,0,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x2E,0x39];
            var val = vscp.decodeMeasurementClass1040(data);
            assert.equal(val, 12345678.9);
        });

        it('should return -0.9123 as number.', function() {
            var data = [0,1,2,0,0x2D,0x30,0x2e,0x39,0x31,0x32,0x33];
            var val = vscp.decodeMeasurementClass1040(data);
            assert.equal(val, -0.9123);
        });

    });

    describe('vscp.decodeMeasurementClass1060(data)', function() {

        it('should return true as return value is number.', function() {
            var data = [0,1,2,0,64,95,23,206,217,22,135,43];
            var val = vscp.decodeMeasurementClass1060(data);
            assert.equal(typeof val, 'number');
        });

        it('should return 124.372 as number.', function() {
            var data = [0,1,2,0,64,95,23,206,217,22,135,43];
            var val = vscp.decodeMeasurementClass1060(data);
            assert.equal(vscp.toFixed(val,3), 124.372);
        });

        it('should return -876.12 as number.', function() {
            var data = [0,1,2,0,192,139,96,245,194,143,92,41];
            var val = vscp.decodeMeasurementClass1060(data);
            assert.equal(vscp.toFixed(val,2), -876.12);
        });

    });

});
