var assert = require('assert');
const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');
const vscp = require("../src/vscp.js");

describe('CANAL helpers', function() {


/*
    Bit 15 - This is a dumb node. No MDF, register, nothing.
    Bit 14 - GUID type
    Bit 13 - GUID type
    Bit 12 - GUID type (GUID is IP v.6 address.)
    Bit 8-11 = Reserved
    Bit 765 =  priority, Priority 0-7 where 0 is highest.
    Bit 4 = hard coded, true for a hard coded device.
    Bit 3 = Don't calculate CRC, false for CRC usage.
            Just checked when CRC is used.
            If set the CRC should be set to 0xAA55 for
            the event to be accepted without a CRC check.
    Bit 2 = Rolling index.
    Bit 1 = Rolling index.
    Bit 0 = Rolling index.
*/
    describe('vscp.getVscpHeadFromCANALid(id)', function() {

        it('should return 0x00f0.', function() {
            var id = 0x1e0a0601; // Priority=7, Hardcoded
            var vscpHead = vscp.getVscpHeadFromCANALid(id);
            assert.equal(vscpHead, 0x00f0);
        });

        it('should return 0x00e0.', function() {
            var id = 0x1c0a0601; // Priority=7, NOT Hardcoded
            var vscpHead = vscp.getVscpHeadFromCANALid(id);
            assert.equal(vscpHead, 0x00e0);
        });

        it('should return 0x00e0.', function() {
            var id = 0x020a0601; // Priority=0, Hardcoded
            var vscpHead = vscp.getVscpHeadFromCANALid(id);
            assert.equal(vscpHead, 0x0010);
        });

    });

    describe('vscp.getVscpClassFromCANALid(id)', function() {

        it('should return 10.', function() {
            var id = 0x1e0a0601; // Priority=7, Hardcoded
            var vscpHead = vscp.getVscpClassFromCANALid(id);
            assert.equal(vscpHead, 10);
        });

    });

    describe('vscp.getVscpTypeFromCANALid(id)', function() {

        it('should return 6.', function() {
            var id = 0x1e0a0601; // Priority=7, Hardcoded
            var vscpHead = vscp.getVscpTypeFromCANALid(id);
            assert.equal(vscpHead, 6);
        });

    });

    describe('vscp.getNicknameFromCANALid(id)', function() {

        it('should return 1.', function() {
            var id = 0x1e0a0601; // Priority=7, Hardcoded
            var vscpHead = vscp.getNicknameFromCANALid(id);
            assert.equal(vscpHead, 1);
        });

    });

    describe('vscp.getCANALid(id)', function() {

        it('should return 656896.', function() {
            var id = vscp.getCANALid(0,10,6);
            assert.equal(id, 0x000a0600);
        });

        it('should return 470418944.', function() {
            var id = vscp.getCANALid(7,10,6);
            assert.equal(id, 0x1c0a0600);
        });

    });


    describe('vscp.convertEventToCanMsg(ev)', function() {

        it('should return 656897.', function() {
            // Define event with members
            var ev = new vscp.Event();
            ev.vscpObId = 1234;
            ev.vscpClass = 10;
            ev.vscpType = 6;
            ev.vscpData = [1,2,3,4,5];
            ev.vscpGuid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
            var canmsg = vscp.convertEventToCanMsg(ev);
            assert.equal(canmsg.id, 0x000a0632);
        });

        it('should return 1234.', function() {
            // Define event with members
            var ev = new vscp.Event();
            ev.vscpObId = 1234;
            ev.vscpClass = 10;
            ev.vscpType = 6;
            ev.vscpData = [1,2,3,4,5];
            ev.vscpGuid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
            var canmsg = vscp.convertEventToCanMsg(ev);
            assert.equal(canmsg.obid, 1234);
        });

        it('should return 0.', function() {
            // Define event with members
            var ev = new vscp.Event();
            ev.vscpObId = 1234;
            ev.vscpClass = 10;
            ev.vscpType = 6;
            ev.vscpData = [1,2,3,4,5];
            ev.vscpGuid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
            var canmsg = vscp.convertEventToCanMsg(ev);
            assert.equal(canmsg.timestamp, 0);
        });

        it('should return [1,2,3,4,5].', function() {
            // Define event with members
            var ev = new vscp.Event();
            ev.vscpObId = 1234;
            ev.vscpClass = 10;
            ev.vscpType = 6;
            ev.vscpData = [1,2,3,4,5];
            ev.vscpGuid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
            var canmsg = vscp.convertEventToCanMsg(ev);
            assert.equal(canmsg.data.length, 5);
            assert.equal(canmsg.data[0], 1);
            assert.equal(canmsg.data[1], 2);
            assert.equal(canmsg.data[2], 3);
            assert.equal(canmsg.data[3], 4);
            assert.equal(canmsg.data[4], 5);
        });

        it('should return 1.', function() {
            // Define event with members
            var ev = new vscp.Event();
            ev.vscpObId = 1234;
            ev.vscpClass = 10;
            ev.vscpType = 6;
            ev.vscpData = [1,2,3,4,5];
            ev.vscpGuid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
            var canmsg = vscp.convertEventToCanMsg(ev);
            assert.equal(canmsg.flags, 1);
        });

    });   

    describe('vscp.convertCanMsgToEvent(ev)', function() {

        it('should return 10.', function() {
            var canmsg = {
                "id": vscp.getCANALid(7,10,6)+42,
                "ext": true,
                "rtr": false,
                "dlc": 4,
                "data": "1,2,3,4"
            };
            var ev = vscp.convertCanMsgToEvent(canmsg);
            assert.equal(ev.vscpClass, 10);
        });

        it('should return 6.', function() {
            var canmsg = {
                "id": vscp.getCANALid(7,10,6)+42,
                "ext": true,
                "rtr": false,
                "dlc": 4,
                "data": "1,2,3,4"
            };
            var ev = vscp.convertCanMsgToEvent(canmsg);
            assert.equal(ev.vscpType, 6);
        });

        it('should return 42.', function() {
            var canmsg = {
                "id": vscp.getCANALid(7,10,6)+42,
                "ext": true,
                "rtr": false,
                "dlc": 4,
                "data": "1,2,3,4"
            };
            var ev = vscp.convertCanMsgToEvent(canmsg);
            assert.equal(vscp.getNickName(ev.vscpGuid), 42);
        });

        it('should return 0xE0.', function() {
            var canmsg = {
                "id": vscp.getCANALid(7,10,6)+42,
                "ext": true,
                "rtr": false,
                "dlc": 4,
                "data": "1,2,3,4"
            };
            var ev = vscp.convertCanMsgToEvent(canmsg);
            assert.equal(ev.vscpHead, 0xE0);
        });

        it('should return 0xE0.', function() {
            var canmsg = {
                "id": vscp.getCANALid(1,10,6)+42,
                "ext": true,
                "rtr": false,
                "dlc": 4,
                "data": "1,2,3,4"
            };
            var ev = vscp.convertCanMsgToEvent(canmsg);
            assert.equal(ev.vscpHead, 0x20);
        });

        it('should return [1,2,3,4].', function() {
            var canmsg = {
                "id": vscp.getCANALid(7,10,6)+42,
                "ext": true,
                "rtr": false,
                "dlc": 4,
                "data": "1,2,3,4"
            };
            var ev = vscp.convertCanMsgToEvent(canmsg);
            assert.equal(ev.vscpData.length, 4);
            assert.equal(ev.vscpData[0], 1);
            assert.equal(ev.vscpData[1], 2);
            assert.equal(ev.vscpData[2], 3);
            assert.equal(ev.vscpData[3], 4);
        });

    });

});