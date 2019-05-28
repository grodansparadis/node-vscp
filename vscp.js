// VSCP common javascript library
//
// Copyright (C) 2012-2019 Ake Hedman, Grodans Paradis AB
// <akhe@grodansparadis.com>
// Copyright (c) 2015-2019 Andreas Merkle
// <vscp@blue-andi.de>
//
// Licence:
// The MIT License (MIT)
// [OSI Approved License]
//
// The MIT License (MIT)
//
// Copyright (c) 2012-2019 Grodans Paradis AB (Paradise of the Frog)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// Alternative licenses for VSCP & Friends may be arranged by contacting
// Grodans Paradis AB at info@grodansparadis.com, http://www.grodansparadis.com
//

var exports = module.exports = {};

/** VSCP core javascript library version
 * @property {number} major - Major version number
 * @property {number} minor - Minor version number
 * @property {number} patch - Sub-minor version number
 */
const version = {
    major: 1,
    minor: 0,
    patch: 0
};

/* !!! VSCP classes and types see in the autogenerated files vscp_class.js and vscp_type.js !!! */

/** VSCP class priorities
 * @enum {number}
 * @const
 */
const priorities = {
    PRIORITY_0_HIGH: 0,
    PRIORITY_1: 1,
    PRIORITY_2: 2,
    PRIORITY_3_NORMAL: 3,
    PRIORITY_4: 4,
    PRIORITY_5: 5,
    PRIORITY_6: 6,
    PRIORITY_7_LOW: 7
};


/** VSCP variable types
 * @enum {number}
 * @const
 */
const varTypes = {
    UNASSIGNED: 0, // Unassigned variable
    STRING: 1, // String value (Base64 encoded)
    BOOLEAN: 2, // Boolean value (true, false, 0 or 1)
    INTEGER: 3, // Integer value
    LONG: 4, // Long value
    DOUBLE: 5, // Double value
    MEASUREMENT: 6, // String representation of the measurement.
    EVENT: 7, // VSCP event head, class, type, obId, timestamp, GUID, data 1, data 2, data ...
    GUID: 8, // Standard GUID string format: FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF
    EVENT_DATA: 9, // Comma separated list with decimal values. 1,2,3,4,5,6,7,8, ...
    EVENT_CLASS: 10, // Integer value for VSCP class
    EVENT_TYPE: 11, // Integer value for VSCP type
    EVENT_TIMESTAMP: 12, // Time when event was received in ms
    DATE_TIME: 13, // Date + Time in ISO format 2008-11-07T20:10.00
    DATE: 14, //  ISO date 2008-11-07
    TIME: 15, //  ISO Time 20:10.00
    BLOB: 16, //  Base64 encoded binary data.
    MIME: 100, //  Base64 mime types data base64(mimetype;data)
    HTML: 101, //  Base64 encoded HTML data.
    JAVASCIPT: 102, //  Base64 encoded Javascript data.
    JSON: 103, //  Base64 encoded JSON data.
    XML: 104, //  Base64 encoded XML data.
    SQL: 105, //  Base64 encoded SQL data.
    LUA: 201, //  Base64 encoded LUA data.
    LUARES: 202, //  Base64 encoded LUA result data.
    UXTYPE1: 300, //  Base64 encoded UX Type 1 data.
    DMROW: 500, //  Base64 encoded DM data row.
    DRIVER: 501, //  Base64 encoded Driver data row.
    USER: 502, //  Base64 encoded User data row.
    FILTER: 503 //  Base64 encoded Filter data data.
};

/** VSCP variable type names as string. Use to fill drop down boxes and similar.
 * @const
 */
const varTypeNames = [
    "Unassigned", // Unassigned variable
    "String", // String value (Base64 encoded)
    "Boolean", // Boolean value (true, false, 0 or 1)
    "Integer", // Integer value
    "Long", // Long value
    "Double", // Double value
    "Measurement", // String representation of the measurement.
    "Event", // VSCP event head, class, type, obId, timestamp, GUID, data 1, data 2, data ...
    "GUID", // Standard GUID string format: FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF
    "Event Data", // Comma separated list with decimal values. 1,2,3,4,5,6,7,8, ...
    "Event Class", // Integer value for VSCP class
    "Event Type", // Integer value for VSCP type
    "Event Timestamp", // Time when event was received in ms
    "Data/Time", // Date + Time in ISO format 2008-11-07T20:10.00
    "Date", //  ISO date 2008-11-07
    "Time", //  ISO Time 20:10.00
    "Blob", //  Base64 encoded binary data.
    "Mime", //  Base64 mime types data base64(mimetype;data)
    "HTML", //  Base64 encoded HTML data.
    "JavaScript", //  Base64 encoded Javascript data.
    "JSON", //  Base64 encoded JSON data.
    "XML", //  Base64 encoded XML data.
    "SQL", //  Base64 encoded SQL data.
    "LUA", //  Base64 encoded LUA data.
    "LUARES", //  Base64 encoded LUA result data.
    "UXType1", //  Base64 encoded UX Type 1 data.
    "DMRow", //  Base64 encoded DM data row.
    "Driver", //  Base64 encoded Driver data row.
    "User", //  Base64 encoded User data row.
    "Filter"  // Filter for channel
];

/** VSCP host capabilities (wcyd - What Can You Do)
 * @enum {number}
 * @const
 */
const hostCapabilities = {
    REMOTE_VARIABLE:      (1<<63),
    DECISION_MATRIX:      (1<<62),
    INTERFACE:            (1<<61),
    TCPIP:                (1<<15),
    UDP:                  (1<<14),
    MULTICAST_ANNOUNCE:   (1<<13),
    RAWETH:               (1<<12),
    WEB:                  (1<<11),
    WEBSOCKET:            (1<<10),
    REST:                 (1<<9),
    MULTICAST_CHANNEL:    (1<<8),
    IP6:                  (1<<6),
    IP4:                  (1<<5),
    SSL:                  (1<<4),
    TWO_CONNECTIONS:      (1<<3),
    AES256:               (1<<2),
    AES192:               (1<<1),
    AES128:               1

/* ---------------------------------------------------------------------- */


/**
 * VSCP event.
 * @class
 *
 * @param {object} options                              - Options
 * @param {number} options.vscpHead                     - Event head
 * @param {boolean} options.guidIsIpV6Addr              - GUID is a IPv6 address
 * @param {boolean} options.dumbNode                    - Node is a dumb node
 * @param {number} options.vscpPriority                 - Priority
 * @param {boolean} options.vscpHardCoded               - Hard coded node id
 * @param {boolean} options.vscpCalcCRC                 - Calculate CRC
 * @param {number} options.vscpClass                    - VSCP class
 * @param {number} options.vscpType                     - VSCP type
 * @param {number} options.vscpObId                     - Object id
 * @param {number} options.vscpTimeStamp                - Timestamp
 * @param {string} options.vscpGuid                     - GUID string
 * @param {(number[]|string)} options.vscpData          - Event data
 */
Event = function(options) {

    /** VSCP event head
     * @member {number}
     */
    this.vscpHead = 0;

    /** VSCP class
     * @member {number}
     */
    this.vscpClass = 0;

    /** VSCP type
     * @member {number}
     */
    this.vscpType = 0;

    /** VSCP object id used by driver for channel info and etc.
     * @member {number}
     */
    this.vscpObId = 0;

    /** Relative timestamp for package in us
     * @member {number}
     */
    this.vscpTimeStamp = 0;

    /** Date/Time for package
     * @member {date}
     */
    this.vscpDateTime = new Date();

    /** Node global unique id LSB(15) -> MSB(0)
     * @member {string}
     */
    this.vscpGuid = "-";

    /** Data array or string
     * @member {(number[]|string)}
     */
    this.vscpData = [];

    if ("undefined" !== typeof options) {

        if ("number" === typeof options.vscpHead) {
            this.vscpHead = options.vscpHead;
        }

        if ("boolean" === typeof options.guidIsIpV6Addr) {
            if (false === options.guidIsIpV6Addr) {
                this.vscpHead &= 0xefff;
            } else {
                this.vscpHead |= 0x8000;
            }
        }

        if ("boolean" === typeof options.dumpNode) {
            if (false === options.dumpNode) {
                this.vscpHead &= 0xbfff;
            } else {
                this.vscpHead |= 0x4000;
            }
        }

        if ("number" === typeof options.vscpPriority) {
            if ((0 <= options.vscpPriority) && (7 >= options.vscpPriority)) {
                this.vscpHead &= 0xff1f;
                this.vscpHead |= (options.vscpPriority << 5);
            }
        }

        if ("boolean" === typeof options.vscpHardCoded) {
            if (false === options.vscpHardCoded) {
                this.vscpHead &= 0xffef;
            } else {
                this.vscpHead |= 0x0010;
            }
        }

        if ("boolean" === typeof options.vscpCalcCRC) {
            if (false === options.vscpCalcCRC) {
                this.vscpHead &= 0xfff7;
            } else {
                this.vscpHead |= 0x0008;
            }
        }

        if ("number" === typeof options.vscpClass) {
            this.vscpClass = options.vscpClass;
        }

        if ("number" === typeof options.vscpType) {
            this.vscpType = options.vscpType;
        }

        if ("number" === typeof options.vscpObId) {
            this.vscpObId = options.vscpObId;
        }

        if ("number" === typeof options.vscpTimeStamp) {
            this.vscpTimeStamp = options.vscpTimeStamp;
        }

        if ("string" === typeof options.vscpDateTime) {
            // Time in UTC for events but conversion
            // is done in send routine
            this.vscpDateTime  = new Date(options.vscpDateTime);
        } else if (true === (options.vscpDateTime instanceof Date)) {
            // Time should be local
            this.vscpDateTime = options.vscpDateTime;
        }

        if ("string" === typeof options.vscpGuid) {
            this.vscpGuid = options.vscpGuid;
        }

        if (("string" === typeof options.vscpData) ||
            (true === (options.vscpData instanceof Array))) {
            this.vscpData = options.vscpData;
        }
    }
};

/**
 * Set GUID as IP v6 address
 */
Event.prototype.setIPV6Addr = function() {
    this.vscpHead |= 0x8000;
};

/**
 * Is GUID a IP v6 address or not?
 *
 * @return {boolean} If the GUID is a IP v6 address, it will return true, otherwise false.
 */
Event.prototype.isIPV6Addr = function() {
    var result = false;

    if (0 < (this.vscpHead & 0x8000)) {
        result = true;
    }

    return result;
};

/**
 * Set dumb node. No MDF, registers, nothing.
 */
Event.prototype.setDumbNode = function() {
    this.vscpHead |= 0x4000;
};

/**
 * Is node a dump node or not?
 * Dumb node means no MDF, registers, nothing.
 *
 * @return {boolean} If the node is a dumb node, it will return true, otherwise false.
 */
Event.prototype.isDumbNode = function() {
    var result = false;

    if (0 < (this.vscpHead & 0x4000)) {
        result = true;
    }

    return result;
};

/**
 * Set the VSCP event priority.
 *
 * @param {number} priority  -  Priority
 */
Event.prototype.setPriority = function(priority) {
    if ((0 <= priority) && (7 >= priority)) {
        this.vscpHead &= 0xff1f;
        this.vscpHead |= (priority << 5);
    }
};

/**
 * Get the VSCP event priority.
 *
 * @return {number} Priority of the event.
 */
Event.prototype.getPriority = function() {
    return (this.vscpHead >> 5) & 0x0007;
};

/**
 * Set the node id of the event sender as hard coded?
 */
Event.prototype.setHardCodedAddr = function() {
    this.vscpHead |= 0x0010;
};

/**
 * Is the node id of the event sender hard coded or not?
 *
 * @return {boolean} If the node id is hard coded, it will return true, otherwise false.
 */
Event.prototype.isHardCodedAddr = function() {
    var result = false;

    if (0 < (this.vscpHead & 0x0010)) {
        result = true;
    }

    return result;
};

/**
 * Set flag for no CRC calculation?
 */
Event.prototype.setDoNotCalcCRC = function() {
    this.vscpHead |= 0x0008;
};

/**
 * Is CRC calculated or not?
 *
 * @return {boolean} If nor CRC should be calculated true is returned.
 */
Event.prototype.isDoNotCalcCRC = function() {
    var result = false;

    if (0 < (this.vscpHead & 0x0008)) {
        result = true;
    }

    return result;
};

/**
 * Get event as string.
 * @return {string} Event as string
 */
Event.prototype.getText = function() {
    var index = 0;
    var str = '';

    str += this.vscpHead.toString() + ",";
    str += this.vscpClass.toString() + ",";
    str += this.vscpType.toString() + ",";
    str += this.vscpObId.toString() + ",";
    str += this.vscpDateTime.toISOString() + ",";
    str += this.vscpTimeStamp.toString() + ",";
    str += this.vscpGuid;

    if (this.vscpData instanceof Array) {

        if (0 < this.vscpData.length) {
            str += ",";
        }

        for (index = 0; index < this.vscpData.length; ++index) {
            str += this.vscpData[index].toString();

            if ((this.vscpData.length - 1) > index) {
                str += ",";
            }
        }

    } else if ("string" === typeof this.vscpData) {

        if (0 < this.vscpData.length) {
            str += ",";
        }

        str += this.vscpData;
    } else {
        console.error(getTime() + " Invalid VSCP event data.");
    }

    return str;
};

/**
 * Set event from string.
 * @return {string} Event as string
 */
Event.prototype.setFromText = function(str) {
    if ("string" !== typeof str) {
        console.error(vscp.getTime() + " VSCP event is not in string form.");
        reject(Error("VSCP event is not in string form."));
    }

    ea = str.spit(',');

    // Get head
    if ( ea.length ) {
        this.vscpHead = readValue(ea[0]);
    }

    // Get VSCP class
    if ( ea.length > 1 ) {
        this.vscpClass = readValue(ea[1]);
    }

    // Get VSCP type
    if ( ea.length > 2 ) {
        this.vscpType = readValue(ea[2]);
    }

    // Get VSCP obid
    if ( ea.length > 3 ) {
        this.vscpObId = readValue(ea[3]);
    }

    // Get VSCP datetime
    vscpDateTime = new Date(Date.UTC(0, 0, 0, 0, 0, 0));  //  Sun, 31 Dec 1899 00:00:00 GMT
    if ( ea.length > 4 ) {
        this.vscpDateTime(ea[4]);
    }

    // Get VSCP GUID
    this.vscpGuid = "-";
    if ( ea.length > 5 ) {
        this.vscpGuid = ea[5];
    }

    // Get VSCP data
    this.vscpData = [];
    if ( ea.length > 6 ) {
        for (let i=6; i<ea.length; i++) {
            this.vscpData[i] = readValue(ea[i]);
        }
    }
}

/* ---------------------------------------------------------------------- */


/** Read a hex or decimal value and return as an integer.
 * @param {string} input    - Hex or decimal value as string
 * @return {number} Value
 */
readValue = function(input) {
    var txtvalue = input.toLowerCase();
    var pos = txtvalue.indexOf("0x");
    if (-1 == pos) {
        return parseInt(txtvalue);
    } else {
        txtvalue = txtvalue.substring(pos + 2);
        return parseInt(txtvalue, 16);
    }
};

/**
 * Utility function which returns the current time in the following format: hh:mm:ss.us
 *
 * @return {string} Current time in the format hh:mm:ss.us
 */
getTime = function() {

    var now = new Date();

    var paddingHead = function(num, size) {
        var str = num + "";

        while (str.length < size) {
            str = "0" + str;
        }

        return str;
    };

    var paddingTail = function(num, size) {
        var str = num + "";

        while (str.length < size) {
            str = str + "0";
        }

        return str;
    };

    return "" + paddingHead(now.getHours(), 2) + ":" +
        paddingHead(now.getMinutes(), 2) + ":" +
        paddingHead(now.getSeconds(), 2) + "." +
        paddingTail(now.getMilliseconds(), 3);
};

/**
 * Converts a GUID number array to a GUID string.
 *
 * @param {number[]} guid - GUID number array
 * @return {string} GUID string, e.g. 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 */
guidToStr = function(guid) {

    var guidStr = "";
    var index = 0;
    var hexValue = "";

    for (index = 0; index < guid.length; ++index) {
        hexValue = guid[index].toString(16).toUpperCase();
        if (2 > hexValue.length) {
            hexValue = "0" + hexValue;
        }

        guidStr += hexValue;

        if (index < (guid.length - 1)) {
            guidStr += ":";
        }
    }

    return guidStr;
};

/**
 * Converts a GUID string to a GUID number array.
 *
 * @param {string} guid - GUID string, e.g. 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @return {number[]} GUID number array and array with length != 16 for  invalid GUID
 */
strToGuid = function(str) {

    var guid = [];
    var items = [];
    var index = 0;

    if ("undefined" === typeof str) {
        return guid;
    }

    if ("string" !== typeof str) {
        return guid;
    }

    // If GUID is "-" use interface GUID
    if ("-" === str.trim()) {
        str = "00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00";
    }

    items = str.split(":");

    if (16 !== items.length) {
        return guid;
    }

    for (index = 0; index < items.length; ++index) {
        guid.push(parseInt(items[index], 16));
    }

    return guid;
};

/**
 * Converts a GUID string to a GUID number array.
 *
 * @param {string|array} guid - GUID string/array
 * @return {boolean} True if guid is all nills
 */

isGuidZero = function (guid) {

    if ("undefined" === typeof guid) {
        return false;
    }

    if ("string" === typeof guid) {
        guid = vscp.strToGuid(guid);
    }

    for (let i = 0; i < 16; i++) {
        if (guid[i]) return false;
    }

    return true;
}

/**
 * Get node id from a node GUID string.
 *
 * @param {string} guid - GUID string, e.g. 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @return {number} Node id
 */
getNodeId = function(guid) {

    if ("undefined" === typeof guid) {
        return 0;
    }

    if ("string" !== typeof guid) {
        return 0;
    }

    return parseInt(guid.split(":")[15], 16);
};

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
// Since DOMStrings are 16-bit-encoded strings, in most browsers calling window.btoa
// on a Unicode string will cause a Character Out Of Range exception if a character
// exceeds the range of a 8-bit ASCII-encoded character.

/** Encode base64 unicode safe.
 * @param {string} str  - Unicode string
 * @return {string} Base64
 */
b64EncodeUnicode = function(str) {
    return new Buffer.from(str, 'binary').toString('base64');
};

/** Decode base64 unicode safe.
 * @param {string} str  - Base64
 * @return {string} Unicode string
 * Note: prior to Node v4, use new Buffer rather than Buffer.from.
 */
b64DecodeUnicode = function(str) {
    return new Buffer.from(str, 'base64').toString('binary');
};

/** Get variable type name as string by numerical code.
 * @param {number} n    - Numerical code
 * @return {string} Variable type name
 * Note: prior to Node v4, use new Buffer rather than Buffer.from.
 */
getVarTypeName = function(n) {
    if (varTypes.UNASSIGNED == n) {
        return "unassigned";
    } else if (varTypes.STRING == n) {
        return "String";
    } else if (varTypes.BOOLEAN == n) {
        return "Boolean";
    } else if (varTypes.INTEGER == n) {
        return "Integer";
    } else if (varTypes.LONG == n) {
        return "Long";
    } else if (varTypes.DOUBLE == n) {
        return "Double";
    } else if (varTypes.MEASUREMENT == n) {
        return "Measurement";
    } else if (varTypes.EVENT == n) {
        return "Event";
    } else if (varTypes.GUID == n) {
        return "GUID";
    } else if (varTypes.EVENT_DATA == n) {
        return "Event data";
    } else if (varTypes.EVENT_CLASS == n) {
        return "Event class";
    } else if (varTypes.EVENT_TYPE == n) {
        return "Event type";
    } else if (varTypes.EVENT_TIMESTAMP == n) {
        return "Event timestamp";
    } else if (varTypes.DATE_TIME == n) {
        return "Date and Time";
    } else if (varTypes.DATE == n) {
        return "Date";
    } else if (varTypes.TIME == n) {
        return "Time";
    } else if (varTypes.BLOB == n) {
        return "Blob";
    } else if (varTypes.MIME == n) {
        return "Mime";
    } else if (varTypes.HTML == n) {
        return "HTML";
    } else if (varTypes.JAVASCIPT == n) {
        return "Javascript";
    } else if (varTypes.JSON == n) {
        return "JSON";
    } else if (varTypes.XML == n) {
        return "XML";
    } else if (varTypes.SQL == n) {
        return "SQL";
    } else if (varTypes.LUA == n) {
        return "LUA";
    } else if (varTypes.LUARES == n) {
        return "LUA result";
    } else if (varTypes.UXTYPE1 == n) {
        return "UX Type 1";
    } else if (varTypes.DMROW == n) {
        return "DM-row";
    } else if (varTypes.DRIVER == n) {
        return "Driver";
    } else if (varTypes.USER == n) {
        return "User";
    } else if (varTypes.FILTER == n) {
        return "Filter";
    } else {
        return "Unknown variable type";
    }
};

/** Get numerical code of variable type from string.
 * @param {string} str  - Variable type name
 * @return {number} Variable type numerical code
 */
getVarTypeNumerical = function(str) {
    if ("unassigned" === str.toLowerCase()) {
        return varTypes.UNASSIGNED;
    } else if ("string" === str.toLowerCase()) {
        return varTypes.STRING;
    } else if ("boolean" == str.toLowerCase()) {
        return varTypes.BOOLEAN;
    } else if ("integer" == str.toLowerCase()) {
        return varTypes.INTEGER;
    } else if ("long" == str.toLowerCase()) {
        return varTypes.LONG;
    } else if ("double" == str.toLowerCase()) {
        return varTypes.DOUBLE;
    } else if ("measurement" == str.toLowerCase()) {
        return varTypes.MEASUREMENT;
    } else if ("event" == str.toLowerCase()) {
        return varTypes.EVENT;
    } else if ("guid" == str.toLowerCase()) {
        return varTypes.GUID;
    } else if ("event data" == str.toLowerCase()) {
        return varTypes.EVENT_DATA;
    } else if ("event class" == str.toLowerCase()) {
        return varTypes.EVENT_CLASS;
    } else if ("event type" == str.toLowerCase()) {
        return varTypes.EVENT_TYPE;
    } else if ("event timestamp" == str.toLowerCase()) {
        return varTypes.EVENT_TIMESTAMP;
    } else if ("date and time" == str.toLowerCase()) {
        return varTypes.DATE_TIME;
    } else if ("date" == str.toLowerCase()) {
        return varTypes.DATE;
    } else if ("time" == str.toLowerCase()) {
        return varTypes.TIME;
    } else if ("blob" == str.toLowerCase()) {
        return varTypes.BLOB;
    } else if ("mime" == str.toLowerCase()) {
        return varTypes.MIME;
    } else if ("html" == str.toLowerCase()) {
        return varTypes.HTML;
    } else if ("javascript" == str.toLowerCase()) {
        return varTypes.JAVASCIPT;
    } else if ("json" == str.toLowerCase()) {
        return varTypes.JSON;
    } else if ("xml" == str.toLowerCase()) {
        return varTypes.XML;
    } else if ("sql" == str.toLowerCase()) {
        return varTypes.SQL;
    } else if ("lua" == str.toLowerCase()) {
        return varTypes.LUA;
    } else if ("lua result" == str.toLowerCase()) {
        return varTypes.LUARES;
    } else if ("ux Type 1" == str.toLowerCase()) {
        return varTypes.UXTYPE1;
    } else if ("dm-row" == str.toLowerCase()) {
        return varTypes.DMROW;
    } else if ("driver" == str.toLowerCase()) {
        return varTypes.DRIVER;
    } else if ("user" == str.toLowerCase()) {
        return varTypes.USER;
    } else if ("filter" == str.toLowerCase()) {
        return varTypes.FILTER;
    }
};

/** Get ace editor formation mode string from numerical variable type code.
 * @param {number} n    - Variable type numerical code
 * @return {string} Ace editro formation mode string
 */
getEditorModeFromType = function(n) {
    if (varTypes.UNASSIGNED == n) {
        return "text";
    } else if (varTypes.STRING == n) {
        return "text";
    } else if (varTypes.BOOLEAN == n) {
        return "text";
    } else if (varTypes.INTEGER == n) {
        return "text";
    } else if (varTypes.LONG == n) {
        return "text";
    } else if (varTypes.DOUBLE == n) {
        return "text";
    } else if (varTypes.MEASUREMENT == n) {
        return "c_cpp";
    } else if (varTypes.EVENT == n) {
        return "c_cpp";
    } else if (varTypes.GUID == n) {
        return "asciidoc";
    } else if (varTypes.EVENT_DATA == n) {
        return "c_cpp";
    } else if (varTypes.EVENT_CLASS == n) {
        return "c_cpp";
    } else if (varTypes.EVENT_TYPE == n) {
        return "c_cpp";
    } else if (varTypes.EVENT_TIMESTAMP == n) {
        return "c_cpp";
    } else if (varTypes.DATE_TIME == n) {
        return "text";
    } else if (varTypes.DATE == n) {
        return "c_cpp";
    } else if (varTypes.TIME == n) {
        return "c_cpp";
    } else if (varTypes.BLOB == n) {
        return "c_cpp";
    } else if (varTypes.MIME == n) {
        return "c_cpp";
    } else if (varTypes.HTML == n) {
        return "html";
    } else if (varTypes.JAVASCIPT == n) {
        return "javascript";
    } else if (varTypes.JSON == n) {
        return "json";
    } else if (varTypes.XML == n) {
        return "xml";
    } else if (varTypes.SQL == n) {
        return "sql";
    } else if (varTypes.LUA == n) {
        return "lua";
    } else if (varTypes.LUARES == n) {
        return "lua";
    } else if (varTypes.UXTYPE1 == n) {
        return "xml";
    } else if (varTypes.DMROW == n) {
        return "c_cpp";
    } else if (varTypes.DRIVER == n) {
        return "c_cpp";
    } else if (varTypes.USER == n) {
        return "c_cpp";
    } else if (varTypes.FILTER == n) {
        return "c_cpp";
    } else {
        return "text";
    }
};

module.exports = {
    Event: Event
}
module.exports.readValue = readValue
module.exports.getTime = getTime
module.exports.guidToStr = guidToStr
module.exports.strToGuid = strToGuid
module.exports-isGuidZero = isGuidZero
module.exports.getNodeId = getNodeId
module.exports.b64EncodeUnicode = b64EncodeUnicode
module.exports.b64DecodeUnicode = b64DecodeUnicode
module.exports.getVarTypeName = getVarTypeName
module.exports.getVarTypeNumerical = getVarTypeNumerical
module.exports.getEditorModeFromType = getEditorModeFromType

module.exports.version = version
module.exports.priorities = priorities
module.exports.varTypes = varTypes
module.exports.varTypeNames = varTypeNames
module.exports.hostCapabilities = hostCapabilities
