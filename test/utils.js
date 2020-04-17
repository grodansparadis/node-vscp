var assert = require('assert');
const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');
const vscp = require("../src/vscp.js");

describe('VSCP Utils', function() {

    describe('vscp.readValue()', function() {

        it('Decimal number should return 666', function() {
            assert.equal(vscp.readValue("666"), 666);
        });

        it('Hex number should return 666', function() {
            assert.equal(vscp.readValue("0x29A"), 666);
        });

        it('Octal number should return 666', function() {
            assert.equal(vscp.readValue("0o1232"), 666);
        });

        it('Binary number should return 666', function() {
            assert.equal(vscp.readValue("0b0000001010011010"), 666);
        });

        it('Invalid number should return 0 for number starting with 0', function() {
            assert.equal(vscp.readValue("0s3456"), 0);
        });

        it('Non number should return true for non valid number (text)', function() {
            assert.equal(isNaN(vscp.readValue("error")), true);
        });

    });

    describe('vscp.getTime()', function() {

        it('Non number should return string', function() {
            assert.equal(typeof vscp.getTime(), 'string');
        });

    });
    
    describe('vscp.guidToStr()', function() {

        it('Array should return string "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:0E:0F"', function() {
            assert.equal(vscp.guidToStr([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]), 
                "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:0E:0F");
        });

        it('Buffer should return string "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:0E:0F"', function() {
            var buffer = Buffer.from([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
            assert.equal(vscp.guidToStr(buffer), 
                "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:0E:0F");
        });

    });

    describe('vscp.guidToStr()', function() {

        it('String "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:0E:0F" should return array ', function() {
            var arr = vscp.strToGuid("00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:0E:0F");
            assert.equal(arr[0], 0 );
            assert.equal(arr[1], 1 );
            assert.equal(arr[2], 2 );
            assert.equal(arr[3], 3 );
            assert.equal(arr[4], 4 );
            assert.equal(arr[5], 5 );
            assert.equal(arr[6], 6 );
            assert.equal(arr[7], 7 );
            assert.equal(arr[8], 8 );
            assert.equal(arr[9], 9 );
            assert.equal(arr[10], 10 );
            assert.equal(arr[11], 11 );
            assert.equal(arr[12], 12 );
            assert.equal(arr[13], 13 );
            assert.equal(arr[14], 14 );
            assert.equal(arr[15], 15 );
        });

    });

    describe('vscp.isGuidZero()', function() {

        it('Zero GUID string should return true', function() {
            assert.equal(vscp.isGuidZero("00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00"), true);
        });

        it('Short form zero GUID string should return true', function() {
            assert.equal(vscp.isGuidZero("-"), true);
        });

        it('Non zero GUID string should return false', function() {
            assert.equal(vscp.isGuidZero("00:00:00:00:00:00:00:00:01:00:00:00:00:00:00:00"), false);
        });

        it('Zero GUID array should return true', function() {
            assert.equal(vscp.isGuidZero([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]), true);
        });

        it('Non zero GUID array should return false', function() {
            assert.equal(vscp.isGuidZero([0,0,0,0,88,0,0,0,0,0,0,0,0,0,0,0]), false);
        });

        it('Zero GUID buffer should return true', function() {
            var buffer = Buffer.alloc(16);
            assert.equal(vscp.isGuidZero(buffer), true);
        });

        it('Non zero GUID buffer should return false', function() {
            var buffer = Buffer.alloc(16,0xff);
            assert.equal(vscp.isGuidZero(buffer), false);
        });
        
    });

    describe('vscp.getNodeId()', function() {

        it('should return 88 - String', function() {
            assert.equal(vscp.getNodeId("00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:00:58"), 88);
        });

        it('should return 1026 - String', function() {
            assert.equal(vscp.getNodeId("00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:04:2"), 1026);
        });

        it('should return 88 - Array', function() {
            assert.equal(vscp.getNodeId([0,0,0,0,88,0,0,0,0,0,0,0,0,0,0,88]), 88);
        });

        it('should return 1026 - Array', function() {
            assert.equal(vscp.getNodeId([0,0,0,0,88,0,0,0,0,0,0,0,0,0,4,2]), 1026);
        });

        it('should return 88 - Buffer', function() {
            var buffer = Buffer.alloc(16,0xff);
            buffer[14] = 0;
            buffer[15] = 88;
            assert.equal(vscp.getNodeId(buffer), 88);
        });

        it('should return 65535 - Array', function() {
            var buffer = Buffer.alloc(16,0xff);
            assert.equal(vscp.getNodeId(buffer), 65535);
        });

    });    

    describe('vscp.getNickName()', function() {

        it('should return 88 - String', function() {
            assert.equal(vscp.getNickName("00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:00:58"), 88);
        });

        it('should return 1026 - String', function() {
            assert.equal(vscp.getNickName("00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:04:2"), 1026);
        });

        it('should return 88 - Array', function() {
            assert.equal(vscp.getNickName([0,0,0,0,88,0,0,0,0,0,0,0,0,0,0,88]), 88);
        });

        it('should return 1026 - Array', function() {
            assert.equal(vscp.getNickName([0,0,0,0,88,0,0,0,0,0,0,0,0,0,4,2]), 1026);
        });

        it('should return 88 - Buffer', function() {
            var buffer = Buffer.alloc(16,0xff);
            buffer[14] = 0;
            buffer[15] = 88;
            assert.equal(vscp.getNickName(buffer), 88);
        });

        it('should return 65535 - Array', function() {
            var buffer = Buffer.alloc(16,0xff);
            assert.equal(vscp.getNickName(buffer), 65535);
        });

    });

    describe('vscp.setNodeId(guid, nodeid)', function() {

        it('should return "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:06:11"', function() {
            assert.equal(vscp.setNodeId("00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:00:00",1553), 
            "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:06:11" );
        });

        it('should return array [0,1,2,3,4,5,6,7,8,9,10.11,12,13,15,53]', function() {
            var arr = vscp.setNodeId([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],0x0102);
            assert.equal(arr[0],0);
            assert.equal(arr[1],1);
            assert.equal(arr[2],2);
            assert.equal(arr[3],3);
            assert.equal(arr[4],4);
            assert.equal(arr[5],5);
            assert.equal(arr[6],6);
            assert.equal(arr[7],7);
            assert.equal(arr[8],8);
            assert.equal(arr[9],9);
            assert.equal(arr[10],10);
            assert.equal(arr[11],11);
            assert.equal(arr[12],12);
            assert.equal(arr[13],13);
            assert.equal(arr[14],1);
            assert.equal(arr[15],2);
        });

        it('should return buffer [0,1,2,3,4,5,6,7,8,9,10.11,12,13,15,53]', function() {
            var buf1 = Buffer.from([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
            var buf2 = vscp.setNodeId(buf1,0x0102);
            assert.equal(buf2[0],0);
            assert.equal(buf2[1],1);
            assert.equal(buf2[2],2);
            assert.equal(buf2[3],3);
            assert.equal(buf2[4],4);
            assert.equal(buf2[5],5);
            assert.equal(buf2[6],6);
            assert.equal(buf2[7],7);
            assert.equal(buf2[8],8);
            assert.equal(buf2[9],9);
            assert.equal(buf2[10],10);
            assert.equal(buf2[11],11);
            assert.equal(buf2[12],12);
            assert.equal(buf2[13],13);
            assert.equal(buf2[14],1);
            assert.equal(buf2[15],2);
        });
    
    });


    describe('vscp.setNickName(guid, nodeid)', function() {

        it('should return "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:06:11"', function() {
            assert.equal(vscp.setNickName("00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:00:00",1553), 
            "00:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:06:11" );
        });

        it('should return array [0,1,2,3,4,5,6,7,8,9,10.11,12,13,15,53]', function() {
            var arr = vscp.setNickName([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],0x0102);
            assert.equal(arr[0],0);
            assert.equal(arr[1],1);
            assert.equal(arr[2],2);
            assert.equal(arr[3],3);
            assert.equal(arr[4],4);
            assert.equal(arr[5],5);
            assert.equal(arr[6],6);
            assert.equal(arr[7],7);
            assert.equal(arr[8],8);
            assert.equal(arr[9],9);
            assert.equal(arr[10],10);
            assert.equal(arr[11],11);
            assert.equal(arr[12],12);
            assert.equal(arr[13],13);
            assert.equal(arr[14],1);
            assert.equal(arr[15],2);
        });

        it('should return buffer [0,1,2,3,4,5,6,7,8,9,10.11,12,13,15,53]', function() {
            var buf1 = Buffer.from([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
            var buf2 = vscp.setNickName(buf1,0x0102);
            assert.equal(buf2[0],0);
            assert.equal(buf2[1],1);
            assert.equal(buf2[2],2);
            assert.equal(buf2[3],3);
            assert.equal(buf2[4],4);
            assert.equal(buf2[5],5);
            assert.equal(buf2[6],6);
            assert.equal(buf2[7],7);
            assert.equal(buf2[8],8);
            assert.equal(buf2[9],9);
            assert.equal(buf2[10],10);
            assert.equal(buf2[11],11);
            assert.equal(buf2[12],12);
            assert.equal(buf2[13],13);
            assert.equal(buf2[14],1);
            assert.equal(buf2[15],2);
        });
    
    });

    describe('vscp.b64EncodeUnicode(str)', function() {

        it('should return "VGhpcyBpcyBhIHN0cmluZw=="', function() {
            assert.equal(vscp.b64EncodeUnicode("This is a string"), "VGhpcyBpcyBhIHN0cmluZw==" );
        });

        it('should return "Y29weXJpZ2h0IMKpIMOlw6TDtsOFw4TDlg=="', function() {
            assert.equal(vscp.b64EncodeUnicode("copyright © åäöÅÄÖ"), "Y29weXJpZ2h0IMKpIMOlw6TDtsOFw4TDlg==" );
        });

    });

    describe('vscp.b64DecodeUnicode(str)', function() {

        it('should return "This is a string"', function() {
            assert.equal(vscp.b64DecodeUnicode("VGhpcyBpcyBhIHN0cmluZw=="), "This is a string" );
        });

        it('should return "copyright © åäöÅÄÖ"', function() {
            assert.equal(vscp.b64DecodeUnicode("Y29weXJpZ2h0IMKpIMOlw6TDtsOFw4TDlg=="), "copyright © åäöÅÄÖ" );
        });
        
    });


    describe('#isIPV6Addr(hdr)', function() {
        it("should return true if bit 12 is set in VSCP head", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x1000
            });
            assert.equal(vscp.isIPV6Addr(ev.vscpHead), true);
        });

        it("should return false if bit 12 is cleared in VSCP head", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(vscp.isIPV6Addr(ev.vscpHead), false);
        });
    });

    describe('#isDumbNode()', function() {
        it("should return true if bit 15 is set in VSCP head", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x8000
            });
            assert.equal(vscp.isDumbNode(ev.vscpHead), true);
        });

        it("should return false if bit 15 is cleared in VSCP head", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(vscp.isDumbNode(ev.vscpHead), false);
        });
    });

    describe('#getPriority()', function() {
        it("should return 7 from VSCP head (0x00E0)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x00E0
            });
            assert.equal(vscp.getPriority(ev.vscpHead), 7);
        });
    });

    describe('#getPriority()', function() {
        it("should return 3 from VSCP head (0x0060)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0060
            });
            assert.equal(vscp.getPriority(ev.vscpHead), 3);
        });
    });

    describe('#getPriority()', function() {
        it("should return 0 from VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(vscp.getPriority(ev.vscpHead), 0);
        });
    });

    describe('#getGuidType()', function() {
        it("should return bit 14,13,12 set in VSCP head (0x7000)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x7000
            });
            assert.equal(vscp.getGuidType(ev.vscpHead), 7);
        });
    });

    describe('#getGuidType()', function() {
        it("should return bit 14,13,12 cleared in VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(vscp.getGuidType(ev.vscpHead), 0);
        });
    });

    describe('#isHardCodedAddr()', function() {
        it("should return bit 5 set in VSCP head (0x0010)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(vscp.isHardCodedAddr(ev.vscpHead), false);
            ev.setHardCodedAddr();
            assert.equal(vscp.isHardCodedAddr(ev.vscpHead), true);
            assert.equal(ev.vscpHead, 0x0010);
        });
    });

    describe('#isDoNotCalcCRC()', function() {
        it("should return bit 5 set in VSCP head (0x0008)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(vscp.isDoNotCalcCRC(ev.vscpHead), false);
            ev.setDoNotCalcCRC();
            assert.equal(vscp.isDoNotCalcCRC(ev.vscpHead), true);
            assert.equal(ev.vscpHead, 0x0008);
        });
    });

    describe('#getRollingIndex()', function() {
        it("should return bit 3,2,1 cleared in VSCP head (0x0000)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0000
            });
            assert.equal(vscp.getRollingIndex(ev.vscpHead), 0);
        });
    });

    describe('#getRollingIndex()', function() {
        it("should return bit 3,2,1 set to 3 in VSCP head (0x0003)", function() {
            var ev = new vscp.Event({
                "vscpHead": 0x0003
            });
            assert.equal(vscp.getRollingIndex(ev.vscpHead), 3);
        });
    });    

});