var assert = require('assert');
const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');
const vscp = require("../src/vscp.js");

describe('VSCP Constants', function() {

    describe('vscp.priority', function() {

        describe('#PRIORITY_0', function() {
            it('should return 0', function() {
                assert.equal(vscp.priority.PRIORITY_0, 0);
            });
        });

        describe('#PRIORITY_HIGH', function() {
            it('should return 1', function() {
                assert.equal(vscp.priority.PRIORITY_HIGH, 0);
            });
        });

        describe('#PRIORITY_1', function() {
            it('should return 1', function() {
                assert.equal(vscp.priority.PRIORITY_1, 1);
            });
        });

        describe('#PRIORITY_2', function() {
            it('should return 2', function() {
                assert.equal(vscp.priority.PRIORITY_2, 2);
            });
        });

        describe('#PRIORITY_3', function() {
            it('should return 3', function() {
                assert.equal(vscp.priority.PRIORITY_3, 3);
            });
        });

        describe('#PRIORITY_NORMAL', function() {
            it('should return 3', function() {
                assert.equal(vscp.priority.PRIORITY_NORMAL, 3);
            });
        });

        describe('#PRIORITY_4', function() {
            it('should return 4', function() {
                assert.equal(vscp.priority.PRIORITY_4, 4);
            });
        });

        describe('#PRIORITY_5', function() {
            it('should return 5', function() {
                assert.equal(vscp.priority.PRIORITY_5, 5);
            });
        });

        describe('#PRIORITY_6', function() {
            it('should return 6', function() {
                assert.equal(vscp.priority.PRIORITY_6, 6);
            });
        });

        describe('#PRIORITY_7', function() {
            it('should return 7', function() {
                assert.equal(vscp.priority.PRIORITY_7, 7);
            });
        });

        describe('#PRIORITY_LOW', function() {
            it('should return 7', function() {
                assert.equal(vscp.priority.PRIORITY_LOW, 7);
            });
        });

    });

    describe('vscp.guidtype', function() {

        describe('#GUIDTYPE_0', function() {
            it('should return 0', function() {
                assert.equal(vscp.guidtype.GUIDTYPE_0, 0);
            });
        });

        describe('#GUIDTYPE_STANDARD', function() {
            it('should return 0', function() {
                assert.equal(vscp.guidtype.GUIDTYPE_STANDARD, 0);
            });
        });

        describe('#GUIDTYPE_1', function() {
            it('should return 1', function() {
                assert.equal(vscp.guidtype.GUIDTYPE_1, 1);
            });
        });

        describe('#GUIDTYPE_IPV6', function() {
            it('should return 1', function() {
                assert.equal(vscp.guidtype.GUIDTYPE_IPV6, 1);
            });
        });

        describe('#GUIDTYPE_2', function() {
            it('should return 2', function() {
                assert.equal(vscp.guidtype.GUIDTYPE_2, 2);
            });
        });

        describe('#GUIDTYPE_RFC4122_1', function() {
            it('should return 2', function() {
                assert.equal(vscp.guidtype.GUIDTYPE_RFC4122_1, 2);
            });
        });

        describe('#GUIDTYPE_3', function() {
            it('should return 3', function() {
                assert.equal(vscp.guidtype.GUIDTYPE_3, 3);
            });
        });

        describe('#GUIDTYPE_RFC4122_4', function() {
            it('should return 3', function() {
                assert.equal(vscp.guidtype.GUIDTYPE_RFC4122_4, 3);
            });
        });

    });

    describe('vscp.hostCapability', function() {


        describe('#REMOTE_VARIABLE', function() {
            it('should return 63', function() {
                assert.equal(vscp.hostCapability.REMOTE_VARIABLE, 63);
            });
        });

        describe('#DECISION_MATRIX', function() {
            it('should return 62', function() {
                assert.equal(vscp.hostCapability.DECISION_MATRIX, 62);
            });
        });

        describe('#INTERFACE', function() {
            it('should return 61', function() {
                assert.equal(vscp.hostCapability.INTERFACE, 61);
            });
        });

        describe('#TCPIP', function() {
            it('should return 15', function() {
                assert.equal(vscp.hostCapability.TCPIP, 15);
            });
        });

        describe('#UDP', function() {
            it('should return 14', function() {
                assert.equal(vscp.hostCapability.UDP, 14);
            });
        });

        describe('#MULTICAST_ANNOUNCE', function() {
            it('should return 13', function() {
                assert.equal(vscp.hostCapability.MULTICAST_ANNOUNCE, 13);
            });
        });

        describe('#RAWETH', function() {
            it('should return 12', function() {
                assert.equal(vscp.hostCapability.RAWETH, 12);
            });
        });

        describe('#WEB', function() {
            it('should return 11', function() {
                assert.equal(vscp.hostCapability.WEB, 11);
            });
        });

        describe('#WEBSOCKET', function() {
            it('should return 10', function() {
                assert.equal(vscp.hostCapability.WEBSOCKET, 10);
            });
        });

        describe('#REST', function() {
            it('should return 9', function() {
                assert.equal(vscp.hostCapability.REST, 9);
            });
        });

        describe('#MULTICAST_CHANNEL', function() {
            it('should return 8', function() {
                assert.equal(vscp.hostCapability.MULTICAST_CHANNEL, 8);
            });
        });

        describe('#IP6', function() {
            it('should return 6', function() {
                assert.equal(vscp.hostCapability.IP6, 6);
            });
        });

        describe('#IP4', function() {
            it('should return 5', function() {
                assert.equal(vscp.hostCapability.IP4, 5);
            });
        });

        describe('#SSL', function() {
            it('should return 4', function() {
                assert.equal(vscp.hostCapability.SSL, 4);
            });
        });

        describe('#TWO_CONNECTIONS', function() {
            it('should return 3', function() {
                assert.equal(vscp.hostCapability.TWO_CONNECTIONS, 3);
            });
        });

        describe('#AES256', function() {
            it('should return 2', function() {
                assert.equal(vscp.hostCapability.AES256, 2);
            });
        });

        describe('#AES192', function() {
            it('should return 1', function() {
                assert.equal(vscp.hostCapability.AES192, 1);
            });
        });

        describe('#AES128', function() {
            it('should return 0', function() {
                assert.equal(vscp.hostCapability.AES128, 0);
            });
        });
    
    });

    describe('vscp.measurementDataCodingMask', function() {

        describe('#MASK_DATACODING_TYPE', function() {
            it('should return 0xE0', function() {
                assert.equal(vscp.measurementDataCodingMask.MASK_DATACODING_TYPE, 0xE0);
            });
        });

        describe('#MASK_DATACODING_UNIT', function() {
            it('should return 0x18', function() {
                assert.equal(vscp.measurementDataCodingMask.MASK_DATACODING_UNIT, 0x18);
            });
        });

        describe('#MASK_DATACODING_INDEX', function() {
            it('should return 0x07', function() {
                assert.equal(vscp.measurementDataCodingMask.MASK_DATACODING_INDEX, 0x07);
            });
        });

    }); 
    
    describe('vscp.measurementDataCoding', function() {
 
        describe('#DATACODING_BIT', function() {
            it('should return 0x00', function() {
                assert.equal(vscp.measurementDataCoding.DATACODING_BIT, 0x00);
            });
        });

        describe('#DATACODING_BYTE', function() {
            it('should return 0x20', function() {
                assert.equal(vscp.measurementDataCoding.DATACODING_BYTE, 0x20);
            });
        });

        describe('#DATACODING_STRING', function() {
            it('should return 0x40', function() {
                assert.equal(vscp.measurementDataCoding.DATACODING_STRING, 0x40);
            });
        });

        describe('#DATACODING_INTEGER', function() {
            it('should return 0x60', function() {
                assert.equal(vscp.measurementDataCoding.DATACODING_INTEGER, 0x60);
            });
        });

        describe('#DATACODING_NORMALIZED', function() {
            it('should return 0x80', function() {
                assert.equal(vscp.measurementDataCoding.DATACODING_NORMALIZED, 0x80);
            });
        });

        describe('#DATACODING_SINGLE', function() {
            it('should return 0xA0', function() {
                assert.equal(vscp.measurementDataCoding.DATACODING_SINGLE, 0xA0);
            });
        });

        describe('#DATACODING_DOUBLE', function() {
            it('should return 0xC0', function() {
                assert.equal(vscp.measurementDataCoding.DATACODING_DOUBLE, 0xC0);
            });
        });

        describe('#DATACODING_RESERVED2', function() {
            it('should return 0xE0', function() {
                assert.equal(vscp.measurementDataCoding.DATACODING_RESERVED2, 0xE0);
            });
        });

    }); 
});    