var assert = require('assert');
const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');
const vscp = require("../src/vscp.js");

// ----------------------------------------------------------------------------
// CANAL tests
// ----------------------------------------------------------------------------

describe('CANAL helpers', function() {
  /*
    Bit 15 - This is a dumb node. No MDF, register, nothing.
    Bit 14 - GUID type
    Bit 13 - GUID type
    Bit 12 - GUID type (GUID is IP v.6 address.)
    Bit 10-11 = Reserved
    Bit 8-9 - Frame version. (0 = original, 1 = frame with Unix ns timestamp, 2 = reserved, 3 = reserved)
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
  describe("vscp.getVscpHeadFromCANALid(id)", function () {
    it("should return 0x00f0.", function () {
      var id = 0x1e0a0601; // Priority=7, Hardcoded
      var head = vscp.getVscpHeadFromCANALid(id);
      assert.equal(head, 0x00f0);
    });

    it("should return 0x00e0.", function () {
      var id = 0x1c0a0601; // Priority=7, NOT Hardcoded
      var head = vscp.getVscpHeadFromCANALid(id);
      assert.equal(head, 0x00e0);
    });

    it("should return 0x00e0.", function () {
      var id = 0x020a0601; // Priority=0, Hardcoded
      var head = vscp.getVscpHeadFromCANALid(id);
      assert.equal(head, 0x0010);
    });
  });

  describe("vscp.getVscpClassFromCANALid(id)", function () {
    it("should return 10.", function () {
      var id = 0x1e0a0601; // Priority=7, Hardcoded
      var head = vscp.getVscpClassFromCANALid(id);
      assert.equal(head, 10);
    });
  });

  describe("vscp.getVscpTypeFromCANALid(id)", function () {
    it("should return 6.", function () {
      var id = 0x1e0a0601; // Priority=7, Hardcoded
      var head = vscp.getVscpTypeFromCANALid(id);
      assert.equal(head, 6);
    });
  });

  describe("vscp.getNicknameFromCANALid(id)", function () {
    it("should return 1.", function () {
      var id = 0x1e0a0601; // Priority=7, Hardcoded
      var head = vscp.getNicknameFromCANALid(id);
      assert.equal(head, 1);
    });
  });

  describe("vscp.getCANALid(id)", function () {
    it("should return 656896.", function () {
      var id = vscp.getCANALid(0, 10, 6);
      assert.equal(id, 0x000a0600);
    });

    it("should return 470418944.", function () {
      var id = vscp.getCANALid(7, 10, 6);
      assert.equal(id, 0x1c0a0600);
    });
  });

  describe("vscp.convertEventToCanMsg(ev)", function () {
    it("should return 656897.", function () {
      // Define event with members
      var ev = new vscp.Event();
      ev.obid = 1234;
      ev.class = 10;
      ev.type = 6;
      ev.data = [1, 2, 3, 4, 5];
      ev.guid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
      var canmsg = vscp.convertEventToCanMsg(ev);
      assert.equal(canmsg.id, 0x000a0632);
    });

    it("should return 1234.", function () {
      // Define event with members
      var ev = new vscp.Event();
      ev.obid = 1234;
      ev.class = 10;
      ev.type = 6;
      ev.data = [1, 2, 3, 4, 5];
      ev.guid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
      var canmsg = vscp.convertEventToCanMsg(ev);
      assert.equal(canmsg.obid, 1234);
    });

    it("should return 0.", function () {
      // Define event with members
      var ev = new vscp.Event();
      ev.obid = 1234;
      ev.class = 10;
      ev.type = 6;
      ev.data = [1, 2, 3, 4, 5];
      ev.guid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
      var canmsg = vscp.convertEventToCanMsg(ev);
      assert.equal(canmsg.timestamp, 0);
    });

    it("should return 32-bit unsigned timestamp.", function () {
      var ev = new vscp.Event();
      ev.class = 10;
      ev.type = 6;
      ev.data = [1, 2, 3, 4, 5];
      ev.guid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
      ev.timestamp_ns = 0x1ffffffffn;
      var canmsg = vscp.convertEventToCanMsg(ev);
      assert.equal(canmsg.timestamp, 0xfffffc18);
    });

    it("should derive timestamp from timestamp_ns * 1000.", function () {
      var ev = new vscp.Event();
      ev.class = 10;
      ev.type = 6;
      ev.data = [1, 2, 3, 4, 5];
      ev.guid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
      ev.timestamp_ns = 3456n;
      var canmsg = vscp.convertEventToCanMsg(ev);
      assert.equal(canmsg.timestamp, 3456000);
    });

    it("should not include timestamp_ns in CANAL message.", function () {
      var ev = new vscp.Event();
      ev.class = 10;
      ev.type = 6;
      ev.data = [1, 2, 3, 4, 5];
      ev.guid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
      var canmsg = vscp.convertEventToCanMsg(ev);
      assert.equal(typeof canmsg.timestamp_ns, "undefined");
    });

    it("should return [1,2,3,4,5].", function () {
      // Define event with members
      var ev = new vscp.Event();
      ev.obid = 1234;
      ev.class = 10;
      ev.type = 6;
      ev.data = [1, 2, 3, 4, 5];
      ev.guid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
      var canmsg = vscp.convertEventToCanMsg(ev);
      assert.equal(canmsg.data.length, 5);
      assert.equal(canmsg.data[0], 1);
      assert.equal(canmsg.data[1], 2);
      assert.equal(canmsg.data[2], 3);
      assert.equal(canmsg.data[3], 4);
      assert.equal(canmsg.data[4], 5);
    });

    it("should return 1.", function () {
      // Define event with members
      var ev = new vscp.Event();
      ev.obid = 1234;
      ev.class = 10;
      ev.type = 6;
      ev.data = [1, 2, 3, 4, 5];
      ev.guid = "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:32";
      var canmsg = vscp.convertEventToCanMsg(ev);
      assert.equal(canmsg.flags, 1);
    });
  });

  describe("vscp.convertCanMsgToEvent(ev)", function () {
    it("should return 10.", function () {
      var canmsg = {
        id: vscp.getCANALid(7, 10, 6) + 42,
        ext: true,
        rtr: false,
        dlc: 4,
        data: "1,2,3,4",
      };
      var ev = vscp.convertCanMsgToEvent(canmsg);
      assert.equal(ev.class, 10);
    });

    it("should return 6.", function () {
      var canmsg = {
        id: vscp.getCANALid(7, 10, 6) + 42,
        ext: true,
        rtr: false,
        dlc: 4,
        data: "1,2,3,4",
      };
      var ev = vscp.convertCanMsgToEvent(canmsg);
      assert.equal(ev.type, 6);
    });

    it("should return 42.", function () {
      var canmsg = {
        id: vscp.getCANALid(7, 10, 6) + 42,
        ext: true,
        rtr: false,
        dlc: 4,
        data: "1,2,3,4",
      };
      var ev = vscp.convertCanMsgToEvent(canmsg);
      assert.equal(vscp.getNickName(ev.guid), 42);
    });

    it("should return 0xE0.", function () {
      var canmsg = {
        id: vscp.getCANALid(7, 10, 6) + 42,
        ext: true,
        rtr: false,
        dlc: 4,
        data: "1,2,3,4",
      };
      var ev = vscp.convertCanMsgToEvent(canmsg);
      assert.equal(ev.head, 0xe0);
    });

    it("should return 0xE0.", function () {
      var canmsg = {
        id: vscp.getCANALid(1, 10, 6) + 42,
        ext: true,
        rtr: false,
        dlc: 4,
        data: "1,2,3,4",
      };
      var ev = vscp.convertCanMsgToEvent(canmsg);
      assert.equal(ev.head, 0x20);
    });

    it("should return [1,2,3,4].", function () {
      var canmsg = {
        id: vscp.getCANALid(7, 10, 6) + 42,
        ext: true,
        rtr: false,
        dlc: 4,
        data: "1,2,3,4",
      };
      var ev = vscp.convertCanMsgToEvent(canmsg);
      assert.equal(ev.data.length, 4);
      assert.equal(ev.data[0], 1);
      assert.equal(ev.data[1], 2);
      assert.equal(ev.data[2], 3);
      assert.equal(ev.data[3], 4);
    });

    it("should read 32-bit unsigned timestamp into timestamp_ns hex string.", function () {
      var canmsg = {
        id: vscp.getCANALid(7, 10, 6) + 42,
        ext: true,
        rtr: false,
        timestamp: 0x1ffffffff,
        dlc: 4,
        data: "1,2,3,4",
      };
      var ev = vscp.convertCanMsgToEvent(canmsg);
      assert.equal(typeof ev.timestamp, "undefined");
      assert.equal(typeof ev.datetime, "undefined");
      assert.equal(ev.timestamp_ns, "0x" + (0xffffffffn * 1000n).toString(16));
    });

    it("should not read timestamp_ns from CANAL message.", function () {
      var canmsg = {
        id: vscp.getCANALid(7, 10, 6) + 42,
        ext: true,
        rtr: false,
        timestamp: 1234,
        timestamp_ns: "1755792180000000000",
        dlc: 4,
        data: "1,2,3,4",
      };
      var ev = vscp.convertCanMsgToEvent(canmsg);
      assert.equal(typeof ev.timestamp, "undefined");
      assert.equal(typeof ev.datetime, "undefined");
      assert.equal(ev.timestamp_ns, "0x" + (1234n * 1000n).toString(16));
    });
  });
});