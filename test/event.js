var assert = require('assert');
const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');
const vscp = require("../src/vscp.js");

// ----------------------------------------------------------------------------
// VSCP event tests
// ----------------------------------------------------------------------------

describe('VSCP Event', function() {
    
    var ev = new vscp.Event();  
    
    describe('#new', function() {
        it('should return true when when instance is vscp.Event', function() {
            assert.equal(ev instanceof vscp.Event, true);
        });
    });

    describe('#head', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.head, 0);
        });
    });

    describe('#class', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.vscpclass, 0 );
        });
    });

    describe('#obid', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.obid, 0 );
        });
    });

    describe('#timestamp', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.timestamp_ns, 0 );
        });
    });

    describe('#type', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.vscptype, 0);
        });
    });

    describe('#guid', function() {
        it("should return '00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00' for new vscp.Event", function() {
            assert.equal(ev.guid, "00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00");
        });
    });
    
    describe('#data', function() {
        it("should return true if array for new vscp.Event", function() {
            assert.equal(Array.isArray(ev.data), true);
        });
    });

    describe('#data size', function() {
        it("should return 0 for new vscp.Event", function() {
            assert.equal(ev.data.length, 0);
        });
    });

    

    describe('#head set/readback', function() {
        it("should return 0x55 for new vscp.Event", function() {
            var ev = new vscp.Event({
                "head": 85
            });
            assert.equal(ev.head, 85);
        });

        it("should return 0xAA55 for new vscp.Event", function() {
            var ev = new vscp.Event({
                "head": 0xAA55
            });
            assert.equal(ev.head, 0xAA55);
        });

        it("should apply object options from a JSON string", function() {
            var ev = new vscp.Event('  {"head":0,"priority":3,"frameversion":1,"guidtype":2,"hardcoded":true,"calccrc":true}');
            assert.equal(ev.head, 0x2178);
        });
    });

    describe('#head setIPV6Addr', function() {
        it("should return bit 12 set in VSCP head (0x1000)", function() {
            var ev = new vscp.Event();
            ev.setIPV6Addr();
            assert.equal(ev.head, 0x1000);
        });
    });

    describe('#head isIPV6Addr', function() {
        it("should return true if bit 12 is set in VSCP head", function() {
            var ev = new vscp.Event({
                "head": 0x1000
            });
            assert.equal(ev.isIPV6Addr(), true);
        });

        it("should return false if bit 12 is cleared in VSCP head", function() {
            var ev = new vscp.Event({
                "head": 0x0000
            });
            assert.equal(ev.isIPV6Addr(), false);
        });
    });

    describe('#head setDumbNode', function() {
        it("should return bit 15 set in VSCP head (0x8000)", function() {
            var ev = new vscp.Event();
            ev.setDumbNode();
            assert.equal(ev.head, 0x8000);
        });
    });

    describe('#head isDumbNode', function() {
        it("should return true if bit 15 is set in VSCP head", function() {
            var ev = new vscp.Event({
                "head": 0x8000
            });
            assert.equal(ev.isDumbNode(), true);
        });

        it("should return false if bit 15 is cleared in VSCP head", function() {
            var ev = new vscp.Event({
                "head": 0x0000
            });
            assert.equal(ev.isDumbNode(), false);
        });
    });

    describe('#head setPriority(7)', function() {
        it("should return bit 7,6,5 set in VSCP head (0x00E0)", function() {
            var ev = new vscp.Event();
            ev.setPriority(7);
            assert.equal(ev.head, 0x00E0);
        });
    });

    describe('#head setPriority(3)', function() {
        it("should return bit 7,6,5 set in VSCP head (0x060)", function() {
            var ev = new vscp.Event();
            ev.setPriority(3);
            assert.equal(ev.head, 0x060);
        });
    });

    describe('#head setPriority(0)', function() {
        it("should return bit 7,6,5 cleared in VSCP head (0x0000)", function() {
            var ev = new vscp.Event();
            ev.setPriority(0);
            assert.equal(ev.head, 0x0000);
        });
    });

    describe('#head getPriority()', function() {
        it("should return 7 from VSCP head (0x00E0)", function() {
            var ev = new vscp.Event({
                "head": 0x00E0
            });
            assert.equal(ev.getPriority(), 7);
        });
    });

    describe('#head getPriority()', function() {
        it("should return 3 from VSCP head (0x0060)", function() {
            var ev = new vscp.Event({
                "head": 0x0060
            });
            assert.equal(ev.getPriority(), 3);
        });
    });

    describe('#head getPriority()', function() {
        it("should return 0 from VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "head": 0x0000
            });
            assert.equal(ev.getPriority(), 0);
        });
    });

    describe('#head frameversion', function() {
        it("should set frameversion 1 in bits 9-8 (0x0100)", function() {
            var ev = new vscp.Event({
                "frameversion": 1
            });
            assert.equal(ev.head, 0x0100);
        });

        it("should set frameversion 3 from string in bits 9-8 (0x0300)", function() {
            var ev = new vscp.Event({
                "frameversion": "3"
            });
            assert.equal(ev.head, 0x0300);
        });

        it("should preserve other head bits when setting frameversion", function() {
            var ev = new vscp.Event({
                "head": 0x80E0,
                "frameversion": 2
            });
            assert.equal(ev.head, 0x82E0);
        });

        it("should ignore out-of-range numeric frameversion", function() {
            var ev = new vscp.Event({
                "head": 0x00E0,
                "frameversion": 4
            });
            assert.equal(ev.head, 0x00E0);
        });

        it("should ignore out-of-range string frameversion", function() {
            var ev = new vscp.Event({
                "head": 0x00E0,
                "frameversion": "4"
            });
            assert.equal(ev.head, 0x00E0);
        });
    });

    describe('#head setGuidType(7)', function() {
        it("should return bit 14,13,12 set in VSCP head (0x7000)", function() {
            var ev = new vscp.Event();
            ev.setGuidType(7);
            assert.equal(ev.head, 0x7000);
        });
    });

    describe('#head setGuidType(3)', function() {
        it("should return bit 14,13,12 set in VSCP head (0x3000)", function() {
            var ev = new vscp.Event();
            ev.setGuidType(3);
            assert.equal(ev.head, 0x3000);
        });
    });

    describe('#head setGuidType(1)', function() {
        it("should return bit 14,13,12 set in VSCP head (0x1000)", function() {
            var ev = new vscp.Event();
            ev.setGuidType(1);
            assert.equal(ev.head, 0x1000);
            assert.equal(ev.isIPV6Addr(), true);
        });
    });

    describe('#head getGuidType()', function() {
        it("should return bit 14,13,12 set in VSCP head (0x7000)", function() {
            var ev = new vscp.Event({
                "head": 0x7000
            });
            assert.equal(ev.getGuidType(), 7);
        });
    });

    describe('#head getGuidType()', function() {
        it("should return bit 14,13,12 cleared in VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "head": 0x0000
            });
            assert.equal(ev.getGuidType(), 0);
        });
    });

    describe('#head isHardCodedAddr()/setHardCodedAddr()', function() {
        it("should return bit 5 set in VSCP head (0x0010)", function() {
            var ev = new vscp.Event({
                "head": 0x0000
            });
            assert.equal(ev.isHardCodedAddr(), false);
            ev.setHardCodedAddr();
            assert.equal(ev.isHardCodedAddr(), true);
            assert.equal(ev.head, 0x0010);
        });
    });

    describe('#head isDoNotCalcCRC()/setDoNotCalcCRC()', function() {
        it("should return bit 5 set in VSCP head (0x0008)", function() {
            var ev = new vscp.Event({
                "head": 0x0000
            });
            assert.equal(ev.isDoNotCalcCRC(), false);
            ev.setDoNotCalcCRC();
            assert.equal(ev.isDoNotCalcCRC(), true);
            assert.equal(ev.head, 0x0008);
        });
    });

    describe('#head getRollingIndex()', function() {
        it("should return bit 3,2,1 cleared in VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "head": 0x0000
            });
            assert.equal(ev.getRollingIndex(), 0);
        });
    });

    describe('#head getRollingIndex()', function() {
        it("should return bit 3,2,1 set to 3 in VSCP head (0x0003)", function() {
            var ev = new vscp.Event({
                "head": 0x0003
            });
            assert.equal(ev.getRollingIndex(), 3);
        });
    });

    describe('#head setRollingIndex()', function() {
        it("should return bit 3,2,1 set to 7 in VSCP head (0x0007)", function() {
            var ev = new vscp.Event({
                "head": 0x0007
            });
            assert.equal(ev.getRollingIndex(), 7);
            ev.setRollingIndex(3);
            assert.equal(ev.getRollingIndex(), 3);
            assert.equal(ev.head, 0x0003);
        });
    });

    describe('#setFromString()', function() {

        var ev = new vscp.Event({});
        ev.setFromString('3,10,6,4,2020-02-11T17:32:02Z,4074759495,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,0x48,0x35,0x31,0x2E,0x39,0x32');

        it("should return 3", function() {            
            assert.equal(ev.getRollingIndex(), 3);
        });

        it("should return 3", function() {
            assert.equal(ev.head, 0x0003);
        });

        it("should return 10", function() {            
            assert.equal(ev.vscpclass, 10);
        });

        it("should return 6", function() {            
            assert.equal(ev.vscptype, 6);
        });

        it("should return 4", function() {
            assert.equal(ev.obid, 4);
        });

        it("should return 2020", function() {            
            assert.equal(ev.datetime.getUTCFullYear(), 2020);
        });

        it("should return 1", function() {            
            assert.equal(ev.datetime.getUTCMonth(), 1);
        });

        it("should return 11", function() {            
            assert.equal(ev.datetime.getUTCDate(), 11);
        });

        it("should return 17", function() {    
            assert.equal(ev.datetime.getUTCHours(), 17);
        });

        it("should return 32", function() {    
            assert.equal(ev.datetime.getUTCMinutes(), 32);
        });

        it("should return 2", function() {    
            assert.equal(ev.datetime.getUTCSeconds(), 2);
        });

        it("should return 4074759495", function() {
            assert.equal(ev.timestamp, 4074759495);
        });

        it("should return timestamp_ns converted from datetime and legacy timestamp", function() {
            assert.equal(ev.timestamp_ns, 1581446396759495000n);
        });

        it("should return GUID = FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01", function() {
            assert.equal(ev.guid, "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01");
        });

        it("should return length = 6", function() {
            assert.equal(ev.data.length, 6 );
        });

        it("should return [72,53,49,46,57,50]", function() {
            assert.equal(ev.data[0], 72 );
            assert.equal(ev.data[1], 53 );
            assert.equal(ev.data[2], 49 );
            assert.equal(ev.data[3], 46 );
            assert.equal(ev.data[4], 57 );
            assert.equal(ev.data[5], 50 );
        });
    });

    describe('#setFromString() HEX timestamp', function() {

        var ev = new vscp.Event({});
        ev.setFromString('3,10,6,4,,0x4074759495,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,0x48,0x35,0x31,0x2E,0x39,0x32');

        it("should return 0x4074759495", function () {
            assert.equal(ev.timestamp_ns, 0x4074759495);
        });
    });

    describe('#toJSONObj()', function() {
        
        var ev = new vscp.Event();
        ev.head = 0x0007;
        ev.vscpclass = 10;
        ev.vscptype = 6;
        ev.data = [1,2,3,4,5];
        var obj = JSON.parse(ev.toJSONObj());
        
        it("should return head set to 7", function() {    
            assert.equal(obj.head, 7);
        });

        it("should return class set to 10", function() {    
            assert.equal(obj.vscpclass, 10);
        });

        it("should return type set to 6", function() {    
            assert.equal(obj.vscptype, 6);
        });

        it("should initialize an event from a JSON object string", function() {
            var jsonEvent = new vscp.Event('  ' + ev.toJSONObj());
            assert.equal(jsonEvent.head, ev.head);
            assert.equal(jsonEvent.vscpclass, ev.vscpclass);
            assert.equal(jsonEvent.vscptype, ev.vscptype);
            assert.deepEqual(jsonEvent.data, ev.data);
            assert.equal(jsonEvent.timestamp_ns, ev.timestamp_ns);
        });

        it("should return true, data is array", function() {    
            assert.equal(Array.isArray(obj.data), true);
        });

        it("should return data set to [1,2,3,4,5]", function() {    
            assert.equal(obj.data[0], 1);
            assert.equal(obj.data[1], 2);
            assert.equal(obj.data[2], 3);
            assert.equal(obj.data[3], 4);
            assert.equal(obj.data[4], 5);
        });

        it("should only include timestamp_ns on hex string form for time", function() {
            assert.equal(obj.timestamp_ns, "0x0");
            assert.equal(typeof obj.timestamp, "undefined");
            assert.equal(typeof obj.datetime, "undefined");
        });

    });

    describe('#getAsString()', function() {
        
        var ev = new vscp.Event();
        ev.head = 0x0007;
        ev.vscpclass = 10;
        ev.vscptype = 6;
        ev.data = [1,2,3,4,5];

        var str = ev.getAsString();
        var ev2 = new vscp.Event(str);

        it("should write timestamp_ns as a hex string", function() {
            assert.equal(str.split(',')[5], "0x0");
        });
        
        it("should return head set to 7", function() {    
            assert.equal(ev2.head, 7);
        });

        it("should return class set to 10", function() {    
            assert.equal(ev2.vscpclass, 10);
        });

        it("should return type set to 6", function() {    
            assert.equal(ev2.vscptype, 6);
        });

        it("should return true, data is array", function() {    
            assert.equal(Array.isArray(ev2.data), true);
        });

        it("should return data set to [1,2,3,4,5]", function() {    
            assert.equal(ev2.data[0], 1);
            assert.equal(ev2.data[1], 2);
            assert.equal(ev2.data[2], 3);
            assert.equal(ev2.data[3], 4);
            assert.equal(ev2.data[4], 5);
        });

        it("should return true, datetime is instance of Date", function() {    
            //console.log(obj.datetime);
            assert.equal(ev2.datetime instanceof Date, true);
        });

    });

    describe('#toString()', function() {
        
        var ev = new vscp.Event();
        ev.head = 0x0007;
        ev.vscpclass = 10;
        ev.vscptype = 6;
        ev.data = [1,2,3,4,5];

        var str = ev.toString();
        var ev2 = new vscp.Event(str);

        it("should write timestamp_ns as a hex string", function() {
            assert.equal(str.split(',')[5], "0x0");
        });
        
        it("should return head set to 7", function() {    
            assert.equal(ev2.head, 7);
        });

        it("should return class set to 10", function() {    
            assert.equal(ev2.vscpclass, 10);
        });

        it("should return type set to 6", function() {    
            assert.equal(ev2.vscptype, 6);
        });

        it("should return true, data is array", function() {    
            assert.equal(Array.isArray(ev2.data), true);
        });

        it("should return data set to [1,2,3,4,5]", function() {    
            assert.equal(ev2.data[0], 1);
            assert.equal(ev2.data[1], 2);
            assert.equal(ev2.data[2], 3);
            assert.equal(ev2.data[3], 4);
            assert.equal(ev2.data[4], 5);
        });

        it("should return true, datetime is instance of Date", function() {    
            //console.log(obj.datetime);
            assert.equal(ev2.datetime instanceof Date, true);
        });

    });

    describe('#legacy datetime/timestamp -> timestamp_ns', function() {

        // 2020-02-11T17:32:02Z == 1581442322 seconds since the epoch
        var dateTimeNs = 1581442322n * 1000000000n;

        it("should convert datetime to nanoseconds", function() {
            var ev = new vscp.Event({
                "class": 10,
                "type": 6,
                "datetime": "2020-02-11T17:32:02Z"
            });
            assert.equal(ev.timestamp_ns, dateTimeNs);
        });

        // Legacy timestamp is in microseconds, so 1 second is added to the nanoseconds timestamp
        it("should add legacy timestamp (us) as nanoseconds", function() {
            var ev = new vscp.Event({
                "class": 10,
                "type": 6,
                "datetime": "2020-02-11T17:32:02Z",
                "timestamp": 1000000
            });
            assert.equal(ev.timestamp, 1000000);
            // One second is added
            assert.equal(ev.timestamp_ns, dateTimeNs + 1000000000n);
        });

        it("should accept legacy timestamp on hex string form", function() {
            var ev = new vscp.Event({
                "datetime": "2020-02-11T17:32:02Z",
                "timestamp": "0x50817"
            });
            assert.equal(ev.timestamp, 0x50817);
            assert.equal(ev.timestamp_ns, dateTimeNs + BigInt(0x50817) * 1000n);
        });

        it("should accept legacy timestamp on decimal string form", function() {
            var ev = new vscp.Event({
                "datetime": "2020-02-11T17:32:02Z",
                "timestamp": "1000000"
            });
            assert.equal(ev.timestamp, 1000000);
            assert.equal(ev.timestamp_ns, dateTimeNs + 1000000000n);
        });

        it("should accept legacy timestamp on BigInt form", function() {
            var ev = new vscp.Event({
                "datetime": "2020-02-11T17:32:02Z",
                "timestamp": 1000000n
            });
            assert.equal(ev.timestamp, 1000000);
            assert.equal(ev.timestamp_ns, dateTimeNs + 1000000000n);
        });

        it("should accept a Date object as datetime", function() {
            var ev = new vscp.Event({
                "datetime": new Date("2020-02-11T17:32:02Z")
            });
            assert.equal(ev.datetime instanceof Date, true);
            assert.equal(ev.timestamp_ns, dateTimeNs);
        });

        it("should accept datestr alias and treat timestamp as microseconds", function() {
            var ev = new vscp.Event({
                "datestr": "2020-02-11T17:32:02Z",
                "timestamp": 1000000
            });
            assert.equal(ev.timestamp, 1000000);
            assert.equal(ev.timestamp_ns, dateTimeNs + 1000000000n);
        });

        it("should let timestamp_ns take precedence over legacy time", function() {
            var ev = new vscp.Event({
                "datetime": "2020-02-11T17:32:02Z",
                "timestamp": 1000000,
                "timestamp_ns": 4711n
            });
            assert.equal(ev.timestamp_ns, 4711n);
            assert.equal(ev.timestamp, 1000000);
        });

        it("should accept timestamp_ns on string form", function() {
            var ev = new vscp.Event({
                "timestamp_ns": "1755792180000000000"
            });
            assert.equal(typeof ev.timestamp_ns, 'bigint');
            assert.equal(ev.timestamp_ns, 1755792180000000000n);
        });

        it("should accept timestamp_ns on hex string form", function () {
          var ev = new vscp.Event({
            timestamp_ns: "0x1755792180",
          });
          assert.equal(typeof ev.timestamp_ns, "bigint");
          assert.equal(ev.timestamp_ns, 0x1755792180n);
        });

        it("should have zero timestamps for an event without time info", function() {
            var ev = new vscp.Event({
                "class": 10,
                "type": 6
            });
            assert.equal(ev.timestamp, 0);
            assert.equal(ev.timestamp_ns, 0n);
            assert.equal(ev.datetime instanceof Date, true);
        });

        it("should convert legacy time from string form event", function() {
            var ev = new vscp.Event('3,10,6,4,2020-02-11T17:32:02Z,1000000,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,1,2,3');
            assert.equal(ev.timestamp, 1000000);
            assert.equal(ev.timestamp_ns, dateTimeNs + 1000000000n);
        });

        it("should read timestamp_ns from string form event without datetime", function() {
            var ev = new vscp.Event('3,10,6,4,,1755792180000000000,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,1,2,3');
            assert.equal(ev.timestamp, 0);
            assert.equal(ev.timestamp_ns, 1755792180000000000n);
        });

        it("should read hex timestamp_ns from string form event without datetime", function () {
          var ev = new vscp.Event(
            "3,10,6,4,,0x1755792180,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,1,2,3",
          );
          assert.equal(ev.timestamp, 0);
          assert.equal(ev.timestamp_ns, 0x1755792180n);
        });

        it("should keep timestamp_ns over a getAsString()/parse roundtrip", function() {
            var ev = new vscp.Event({
                "class": 10,
                "type": 6,
                "timestamp_ns": 1755792180000000000n
            });
            var ev2 = new vscp.Event(ev.getAsString());
            assert.equal(ev2.timestamp_ns, ev.timestamp_ns);
        });

    });

    describe('#nomenclature', function() {

        var ev = new vscp.Event({
            "head": 3,
            "obid": 1234,
            "timestamp_ns": "1755792180000000000",
            "class": 10,
            "type": 6,
            "guid": "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01",
            "data": [1,2,3,4,5]
        });

        // The deprecated nomenclature should give the very same event
        var deprecatedEv = new vscp.Event({
            "vscpHead": 3,
            "vscpObId": 1234,
            "vscpTimeStamp_ns": 1755792180000000000n,
            "vscpClass": 10,
            "vscpType": 6,
            "vscpGuid": "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01",
            "vscpData": [1,2,3,4,5]
        });

        it("should set head from both nomenclatures", function() {
            assert.equal(ev.head, 3);
            assert.equal(deprecatedEv.head, ev.head);
        });

        it("should set obid from both nomenclatures", function() {
            assert.equal(ev.obid, 1234);
            assert.equal(deprecatedEv.obid, ev.obid);
        });

        it("should set timestamp_ns from both nomenclatures", function() {
            assert.equal(ev.timestamp_ns, 1755792180000000000n);
            assert.equal(deprecatedEv.timestamp_ns, ev.timestamp_ns);
        });

        it("should set class from both nomenclatures", function() {
            assert.equal(ev.vscpclass, 10);
            assert.equal(deprecatedEv.vscpclass, ev.vscpclass);
        });

        it("should set type from both nomenclatures", function() {
            assert.equal(ev.vscptype, 6);
            assert.equal(deprecatedEv.vscptype, ev.vscptype);
        });

        it("should set guid from both nomenclatures", function() {
            assert.equal(ev.guid, "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01");
            assert.equal(deprecatedEv.guid, ev.guid);
        });

        it("should set data from both nomenclatures", function() {
            assert.deepEqual(ev.data, [1,2,3,4,5]);
            assert.deepEqual(deprecatedEv.data, ev.data);
        });

        it("should give the same string form for both nomenclatures", function() {
            assert.equal(deprecatedEv.getAsString(), ev.getAsString());
        });

        it("should read the members through the deprecated names", function() {
            assert.equal(ev.vscpHead, ev.head);
            assert.equal(ev.vscpObId, ev.obid);
            assert.equal(ev.vscpClass, ev.vscpclass);
            assert.equal(ev.vscpType, ev.vscptype);
            assert.equal(ev.vscpGuid, ev.guid);
            assert.equal(ev.vscpTimeStamp, ev.timestamp);
            assert.equal(ev.vscpTimeStamp_ns, ev.timestamp_ns);
            assert.equal(ev.vscpDateTime, ev.datetime);
            assert.deepEqual(ev.vscpData, ev.data);
        });

        it("should write the members through the deprecated names", function() {
            var ev = new vscp.Event();
            ev.vscpHead = 0x0007;
            ev.vscpClass = 10;
            ev.vscpType = 6;
            ev.vscpObId = 4;
            ev.vscpGuid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01";
            ev.vscpData = [1,2,3,4,5];
            ev.vscpTimeStamp = 4711;
            ev.vscpTimeStamp_ns = 1755792180000000000n;

            assert.equal(ev.head, 0x0007);
            assert.equal(ev.vscpclass, 10);
            assert.equal(ev.vscptype, 6);
            assert.equal(ev.obid, 4);
            assert.equal(ev.guid, "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01");
            assert.deepEqual(ev.data, [1,2,3,4,5]);
            assert.equal(ev.timestamp, 4711);
            assert.equal(ev.timestamp_ns, 1755792180000000000n);
        });

        it("should let the current nomenclature win if both are given", function() {
            var ev = new vscp.Event({
                "class": 10,
                "vscpclass": 20
            });
            assert.equal(ev.vscpclass, 20);
        });

        it("should accept the legacy JSON event form", function() {
            var ev = new vscp.Event({
                "head": 2,
                "obid": 123,
                "datetime": "2017-01-13T10:16:02Z",
                "timestamp": "0x50817",
                "class": 10,
                "type": 8,
                "guid": "00:00:00:00:00:00:00:00:00:00:00:00:00:01:00:02",
                "data": [1,2,3,4,5,6,7]
            });
            assert.equal(ev.head, 2);
            assert.equal(ev.obid, 123);
            assert.equal(ev.vscpclass, 10);
            assert.equal(ev.vscptype, 8);
            assert.equal(ev.timestamp, 0x50817);
            assert.equal(ev.datetime.toISOString(), "2017-01-13T10:16:02.000Z");
            assert.equal(ev.timestamp_ns,
                vscp.isoToUnixTimeNs("2017-01-13T10:16:02Z") + BigInt(0x50817) * 1000n);
            assert.equal(ev.data.length, 7);
        });

        it("should normalize a legacy JSON event string", function() {
            var ev = new vscp.Event(JSON.stringify({
                "vscpHead": 2,
                "vscpObId": 123,
                "vscpDateTime": "2017-01-13T10:16:02Z",
                "vscpTimeStamp": "0x50817",
                "vscpClass": 10,
                "vscpType": 8,
                "vscpGuid": "00:00:00:00:00:00:00:00:00:01:00:02:00:03:00:04:00:05",
                "vscpData": [1,2,3,4,5,6,7]
            }));
            assert.equal(ev.head, 2);
            assert.equal(ev.obid, 123);
            assert.equal(ev.vscpclass, 10);
            assert.equal(ev.vscptype, 8);
            assert.equal(ev.timestamp, 0x50817);
            assert.equal(ev.datetime.toISOString(), "2017-01-13T10:16:02.000Z");
            assert.equal(ev.timestamp_ns,
                vscp.isoToUnixTimeNs("2017-01-13T10:16:02Z") + BigInt(0x50817) * 1000n);
            assert.deepEqual(ev.data, [1,2,3,4,5,6,7]);
        });

        it("should emit only the new nomenclature from toJSONObj()", function() {
            var obj = JSON.parse(ev.toJSONObj());

            assert.equal(obj.head, 3);
            assert.equal(obj.obid, 1234);
            assert.equal(obj.vscpclass, 10);
            assert.equal(obj.vscptype, 6);
            assert.equal(obj.guid, "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01");
            assert.equal(obj.timestamp_ns, "0x" + ev.timestamp_ns.toString(16));
            assert.equal(typeof obj.timestamp, 'undefined');
            assert.equal(typeof obj.datetime, 'undefined');
            assert.deepEqual(obj.data, [1,2,3,4,5]);

            assert.equal(typeof obj.vscpHead, 'undefined');
            assert.equal(typeof obj.vscpObId, 'undefined');
            assert.equal(typeof obj.vscpClass, 'undefined');
            assert.equal(typeof obj.vscpType, 'undefined');
            assert.equal(typeof obj.vscpGuid, 'undefined');
            assert.equal(typeof obj.vscpTimeStamp, 'undefined');
            assert.equal(typeof obj.vscpTimeStamp_ns, 'undefined');
            assert.equal(typeof obj.vscpDateTime, 'undefined');
            assert.equal(typeof obj.vscpData, 'undefined');
        });

        it("should be possible to create an event from toJSONObj() output", function() {
            var ev2 = new vscp.Event(JSON.parse(ev.toJSONObj()));
            assert.equal(ev2.head, ev.head);
            assert.equal(ev2.obid, ev.obid);
            assert.equal(ev2.vscpclass, ev.vscpclass);
            assert.equal(ev2.vscptype, ev.vscptype);
            assert.equal(ev2.guid, ev.guid);
            assert.equal(ev2.timestamp_ns, ev.timestamp_ns);
            assert.deepEqual(ev2.data, ev.data);
        });

        it("should convert datetime+timestamp to timestamp_ns and write it as hex string", function() {
            var ev = new vscp.Event({
                "datetime": "2020-02-11T17:32:02Z",
                "timestamp": 0x50817
            });
            var expectedTsNs = vscp.isoToUnixTimeNs("2020-02-11T17:32:02Z") + BigInt(0x50817) * 1000n;

            assert.equal(ev.timestamp_ns, expectedTsNs);
            var obj = JSON.parse(ev.toJSONObj());
            assert.equal(obj.timestamp_ns, "0x" + expectedTsNs.toString(16));
            assert.equal(typeof obj.timestamp, 'undefined');
            assert.equal(typeof obj.datetime, 'undefined');
            assert.equal(typeof obj.vscpTimeStamp, 'undefined');
            assert.equal(typeof obj.vscpTimeStamp_ns, 'undefined');
            var ev2 = new vscp.Event(obj);
            assert.equal(ev2.timestamp_ns, expectedTsNs);
        });

    });

});
