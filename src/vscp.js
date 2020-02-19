// VSCP common javascript library
//
// Copyright © 2012-2020 Ake Hedman, Grodans Paradis AB
// <akhe@grodansparadis.com>
// Copyright © 2015-2020 Andreas Merkle
// <vscp@blue-andi.de>
//
// Licence:
// The MIT License (MIT)
// [OSI Approved License]
//
// The MIT License (MIT)
//
// Copyright © 2015-2020 Åke Hedman, Grodans Paradis AB (Paradise of the Frog)
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

/**
 * VSCP core javascript library version
 * @property {number} major - Major version number
 * @property {number} minor - Minor version number
 * @property {number} release - Sub-minor version number
 */
const version = {
  major: 1,
  minor: 0,
  release: 19
};

/* !!! VSCP classes and types see in the autogenerated files vscp_class.js and
 * vscp_type.js !!! */

/**
 * VSCP class priorities
 * @enum {number}
 * @const
 */
const priorities = {
  PRIORITY_0: 0,
  PRIORITY_0_HIGH: 0,
  PRIORITY_1: 1,
  PRIORITY_2: 2,
  PRIORITY_3: 3,
  PRIORITY_NORMAL: 3,
  PRIORITY_4: 4,
  PRIORITY_5: 5,
  PRIORITY_6: 6,
  PRIORITY_7: 7,
  PRIORITY_LOW: 7
};


/**
 * VSCP variable types
 * @enum {number}
 * @const
 */
const varTypes = {
  UNASSIGNED: 0,   // Unassigned variable
  STRING: 1,       // String value (Base64 encoded)
  BOOLEAN: 2,      // Boolean value (true, false, 0 or 1)
  INTEGER: 3,      // Integer value
  LONG: 4,         // Long value
  DOUBLE: 5,       // Double value
  MEASUREMENT: 6,  // String representation of the measurement.
  EVENT: 7,  // VSCP event head, class, type, obId, timestamp, GUID, data 1,
             // data 2, data ...
  GUID: 8,   // Standard GUID string format:
             // FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF
  EVENT_DATA:
      9,  // Comma separated list with decimal values. 1,2,3,4,5,6,7,8, ...
  EVENT_CLASS: 10,      // Integer value for VSCP class
  EVENT_TYPE: 11,       // Integer value for VSCP type
  EVENT_TIMESTAMP: 12,  // Time when event was received in ms
  DATE_TIME: 13,        // Date + Time in ISO format 2008-11-07T20:10.00
  DATE: 14,             //  ISO date 2008-11-07
  TIME: 15,             //  ISO Time 20:10.00
  BLOB: 16,             //  Base64 encoded binary data.
  MIME: 100,            //  Base64 mime types data base64(mimetype;data)
  HTML: 101,            //  Base64 encoded HTML data.
  JAVASCIPT: 102,       //  Base64 encoded Javascript data.
  JSON: 103,            //  Base64 encoded JSON data.
  XML: 104,             //  Base64 encoded XML data.
  SQL: 105,             //  Base64 encoded SQL data.
  LUA: 201,             //  Base64 encoded LUA data.
  LUARES: 202,          //  Base64 encoded LUA result data.
  UXTYPE1: 300,         //  Base64 encoded UX Type 1 data.
  DMROW: 500,           //  Base64 encoded DM data row.
  DRIVER: 501,          //  Base64 encoded Driver data row.
  USER: 502,            //  Base64 encoded User data row.
  FILTER: 503           //  Base64 encoded Filter data data.
};

/**
 * VSCP variable type names as string. Use to fill drop down boxes and similar.
 * @const
 */
const varTypeNames = [
  'Unassigned',   // Unassigned variable
  'String',       // String value (Base64 encoded)
  'Boolean',      // Boolean value (true, false, 0 or 1)
  'Integer',      // Integer value
  'Long',         // Long value
  'Double',       // Double value
  'Measurement',  // String representation of the measurement.
  'Event',  // VSCP event head, class, type, obId, timestamp, GUID, data 1, data
            // 2, data ...
  'GUID',   // Standard GUID string format:
            // FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF
  'Event Data',   // Comma separated list with decimal values. 1,2,3,4,5,6,7,8,
                  // ...
  'Event Class',  // Integer value for VSCP class
  'Event Type',   // Integer value for VSCP type
  'Event Timestamp',  // Time when event was received in ms
  'Data/Time',        // Date + Time in ISO format 2008-11-07T20:10.00
  'Date',             //  ISO date 2008-11-07
  'Time',             //  ISO Time 20:10.00
  'Blob',             //  Base64 encoded binary data.
  'Mime',             //  Base64 mime types data base64(mimetype;data)
  'HTML',             //  Base64 encoded HTML data.
  'JavaScript',       //  Base64 encoded Javascript data.
  'JSON',             //  Base64 encoded JSON data.
  'XML',              //  Base64 encoded XML data.
  'SQL',              //  Base64 encoded SQL data.
  'LUA',              //  Base64 encoded LUA data.
  'LUARES',           //  Base64 encoded LUA result data.
  'UXType1',          //  Base64 encoded UX Type 1 data.
  'DMRow',            //  Base64 encoded DM data row.
  'Driver',           //  Base64 encoded Driver data row.
  'User',             //  Base64 encoded User data row.
  'Filter'            // Filter for channel
];

/**
 * VSCP host capabilities (wcyd - What Can You Do)
 * @enum {number}
 * @const
 */
const hostCapabilities = {
  REMOTE_VARIABLE: (1 << 63),
  DECISION_MATRIX: (1 << 62),
  INTERFACE: (1 << 61),
  TCPIP: (1 << 15),
  UDP: (1 << 14),
  MULTICAST_ANNOUNCE: (1 << 13),
  RAWETH: (1 << 12),
  WEB: (1 << 11),
  WEBSOCKET: (1 << 10),
  REST: (1 << 9),
  MULTICAST_CHANNEL: (1 << 8),
  IP6: (1 << 6),
  IP4: (1 << 5),
  SSL: (1 << 4),
  TWO_CONNECTIONS: (1 << 3),
  AES256: (1 << 2),
  AES192: (1 << 1),
  AES128: 1
};

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
  /**
   * VSCP event head
   * @member {number}
   */
  this.vscpHead = 0;

  /**
   * VSCP class
   * @member {number}
   */
  this.vscpClass = 0;

  /**
   * VSCP type
   * @member {number}
   */
  this.vscpType = 0;

  /**
   * VSCP object id used by driver for channel info and etc.
   * @member {number}
   */
  this.vscpObId = 0;

  /**
   * Relative timestamp for package in us
   * @member {number}
   */
  this.vscpTimeStamp = 0;

  /**
   * Date/Time for package
   * @member {date}
   */
  this.vscpDateTime = new Date();
  this.vscpDateTime = Date.UTC(
    this.vscpDateTime.getUTCFullYear(), this.vscpDateTime.getUTCMonth(), this.vscpDateTime.getUTCDate(),
    this.vscpDateTime.getUTCHours(), this.vscpDateTime.getUTCMinutes(), this.vscpDateTime.getUTCSeconds());
  this.vscpDateTime = new Date(this.vscpDateTime);        

  /**
   * Node global unique id LSB(15) -> MSB(0)
   * @member {string}
   */
  this.vscpGuid = '-';

  /**
   * Data array or string
   * @member {(number[]|string)}
   */
  this.vscpData = [];

  if ('undefined' !== typeof options) {
    if ('number' === typeof options.vscpHead) {
      this.vscpHead = options.vscpHead;
    } else if ('string' === typeof options.vscpHead) {
      this.vscpHead = parseInt(options.vscpHead);
    }

    if ('boolean' === typeof options.guidIsIpV6Addr) {
      if (false === options.guidIsIpV6Addr) {
        this.vscpHead &= 0xefff;
      } else {
        this.vscpHead |= 0x8000;
      }
    }

    if ('boolean' === typeof options.dumbNode) {
      if (false === options.dumbNode) {
        this.vscpHead &= 0xbfff;
      } else {
        this.vscpHead |= 0x4000;
      }
    }

    if ('number' === typeof options.vscpPriority) {
      if ((0 <= options.vscpPriority) && (7 >= options.vscpPriority)) {
        this.vscpHead &= 0xff1f;
        this.vscpHead |= (options.vscpPriority << 5);
      }
    } else if ('string' === typeof options.vscpHead) {
      let n = parseInt(options.vscpHead);
      this.vscpHead &= 0xff1f;
      this.vscpHead |= (n << 5);
    }

    if ('boolean' === typeof options.vscpHardCoded) {
      if (false === options.vscpHardCoded) {
        this.vscpHead &= 0xffef;
      } else {
        this.vscpHead |= 0x0010;
      }
    }

    if ('boolean' === typeof options.vscpCalcCRC) {
      if (false === options.vscpCalcCRC) {
        this.vscpHead &= 0xfff7;
      } else {
        this.vscpHead |= 0x0008;
      }
    }

    if ('number' === typeof options.vscpClass) {
      this.vscpClass = options.vscpClass;
    } else if ('string' === typeof options.vscpClass) {
      this.vscpClass = parseInt(options.vscpClass);
    }

    if ('number' === typeof options.vscpType) {
      this.vscpType = options.vscpType;
    } else if ('string' === typeof options.vscpType) {
      this.vscpType = parseInt(options.vscpType);
    }

    if ('number' === typeof options.vscpObId) {
      this.vscpObId = options.vscpObId;
    } else if ('string' === typeof options.vscpObId) {
      this.vscpObId = parseInt(options.vscpObId);
    }

    if ('number' === typeof options.vscpTimeStamp) {
      this.vscpTimeStamp = options.vscpTimeStamp;
    } else if ('string' === typeof options.vscpTimeStamp) {
      this.vscpTimeStamp = parseInt(options.vscpTimeStamp);
    }

    if ('string' === typeof options.vscpDateTime) {
      // Time in UTC for events but conversion
      // is done in send routine
      this.vscpDateTime = new Date(options.vscpDateTime);
    } else if (true === (options.vscpDateTime instanceof Date)) {
      // Time should be GMT
      this.vscpDateTime = options.vscpDateTime;
    }

    if ('string' === typeof options.vscpGuid) {
      this.vscpGuid = options.vscpGuid;
    }

    // VSCP data
    if (('string' === typeof options.vscpData) ||
        (true === (options.vscpData instanceof Array))) {
      this.vscpData = options.vscpData;
    } else if (Array.isArray(options.vscpData)) {
      this.vscpData = options.vscpData.toString();
    }

    // 'text' to init from string form
    if ('string' === typeof options.text) {
      this.setFromText(options.text);
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
 * @return {boolean} If the GUID is a IP v6 address, it will return true,
 *     otherwise false.
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
 * Is node a dumb node or not?
 * Dumb node means no MDF, registers, nothing.
 *
 * @return {boolean} If the node is a dumb node, it will return true, otherwise
 *     false.
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
 * @return {boolean} If the node id is hard coded, it will return true,
 *     otherwise false.
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

  str += this.vscpHead.toString() + ',';
  str += this.vscpClass.toString() + ',';
  str += this.vscpType.toString() + ',';
  str += this.vscpObId.toString() + ',';
  str += this.vscpDateTime.toISOString() + ',';
  str += this.vscpTimeStamp.toString() + ',';
  str += this.vscpGuid;

  if (this.vscpData instanceof Array) {
    if (0 < this.vscpData.length) {
      str += ',';
    }

    for (index = 0; index < this.vscpData.length; ++index) {
      str += this.vscpData[index].toString();

      if ((this.vscpData.length - 1) > index) {
        str += ',';
      }
    }

  } else if ('string' === typeof this.vscpData) {
    if (0 < this.vscpData.length) {
      str += ',';
    }

    str += this.vscpData;
  } else {
    console.error(getTime() + ' Invalid VSCP event data.');
  }

  return str;
};

/**
 * Set event from string.
 * @return {string} Event as string
 */
Event.prototype.setFromText =
    function(str) {
  if ('string' !== typeof str) {
    console.error('VSCP event is not in string form.');
    reject(Error('VSCP event is not in string form.'));
  }

  ea = str.split(',');

  // Get head
  if (ea.length) {
    this.vscpHead = readValue(ea[0]);
  }

  // Get VSCP class
  if (ea.length > 1) {
    this.vscpClass = readValue(ea[1]);
  }

  // Get VSCP type
  if (ea.length > 2) {
    this.vscpType = readValue(ea[2]);
  }

  // Get VSCP obid
  if (ea.length > 3) {
    // If left empty set default
    if (0 == ea[3]) {
      ea[3] = '0';
    }
    this.vscpObId = readValue(ea[3]);
  }

  // Get VSCP datetime

  // If left empty set default
  if (0 == ea[4].length) {
    this.vscpDateTime = new Date();
    this.vscpDateTime = Date.UTC(
        this.vscpDateTime.getUTCFullYear(), this.vscpDateTime.getUTCMonth(), this.vscpDateTime.getUTCDate(),
        this.vscpDateTime.getUTCHours(), this.vscpDateTime.getUTCMinutes(), this.vscpDateTime.getUTCSeconds());
    this.vscpDateTime = new Date(this.vscpDateTime);
  } else if ((ea.length > 4) && (0 == ea[4].length)) {
    this.vscpDateTime = new Date(ea[4]);
  }

  // Timestamp
  this.vscpTimeStamp = 0;
  // If left empty set default
  if (0 == ea[5]) {
    ea[5] = '0';
  }
  if (ea.length > 5) {
    this.vscpTimeStamp = parseInt(ea[5]);
  }

  // Get VSCP GUID
  // If left empty set default
  if (0 == ea[6]) {
    ea[6] = '-';
  }
  this.vscpGuid = '-';
  if (ea.length > 6) {
    this.vscpGuid = ea[6];
  }

  // Get VSCP data
  this.vscpData = [];
  if (ea.length > 7) {
    for (let i = 7; i < ea.length; i++) {
      this.vscpData[7 - i] = readValue(ea[i]);
    }
  }
}

/* ---------------------------------------------------------------------- */


/**
 * Read a hex, binary, octal or decimal value and return as 
 * an integer.
 * @param {string} input    - Hex or decimal value as string
 * @return {number} Value
 */
readValue = function(input) {
  var txtvalue = input.toLowerCase();
  var poshex = txtvalue.indexOf('0x');
  var posbin = txtvalue.indexOf('0b');
  var posoct = txtvalue.indexOf('0o');
  if ((-1 == poshex) && (-1 == posbin) && (-1 == posoct)) {
    return parseInt(txtvalue);
  } else if (-1 != poshex) {
    txtvalue = txtvalue.substring(poshex + 2);
    return parseInt(txtvalue, 16);
  }
  else if (-1 != posbin) {
    txtvalue = txtvalue.substring(posbin + 2);
    return parseInt(txtvalue, 2);
  }
  else if (-1 != posoct) {
    txtvalue = txtvalue.substring(posoct + 2);
    return parseInt(txtvalue, 8);
  }
  else {
    return 0;
  }
};

/**
 * Utility function which returns the current time in the following format:
 * hh:mm:ss.us
 *
 * @return {string} Current time in the format hh:mm:ss.us
 */
getTime = function() {
  var now = new Date();

  var paddingHead = function(num, size) {
    var str = num + '';

    while (str.length < size) {
      str = '0' + str;
    }

    return str;
  };

  var paddingTail = function(num, size) {
    var str = num + '';

    while (str.length < size) {
      str = str + '0';
    }

    return str;
  };

  return '' + paddingHead(now.getHours(), 2) + ':' +
      paddingHead(now.getMinutes(), 2) + ':' +
      paddingHead(now.getSeconds(), 2) + '.' +
      paddingTail(now.getMilliseconds(), 3);
};

/**
 * Converts a GUID number array to a GUID string.
 *
 * @param {number[]} guid - GUID number array
 * @return {string} GUID string, e.g.
 *     00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 */
guidToStr = function(guid) {
  var guidStr = '';
  var index = 0;
  var hexValue = '';

  for (index = 0; index < guid.length; ++index) {
    hexValue = guid[index].toString(16).toUpperCase();
    if (2 > hexValue.length) {
      hexValue = '0' + hexValue;
    }

    guidStr += hexValue;

    if (index < (guid.length - 1)) {
      guidStr += ':';
    }
  }

  return guidStr;
};

/**
 * Converts a GUID string to a GUID number array.
 *
 * @param {string} guid - GUID string, e.g.
 *     00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @return {number[]} GUID number array and array with length != 16 for  invalid
 *     GUID
 */
strToGuid = function(str) {
  var guid = [];
  var items = [];
  var index = 0;

  if ('undefined' === typeof str) {
    return guid;
  }

  if ('string' !== typeof str) {
    return guid;
  }

  // If GUID is "-" use interface GUID
  if ('-' === str.trim()) {
    str = '00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00';
  }

  items = str.split(':');

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

isGuidZero = function(guid) {
  if ('undefined' === typeof guid) {
    return false;
  }

  if ('string' === typeof guid) {
    guid = vscp.strToGuid(guid);
  }

  for (let i = 0; i < 16; i++) {
    if (guid[i]) return false;
  }

  return true;
};

/**
 * Get node id from a node GUID string. TODO should be 16-bit!
 *
 * @param {string} guid - GUID string, e.g.
 *     00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @return {number} Node id
 */
getNodeId = function(guid) {
  if ('undefined' === typeof guid) {
    return 0;
  }

  if ('string' !== typeof guid) {
    return 0;
  }

  return ( (parseInt(guid.split(':')[14], 16) << 8) + 
            parseInt(guid.split(':')[15], 16));
};

/**
 * Set node to a node GUID string. TODO should be 16-bit!
 * 
 * @param {string} guid - GUID string, e.g.
 *     00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @param {number} nodeid - Node is to set (16-bit). 
 * @return {string} guid with LSB set to node id, or null
 *                  on error.
 */

setNodeId = function(guid, nodeid) {

  if ( ('undefined' === typeof guid) ||
       ('undefined' === typeof nodeid) ) {
    return null;
  }

  if ('string' !== typeof guid) {
    return null;
  }

  if ('number' !== typeof nodeid) {
    return null;
  }

  var guidArray = guid.split(':');

  guidArray[14] = ((nodeid >> 8) & 0xff).toString(16);
  if ( 2 != guidArray[14].length ) {
    guidArray[14] = "0" + guidArray[14];
  }

  guidArray[15] = (nodeid & 0xff).toString(16);
  if ( 2 != guidArray[15].length ) {
    guidArray[15] = "0" + guidArray[15];
  }

  return elements.join('-');
};

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
// Since DOMStrings are 16-bit-encoded strings, in most browsers calling
// window.btoa on a Unicode string will cause a Character Out Of Range exception
// if a character exceeds the range of a 8-bit ASCII-encoded character.

/**
 * Encode base64 unicode safe.
 * @param {string} str  - Unicode string
 * @return {string} Base64
 */
b64EncodeUnicode = function(str) {
  return new Buffer.from(str, 'binary').toString('base64');
};

/**
 * Decode base64 unicode safe.
 * @param {string} str  - Base64
 * @return {string} Unicode string
 * Note: prior to Node v4, use new Buffer rather than Buffer.from.
 */
b64DecodeUnicode = function(str) {
  return new Buffer.from(str, 'base64').toString('binary');
};

// Header helpers

///////////////////////////////////////////////////////////////////////////////
// isGuidIpv6
//

isGuidIpv6 =
    function(head) {
  return (head & (1 << 15));
}

///////////////////////////////////////////////////////////////////////////////
// isDumbNode
//

isDumbNode =
    function(head) {
  return (head & (1 << 14));
}

///////////////////////////////////////////////////////////////////////////////
// getPriority
//

getPriority =
    function(head) {
  return ((head >> 5) & 7);
}

///////////////////////////////////////////////////////////////////////////////
// isHardCoded
//

isHardCoded =
    function(head) {
  return (head & (1 << 4));
}

///////////////////////////////////////////////////////////////////////////////
// isNoCrc
//

isNoCrc =
    function(head) {
  return (head & (1 << 3));
}

///////////////////////////////////////////////////////////////////////////////
// getRollingIndex
//

getRollingIndex =
    function(head) {
  return (head & 7);
}

/* ---------------------------------------------------------------------- */

///////////////////////////////////////////////////////////////////////////////
// toFixed
//
// Round value to a fixed precision.
//
// @param {number} value        - Value
// @param {number} precision    - Precision
//
// @return {number} Rounded value
//

toFixed = function(value, precision) {
  var power = Math.pow(10, precision || 0);
  return String((Math.round(value * power) / power).toFixed(precision));
};

///////////////////////////////////////////////////////////////////////////////
// varInteger2Float
// Convert a integer value to float
//
// @param {number[]} data - Byte array
// @return {number} Float value
//

varInteger2Float = function(data) {
  var rval = 0.0;
  var bNegative = false;
  var i = 0;

  if (0 !== (data[0] & 0x80)) {
    bNegative = true;

    for (i = 0; i < data.length; i++) {
      data[i] = ~data[i] & 0xff;
    }
  }

  for (i = 0; i < data.length; i++) {
    rval = rval << 8;
    rval += data[i];
  }

  if (true === bNegative) {
    rval = -1.0 * (rval + 1);
  }

  return rval;
};

///////////////////////////////////////////////////////////////////////////////
// getDataCoding
//
// Get data coding.
//
// @param {number} data - Data
// @return {number} Coding
//

getDataCoding = function(data) {
  return (data >> 5) & 7;
};

///////////////////////////////////////////////////////////////////////////////
// getUnitFromDataCoding
//
// Get unit from data coding.
//
// @param {number} data - Data coding
// @return {number} Unit
//

getUnitFromDataCoding = function(data) {
  return (data >> 3) & 3;
};

///////////////////////////////////////////////////////////////////////////////
// getSensorIndexFromDataCoding
//
// Get sensor index from data coding.
//
// @param {number} data - Data coding
// @return {number} Sensor index
//

getSensorIndexFromDataCoding = function(data) {
  return data & 7;
};

///////////////////////////////////////////////////////////////////////////////
// decodeClass10
//
// Decode a class 10 measurement.
//
// @param {number[]} data - Data (event data array where first data byte is the
// data coding)
// @return {number} Value as float
//

decodeClass10 = function(data) {
  var rval = 0.0;
  var newData = [];
  var sign = 0;
  var exp = 0;
  var mantissa = 0;
  var str = '';
  var i = 0;

  switch (module.exports.getDataCoding(data[0])) {
    case 0:  // Bits
    case 1:  // Bytes
    case 3:  // Integer
      for (i = 1; i < data.length; i++) {
        newData[i - 1] = data[i];
      }
      rval = module.exports.varInteger2Float(newData);
      break;

    case 2:  // String
      for (i = 1; i < data.length; i++) {
        str += String.fromCharCode(data[i]);
      }
      rval = parseFloat(str);
      break;

    case 4:  // Normalized integer
      exp = data[1];

      for (i = 2; i < data.length; i++) {
        newData[i - 2] = data[i];
      }

      rval = module.exports.varInteger2Float(newData);

      // Handle mantissa
      if (0 !== (exp & 0x80)) {
        exp &= 0x7f;
        rval = rval / Math.pow(10, exp);
      } else {
        exp &= 0x7f;
        rval = rval * Math.pow(10, exp);
      }
      break;

    case 5:  // Floating point
      if (5 === data.length) {
        sign = data[1] & 0x80;  // Negative if != 0
        exp = (data[1] & 0x7f) << 1 + (data[2] & 0x80) ? 1 : 0;
        mantissa = (data[2] & 0x7f) << 16 + data[3] << 8 + data[4];
        // sign * 2^exponent * mantissa
        rval = Math.pow(2, exp) * mantissa;
        if (sign) {
          rval = -1 * rval;
        }
      }
      break;

    case 6:  // Reserved
      break;

    case 7:  // Reserved
      break;

    default:
      break;
  }

  return rval;
};

///////////////////////////////////////////////////////////////////////////////
// decodeClass60Number
//
// Decode a class 60 measurement.
// @param {number}  data - Data
// @return {number} Value as float
//

decodeClass60Number = function(data) {
  var rval = 0;
  var sign = 0;
  var exp = 0;
  var mantissa = 0;

  if (8 === data.length) {
    sign = data[0] & 0x80;  // Negative if != 0
    exp = (data[0] & 0x7f) << 4 + (data[1] & 0xf0) >> 4;
    mantissa = (data[1] & 0x0f) << 48 + data[2] << 40 + data[3] << 32 + data[4]
                                << 24 + data[5] << 16 + data[6] << 8 + data[7];

    // sign * 2^exponent * mantissa
    rval = Math.pow(2, exp) * mantissa;

    if (0 !== sign) {
      rval = -1 * rval;
    }
  }

  return rval;
};

///////////////////////////////////////////////////////////////////////////////
// decodeClass65Number
//
// Decode a class 65 measurement.
//
// @param {number} data - Data
// @return {number} Value as float
//
decodeClass65Number = function(data) {
  var rval = 0;
  var exp = data[3];
  var i = 0;

  for (i = 4; i < data.length; i++) {
    rval = rval << 8;
    rval += data[i];
  }

  // Handle exponent
  if (0 !== (exp & 128)) {
    exp &= 0x7f;
    rval = rval * Math.pow(10, (-1 * exp));
  } else {
    rval = rval * Math.pow(10, exp);
  }

  return rval;
};

///////////////////////////////////////////////////////////////////////////////
// isMeasurement
//
// Returns true if vscpClass is a measurement class
//
// @param {number} vscpClass - VSCP class to check
// @return {boolean True if vscpClass is a measurement class, false otherwise
//

isMeasurement = function(vscpClass) {
  let rv = false;

  if ((10 == vscpClass) || (60 == vscpClass) || (65 == vscpClass) ||
      (70 == vscpClass) || (85 == vscpClass) || (1040 == vscpClass) ||
      (1060 == vscpClass)) {
    rv = true;
  }
  return rv;
}

///////////////////////////////////////////////////////////////////////////////
// vscp_getHeadFromCANALid
//

getHeadFromCANALid = function(id) {
  var hardcoded = 0;
  priority  = (0x07 & (id >> 26));
  
  if (id & (1 << 25)) {
    hardcoded = VSCP_HEADER_HARD_CODED;
  }

  return ((priority << 5) | hardcoded);
}

///////////////////////////////////////////////////////////////////////////////
// getVscpClassFromCANALid
//

getVscpClassFromCANALid = function(id) {
  return (0x1ff & (id >> 16));
}

///////////////////////////////////////////////////////////////////////////////
// getVscpTypeFromCANALid
//

getVscpTypeFromCANALid = function(id) {
  return (0xff & (id >> 8));
}

///////////////////////////////////////////////////////////////////////////////
// getNicknameFromCANALid
//

getNicknameFromCANALid = function(id) {
  return (id & 0xff);
}

///////////////////////////////////////////////////////////////////////////////
// getCANALidFromData
//

getCANALidFromData = function(priority,
                      vscp_class,
                      vscp_type)
{
    return ((priority << 26) |
            (vscp_class << 16) |
            (vscp_type << 8) | 0);
}

///////////////////////////////////////////////////////////////////////////////
// getCanMsgFromEvent
//
// @param {Event} ev Event to convert
// @return {object} Can message object on success or 
//                  null on failure.

getCanMsgFromEvent = function(ev) {

  if (true !== (e instanceof Event)) {
    return null;
  }

  msg = {};         // CAN message
  msg.ext = true;   // VSCP CAN messages are always extended
  msg.rtr = false;  // This is no remote transmission request
  msg.canid = getCANALidFromData(ev.priority, 
                                  ev.vscpClass, 
                                  ev.vscpType ); 
  msg.canid += getNodeId(ev.vscpGuid);
  msg.timestamp = ev.vscpTimeStamp;
  msg.dlc = ev.vscpData.length;
  if ( msg.dlc > 8 ) return null;
  msg.data = ev.vscpData;
  
  return msg;
}

///////////////////////////////////////////////////////////////////////////////
// convertCanMsgToEvent
//
// @param {object} msg CAN message object
// @return {Event} Converted event or null on failure.

convertCanMsgToEvent = function(msg) {

  // must be object
  if ( typeof msg !== 'object') {
    return nuĺl;
  }

  ev = new Event();
  ev.head      = getHeadFromCANALid(msg.canid);
  ev.vscpClass = getVscpClassFromCANALid(msg.canid);
  ev.vscpType  = getVscpTypeFromCANALid(msg.canid);
  ev.setNickname(getNicknameFromCANALid(msg.canid)); 
  
  ev = new Event();

}

module.exports = {
  Event: Event
} 

module.exports.readValue = readValue
module.exports.getTime = getTime
module.exports.guidToStr = guidToStr
module.exports.strToGuid = strToGuid
module.exports.isGuidZero = isGuidZero
module.exports.getNodeId = getNodeId
module.exports.b64EncodeUnicode = b64EncodeUnicode
module.exports.b64DecodeUnicode = b64DecodeUnicode
module.exports.isGuidIpv6 = isGuidIpv6
module.exports.isDumbNode = isDumbNode
module.exports.getPriority = getPriority
module.exports.isHardCoded = isHardCoded
module.exports.isNoCrc = isNoCrc
module.exports.getRollingIndex = getRollingIndex

// Measurements
module.exports.isMeasurement = isMeasurement
module.exports.toFixed = toFixed
module.exports.varInteger2Float = varInteger2Float
module.exports.getDataCoding = getDataCoding
module.exports.getUnitFromDataCoding = getUnitFromDataCoding
module.exports.decodeClass10 = decodeClass10
module.exports.decodeClass60Number = decodeClass60Number
module.exports.decodeClass65Number = decodeClass65Number

module.exports.version = version
module.exports.priorities = priorities
module.exports.varTypes = varTypes
module.exports.varTypeNames = varTypeNames
module.exports.hostCapabilities = hostCapabilities
