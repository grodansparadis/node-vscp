var assert = require('assert');
const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');
const vscp = require("../src/vscp.js");

describe('VSCP Event', function() {
    
    var ev = new vscp.Event();  
    
    describe('#new', function() {
        it('should return true when when instance is vscp.Event', function() {
            assert.equal(ev instanceof vscp.Event, true);
        });
    });

    describe('#vscpHead', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.vscpHead, 0);
        });
    });

    describe('#vscpClass', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.vscpClass, 0 );
        });
    });

    describe('#vscpObId', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.vscpObId, 0 );
        });
    });

    describe('#vscpTimeStamp', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.vscpTimeStamp, 0 );
        });
    });

    describe('#vscpType', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.vscpType, 0);
        });
    });

    describe('#vscpDateTime', function() {
        it('should return true when when instance is Date', function() {
            assert.equal(ev.vscpDateTime instanceof Date, true);
        });
    });

    describe('#vscpGuid', function() {
        it("should return '00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00' for new vscp.Event", function() {
            assert.equal(ev.vscpGuid, "00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00");
        });
    });
    
    describe('#vscpData', function() {
        it("should return true if array for new vscp.Event", function() {
            assert.equal(Array.isArray(ev.vscpData), true);
        });
    });

    describe('#vscpData size', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.vscpData.length, 0);
        });
    });

    

    describe('#vscpHead set/readback', function() {
        it("should return 0x55 for new vscp.Event", function() {
            var ev = new vscp.Event({
                "vscpHead": 85
            });
            assert.equal(ev.vscpHead, 85);
        });

        it("should return 0xAA55 for new vscp.Event", function() {
            var ev = new vscp.Event({
                "vscpHead": 0xAA55
            });
            assert.equal(ev.vscpHead, 0xAA55);
        });
    });

    describe('#vscpHead setIPV6Addr', function() {
        it("should return bit 12 set in VSCP head (0x1000)", function() {
            var ev = new vscp.Event();
            ev.setIPV6Addr();
            assert.equal(ev.vscpHead, 0x1000);
        });
    });

    describe('#vscpHead isIPV6Addr', function() {
        it("should return true if bit 12 is set in VSCP head", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x1000
            });
            assert.equal(ev.isIPV6Addr(), true);
        });

        it("should return false if bit 12 is cleared in VSCP head", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(ev.isIPV6Addr(), false);
        });
    });

    describe('#vscpHead setDumbNode', function() {
        it("should return bit 15 set in VSCP head (0x8000)", function() {
            var ev = new vscp.Event();
            ev.setDumbNode();
            assert.equal(ev.vscpHead, 0x8000);
        });
    });

    describe('#vscpHead isDumbNode', function() {
        it("should return true if bit 15 is set in VSCP head", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x8000
            });
            assert.equal(ev.isDumbNode(), true);
        });

        it("should return false if bit 15 is cleared in VSCP head", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(ev.isDumbNode(), false);
        });
    });

    describe('#vscpHead setPriority(7)', function() {
        it("should return bit 7,6,5 set in VSCP head (0x00E0)", function() {
            var ev = new vscp.Event();
            ev.setPriority(7);
            assert.equal(ev.vscpHead, 0x00E0);
        });
    });

    describe('#vscpHead setPriority(3)', function() {
        it("should return bit 7,6,5 set in VSCP head (0x060)", function() {
            var ev = new vscp.Event();
            ev.setPriority(3);
            assert.equal(ev.vscpHead, 0x060);
        });
    });

    describe('#vscpHead setPriority(0)', function() {
        it("should return bit 7,6,5 cleared in VSCP head (0x0000)", function() {
            var ev = new vscp.Event();
            ev.setPriority(0);
            assert.equal(ev.vscpHead, 0x0000);
        });
    });

    describe('#vscpHead getPriority()', function() {
        it("should return 7 from VSCP head (0x00E0)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x00E0
            });
            assert.equal(ev.getPriority(), 7);
        });
    });

    describe('#vscpHead getPriority()', function() {
        it("should return 3 from VSCP head (0x0060)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0060
            });
            assert.equal(ev.getPriority(), 3);
        });
    });

    describe('#vscpHead getPriority()', function() {
        it("should return 0 from VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(ev.getPriority(), 0);
        });
    });

    describe('#vscpHead setGuidType(7)', function() {
        it("should return bit 14,13,12 set in VSCP head (0x7000)", function() {
            var ev = new vscp.Event();
            ev.setGuidType(7);
            assert.equal(ev.vscpHead, 0x7000);
        });
    });

    describe('#vscpHead setGuidType(3)', function() {
        it("should return bit 14,13,12 set in VSCP head (0x3000)", function() {
            var ev = new vscp.Event();
            ev.setGuidType(3);
            assert.equal(ev.vscpHead, 0x3000);
        });
    });

    describe('#vscpHead setGuidType(1)', function() {
        it("should return bit 14,13,12 set in VSCP head (0x1000)", function() {
            var ev = new vscp.Event();
            ev.setGuidType(1);
            assert.equal(ev.vscpHead, 0x1000);
            assert.equal(ev.isIPV6Addr(), true);
        });
    });

    describe('#vscpHead getGuidType()', function() {
        it("should return bit 14,13,12 set in VSCP head (0x7000)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x7000
            });
            assert.equal(ev.getGuidType(), 7);
        });
    });

    describe('#vscpHead getGuidType()', function() {
        it("should return bit 14,13,12 cleared in VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(ev.getGuidType(), 0);
        });
    });

    describe('#vscpHead isHardCodedAddr()/setHardCodedAddr()', function() {
        it("should return bit 5 set in VSCP head (0x0010)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(ev.isHardCodedAddr(), false);
            ev.setHardCodedAddr();
            assert.equal(ev.isHardCodedAddr(), true);
            assert.equal(ev.vscpHead, 0x0010);
        });
    });

    describe('#vscpHead isDoNotCalcCRC()/setDoNotCalcCRC()', function() {
        it("should return bit 5 set in VSCP head (0x0008)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(ev.isDoNotCalcCRC(), false);
            ev.setDoNotCalcCRC();
            assert.equal(ev.isDoNotCalcCRC(), true);
            assert.equal(ev.vscpHead, 0x0008);
        });
    });

    describe('#vscpHead getRollingIndex()', function() {
        it("should return bit 3,2,1 cleared in VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(ev.getRollingIndex(), 0);
        });
    });

    describe('#vscpHead getRollingIndex()', function() {
        it("should return bit 3,2,1 set to 3 in VSCP head (0x0003)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0003
            });
            assert.equal(ev.getRollingIndex(), 3);
        });
    });

    describe('#vscpHead setRollingIndex()', function() {
        it("should return bit 3,2,1 set to 7 in VSCP head (0x0007)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0007
            });
            assert.equal(ev.getRollingIndex(), 7);
            ev.setRollingIndex(3);
            assert.equal(ev.getRollingIndex(), 3);
            assert.equal(ev.vscpHead, 0x0003);
        });
    });

    describe('#setFromString()', function() {

        var ev = new vscp.Event({});
        ev.setFromString('3,10,6,4,2020-02-11T17:32:02Z,4074759495,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,0x48,0x35,0x31,0x2E,0x39,0x32');

        it("should return 3", function() {            
            assert.equal(ev.getRollingIndex(), 3);
        });

        it("should return 3", function() {
            assert.equal(ev.vscpHead, 0x0003);
        });

        it("should return 10", function() {            
            assert.equal(ev.vscpClass, 10);
        });

        it("should return 6", function() {            
            assert.equal(ev.vscpType, 6);
        });

        it("should return 4", function() {
            assert.equal(ev.vscpObId, 4);
        });

        it("should return 2020", function() {            
            assert.equal(ev.vscpDateTime.getUTCFullYear(), 2020);
        });

        it("should return 1", function() {            
            assert.equal(ev.vscpDateTime.getUTCMonth(), 1);
        });

        it("should return 11", function() {            
            assert.equal(ev.vscpDateTime.getUTCDate(), 11);
        });

        it("should return 17", function() {    
            assert.equal(ev.vscpDateTime.getUTCHours(), 17);
        });

        it("should return 32", function() {    
            assert.equal(ev.vscpDateTime.getUTCMinutes(), 32);
        });

        it("should return 2", function() {    
            assert.equal(ev.vscpDateTime.getUTCSeconds(), 2);
        });

        it("should return 4074759495", function() {
            assert.equal(ev.vscpTimeStamp, 4074759495);
        });

        it("should return GUID = FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01", function() {
            assert.equal(ev.vscpGuid, "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01");
        });

        it("should return length = 6", function() {
            assert.equal(ev.vscpData.length, 6 );
        });

        it("should return [72,53,49,46,57,50]", function() {
            assert.equal(ev.vscpData[0], 72 );
            assert.equal(ev.vscpData[1], 53 );
            assert.equal(ev.vscpData[2], 49 );
            assert.equal(ev.vscpData[3], 46 );
            assert.equal(ev.vscpData[4], 57 );
            assert.equal(ev.vscpData[5], 50 );
        });
    });

    describe('#toJSONObj()', function() {
        
        var ev = new vscp.Event();
        ev.vscpHead = 0x0007;
        ev.vscpClass = 10;
        ev.vscpType = 6;
        ev.vscpData = [1,2,3,4,5];
        var obj = ev.toJSONObj();
        
        it("should return vscpHead set to 7", function() {    
            assert.equal(obj.vscpHead, 7);
        });

        it("should return vscpClass set to 10", function() {    
            assert.equal(obj.vscpClass, 10);
        });

        it("should return vscpType set to 6", function() {    
            assert.equal(obj.vscpType, 6);
        });

        it("should return true, vscpData is array", function() {    
            assert.equal(Array.isArray(obj.vscpData), true);
        });

        it("should return vscpData set to [1,2,3,4,5]", function() {    
            assert.equal(obj.vscpData[0], 1);
            assert.equal(obj.vscpData[1], 2);
            assert.equal(obj.vscpData[2], 3);
            assert.equal(obj.vscpData[3], 4);
            assert.equal(obj.vscpData[4], 5);
        });

        it("should return true, vscpDateTime is instance of Date", function() {    
            //console.log(obj.vscpDateTime);
            assert.equal(obj.vscpDateTime instanceof Date, true);
        });

    });

    describe('#getAsString()', function() {
        
        var ev = new vscp.Event();
        ev.vscpHead = 0x0007;
        ev.vscpClass = 10;
        ev.vscpType = 6;
        ev.vscpData = [1,2,3,4,5];

        var str = ev.getAsString();
        var ev2 = new vscp.Event(str);
        
        it("should return vscpHead set to 7", function() {    
            assert.equal(ev2.vscpHead, 7);
        });

        it("should return vscpClass set to 10", function() {    
            assert.equal(ev2.vscpClass, 10);
        });

        it("should return vscpType set to 6", function() {    
            assert.equal(ev2.vscpType, 6);
        });

        it("should return true, vscpData is array", function() {    
            assert.equal(Array.isArray(ev2.vscpData), true);
        });

        it("should return vscpData set to [1,2,3,4,5]", function() {    
            assert.equal(ev2.vscpData[0], 1);
            assert.equal(ev2.vscpData[1], 2);
            assert.equal(ev2.vscpData[2], 3);
            assert.equal(ev2.vscpData[3], 4);
            assert.equal(ev2.vscpData[4], 5);
        });

        it("should return true, vscpDateTime is instance of Date", function() {    
            //console.log(obj.vscpDateTime);
            assert.equal(ev2.vscpDateTime instanceof Date, true);
        });

    });

    describe('#toString()', function() {
        
        var ev = new vscp.Event();
        ev.vscpHead = 0x0007;
        ev.vscpClass = 10;
        ev.vscpType = 6;
        ev.vscpData = [1,2,3,4,5];

        var str = ev.toString();
        var ev2 = new vscp.Event(str);
        
        it("should return vscpHead set to 7", function() {    
            assert.equal(ev2.vscpHead, 7);
        });

        it("should return vscpClass set to 10", function() {    
            assert.equal(ev2.vscpClass, 10);
        });

        it("should return vscpType set to 6", function() {    
            assert.equal(ev2.vscpType, 6);
        });

        it("should return true, vscpData is array", function() {    
            assert.equal(Array.isArray(ev2.vscpData), true);
        });

        it("should return vscpData set to [1,2,3,4,5]", function() {    
            assert.equal(ev2.vscpData[0], 1);
            assert.equal(ev2.vscpData[1], 2);
            assert.equal(ev2.vscpData[2], 3);
            assert.equal(ev2.vscpData[3], 4);
            assert.equal(ev2.vscpData[4], 5);
        });

        it("should return true, vscpDateTime is instance of Date", function() {    
            //console.log(obj.vscpDateTime);
            assert.equal(ev2.vscpDateTime instanceof Date, true);
        });

    });

});
