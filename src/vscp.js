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

'use strict';

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
const priority = {
  PRIORITY_0: 0,
  PRIORITY_HIGH: 0,
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

const guidtype = {
  GUIDTYPE_0: 0,    // Standard GUID
  GUIDTYPE_STANDARD: 0,
  GUIDTYPE_1: 1, // GUID is IP.v6 address
  GUIDTYPE_IPV6: 1,
  GUIDTYPE_2: 2, // GUID is RFC 4122 Version 1
  GUIDTYPE_RFC4122_1: 2,
  GUIDTYPE_3: 3, // GUID is RFC 4122 Version 4 
  GUIDTYPE_RFC4122_4: 2
}

/**
 * VSCP host capabilities (wcyd - What Can You Do)
 * @enum {number}
 * @const
 */
const hostCapability = {
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

/* 
  Measurement data format masks 
*/
const measurementDataCodingMask = {
  MASK_DATACODING_TYPE:  0xE0, /* Bits 5,6,7 */
  MASK_DATACODING_UNIT:  0x18, /* Bits 3,4   */
  MASK_DATACODING_INDEX: 0x07  /* Bits 0,1,2 */
};

/*
  These bits are coded in the three MSB bits of the first data byte
  of measurement data and tells the type of the data that follows.             
*/
const measurementDataCoding = {
  DATACODING_BIT:        0x00,
  DATACODING_BYTE:       0x20,
  DATACODING_STRING:     0x40,
  DATACODING_INTEGER:    0x60,
  DATACODING_NORMALIZED: 0x80,
  DATACODING_SINGLE:     0xA0, /* single precision float */
  DATACODING_RESERVED1:  0xC0,
  DATACODING_RESERVED2:  0xE0
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
 * @param {number} options.vscpGuidType                 - GUID Type
 * @param {boolean} options.vscpHardCoded               - Hard coded node id
 * @param {boolean} options.vscpCalcCRC                 - Calculate CRC
 * @param {number} options.vscpClass                    - VSCP class
 * @param {number} options.vscpType                     - VSCP type
 * @param {number} options.vscpObId                     - Object id
 * @param {string} options.vscpDateTime                 - ISO UTC Date + time  
 * @param {number} options.vscpTimeStamp                - Timestamp
 * @param {string} options.vscpGuid                     - GUID string
 * @param {(number[]|string)} options.vscpData          - Event data
 */
class Event {
  
  constructor(options) {
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
          setIPV6Addr();
        }
      }

      if ('boolean' === typeof options.dumbNode) {
        if (false === options.dumbNode) {
          this.vscpHead &= 0x7fff;
        } else {
          this.vscpHead |= 0x8000;
        }
      }

      // 0 - 7
      if ('number' === typeof options.vscpPriority) {
        if ((0 <= options.vscpPriority) && (7 >= options.vscpPriority)) {
          this.vscpHead &= 0xff1f;
          this.vscpHead |= (options.vscpPriority << 5);
        }
      } else if ('string' === typeof options.vscpPriority) {
        let n = parseInt(options.vscpPriority);
        this.vscpHead &= 0xff1f;
        this.vscpHead |= (n << 5);
      }

      // 0 - 7
      if ('number' === typeof options.vscpGuidType) {
        if ((0 <= options.vscpGuidType) && (7 >= options.vscpGuidType)) {
          this.vscpHead &= 0x8fff;
          this.vscpHead |= (options.vscpGuidType << 12);
        }
      } else if ('string' === typeof options.vscpGuidType) {
        let n = parseInt(options.vscpGuidType);
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
      else if (Array.isArray(options.vscpData)) {
        this.vscpData = options.vscpData;
      } else if (('string' === typeof options.vscpData) ) {
        this.vscpData = options.vscpData.split(',');
        // Make data numeric
        for ( var n in this.vscpData ) {
          this.vscpData[n] = readValue(this.vscpData[n]);
        }
      } 

      // 'text' to init from string form
      if ('string' === typeof options.text) {
        this.setFromString(options.text);
      }

    }
  };

  /**
   * Set bit in header that mark GUID as IP v6 address
   */
  setIPV6Addr = function() {
    this.vscpHead &= 0x8FFF;
    this.vscpHead |= 0x1000;
  };

  /**
   * Check if GUID for this event is a IP v6 address or not?
   *
   * @return {boolean} If the GUID is a IP v6 address, it will return true,
   *     otherwise false.
   */
  isIPV6Addr = function() {
    var result = false;

    if ( 0x1000 === (this.vscpHead & 0x7000)) {
      result = true;
    }

    return result;
  };

  /**
   * Set bit that mark this event as coming from a dumb node (No MDF, registers, nothing).
   */
  setDumbNode = function() {
    this.vscpHead |= 0x8000;
  };

  /**
   * Check if this event is marked as coming from a dumb node.
   * Dumb node means no MDF, registers, nothing.
   *
   * @return {boolean} If the node is a dumb node, it will return true, otherwise
   *     false.
   */
  isDumbNode = function() {
    var result = false;

    if (0 < (this.vscpHead & 0x8000)) {
      result = true;
    }

    return result;
  };

  /**
   * Set the VSCP event priority (0-7). Lower value is higher priority.
   *
   * @param {number} priority  -  Priority
   */
  setPriority = function(priority) {
    if ((0 <= priority) && (7 >= priority)) {
      this.vscpHead &= 0xff1f;
      this.vscpHead |= (priority << 5);
    }
  };

  /**
   * Get the VSCP event priority (0-7). Lower value is higher priority.
   *
   * @return {number} Priority of the event.
   */
  getPriority = function() {
    return (this.vscpHead >> 5) & 0x0007;
  };

  /**
   * Set the VSCP GUID type (0-7).
   *
   * @param {number} type  -  Priority
   */
  setGuidType = function(type) {
    if ((0 <= type) && (7 >= type)) {
      this.vscpHead &= 0x8fff;
      this.vscpHead |= (type << 12);
    }
  };

  /**
   * Get the VSCP event GUID type (0-7).
   *
   * @return {number} Priority of the event.
   */
  getGuidType = function() {
    return (this.vscpHead >> 12) & 0x0007;
  };

  /**
   * Set the node id of the event sender as hard coded?
   */
  setHardCodedAddr = function() {
    this.vscpHead |= 0x0010;
  };

  /**
   * Is the node id of the event sender hard coded or not?
   *
   * @return {boolean} If the node id is hard coded, it will return true,
   *     otherwise false.
   */
  isHardCodedAddr = function() {
    var result = false;

    if (0 < (this.vscpHead & 0x0010)) {
      result = true;
    }

    return result;
  };

  /**
   * Set flag for no CRC calculation?
   */
  setDoNotCalcCRC = function() {
    this.vscpHead |= 0x0008;
  };

  /**
   * Is CRC calculated or not?
   *
   * @return {boolean} If nor CRC should be calculated true is returned.
   */
  isDoNotCalcCRC = function() {
    var result = false;

    if (0 < (this.vscpHead & 0x0008)) {
      result = true;
    }

    return result;
  };

  /*!
    getRollingIndex

    Some nodes keep a rolling index of there frames (typically
    wireless nodes). This function get the index.

    @param {number} head VSCP head (16-bit or 8-bit)
    @return {number} Rolling index 0-7.
  */

  getRollingIndex = function(head) {
  
    if ( 'number' !== typeof head ) {
      throw(new Error("Parameter error: 'head' should be a number."))
    }
    return (head & 7);
  }

  /**
   * Get event as string.
   * @return {string} Event as string with the following format
   * vscpHead,vscpClass,vscpType,vscpObId,vscpDateTime,vscpTimeStamp,vscpGuid,vspData
   */
  getAsString = function() {
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
   * Get event as string.
   * @return {string} Event as string with the following format
   * vscpHead,vscpClass,vscpType,vscpObId,vscpDateTime,vscpTimeStamp,vscpGuid,vspData
   */
  toString = function() {
    return this.getAsString();
  }

  /**
   * Set event from string.
   * @return {string} Event as string
   */
  setFromString =
      function(str) {
    if ('string' !== typeof str) {
      console.error('VSCP event is not in string form.');
      reject(Error('VSCP event is not in string form.'));
    }

    var ea = str.split(',');

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
    } else if ((ea.length > 4) && (0 !== ea[4].length)) {
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
        this.vscpData.push(readValue(ea[i]));
      }
    }

  }

} // Event


/* ---------------------------------------------------------------------- */


/**
 * Read a hex, binary, octal or decimal value and return as 
 * an integer.
 * @param {string} input    - Hex or decimal value as string
 * @return {number} Value
 */
var readValue = function(input) {
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
var getTime = function() {
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
var guidToStr = function(guid) {
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
var strToGuid = function(str) {

  var guid = [];
  var items = [];
  var index = 0;

  if ('undefined' === typeof str) {
    throw(new Error("Missing argument"));
  }

  if ('string' !== typeof str) {
    throw(new Error("Argument should be string"));
  }

  // If GUID is "-" use interface GUID
  if ('-' === str.trim()) {
    str = '00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00';
  }

  items = str.split(':');

  if (16 !== items.length) {
    trow(new Error("A VSCP GUID consist of 16 items"));
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

var isGuidZero = function(guid) {
  
  var guidArray = [];
  
  if ('undefined' === typeof guid) {
    throw(new Error("Missing argument"));
  }

  if ('string' === typeof guid) {
    guidArray = strToGuid(guid);
  }

  if ( Array.isArray(guid) ) {
    guidArray = guid;
  }

  for (let i = 0; i < 16; i++) {
    if (guidArray[i]) return false;
  }

  return true;
};

/**
 * getNodeId
 * 
 * Get node id from a node GUID string. 
 *
 * @param {string} guid - GUID string, e.g.
 *     00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @return {number} Node id
 */
var getNodeId = function(guid) {
  if ('undefined' === typeof guid) {
    throw new Error("Parameter error: GUID is undefined.");
  }

  if ('string' !== typeof guid) {
    throw new Error("Parameter error: GUID should be on string form.");
  }

  // Short for all nulls?  
  if (('-' === guid)  || ('' === guid) ) {
    return 0;
  }

  return ( (parseInt(guid.split(':')[14], 16) << 8) + 
            parseInt(guid.split(':')[15], 16));
};

/**
 * getNickName
 * 
 * Get node id from a node GUID string. 
 *
 * @param {string} guid - GUID string, e.g.
 *     00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @return {number} Node id
 */

var getNickName = function(guid) {
  return getNodeId(guid);
}

/**
 * setNodeId
 * 
 * Set node to a node GUID string. TODO should be 16-bit!
 * 
 * @param {string} guid - GUID string, e.g.
 *     00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @param {number} nodeid - Node is to set (16-bit). 
 * @return {string} guid with LSB set to node id, or null
 *                  on error.
 */

var setNodeId = function(guid, nodeid) {

  if ( ('undefined' === typeof guid) ||
       ('undefined' === typeof nodeid) ) {
      throw(new Error("Missing argument"));
  }

  if ('string' !== typeof guid) {
    throw(new Error("guid argument should be a string"));
  }

  if ('number' !== typeof nodeid) {
    throw(new Error("nodeid argument should be a 16-bit number."));
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

  return guidArray.join(':');
};

/**
 * setNickName
 * 
 * Set node to a node GUID string. TODO should be 16-bit!
 * 
 * @param {string} guid - GUID string, e.g.
 *     00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
 * @param {number} nodeid - Node is to set (16-bit). 
 * @return {string} guid with LSB set to node id, or null
 *                  on error.
 */

var setNickName = function(guid, nodeid) {
  return setNodeId(guid, nodeid);
}

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
// Since DOMStrings are 16-bit-encoded strings, in most browsers calling
// window.btoa on a Unicode string will cause a Character Out Of Range exception
// if a character exceeds the range of a 8-bit ASCII-encoded character.

/**
 * Encode base64 unicode safe.
 * @param {string} str  - Unicode string
 * @return {string} Base64
 */
var b64EncodeUnicode = function(str) {
  return new Buffer.from(str, 'binary').toString('base64');
};

/**
 * Decode base64 unicode safe.
 * @param {string} str  - Base64
 * @return {string} Unicode string
 * Note: prior to Node v4, use new Buffer rather than Buffer.from.
 */
var b64DecodeUnicode = function(str) {
  return new Buffer.from(str, 'base64').toString('binary');
};

// ----------------------------------------------------------------------------

// Header helpers

/*!
  isGuidIpv6

  A node that use an IPv6 address can use this address as its's 
  GUID and then should set this bit to indicate this.

  @param {number} head VSCP head (16-bit)
  @return {boolean} true if this is a Ipv6 GUID.
*/

var isGuidIpv6 = function(head) {
  var result = false;

  if ( 'number' !== typeof head ) {
    throw(new Error("Parameter error: 'head' should be a number."))
  }

  if ( 0x1000 === (this.vscpHead & 0x7000)) {
    result = true;
  }

  return result;
}

/*!
  isDumbNode

  A Dumb node have no registers etc and can only send
  events. This function check if it is.

  @param {number} head VSCP head (16-bit)
  @return {boolean} true if this is a dumb node.
*/

var isDumbNode = function(head) {

  if ( 'number' !== typeof head ) {
    throw(new Error("Parameter error: 'head' should be a number."))
  }

  return (head & (1 << 15) ? true : false );

}

/*!
  getPriority

  @param {number} head VSCP head (16-bit or 8-bit)
  @return {number} VSCP priority 0-7 where 0 is highest
                    priority.
*/

var getPriority = function(head) {
  if ( 'number' !== typeof head ) {
    throw(new Error("Parameter error: 'head' should be a number."))
  }
  head = (head & 0xff); // In case 16-bit head 
  return ((head >> 5) & 7);
}

/*!
  Get the VSCP event GUID type (0-7).
  
  @return {number} Priority of the event.
*/

var getGuidType = function(vscpHead) {
  return (this.vscpHead >> 12) & 0x0007;
};


/*!
  isHardCoded

  A hardcoded node is a node where the address is
  set and can not be changed. This is important for
  CAN4VSCP and RS-485 systems where the nickname id 
  is dynamic but the GUID for the node is not.

  @param {number} head VSCP head (16-bit or 8-bit)
  @return {boolean} true if this is a hardcoded address node.
*/

var isHardCoded = function(head) {

  if ( 'number' !== typeof head ) {
    throw(new Error("Parameter error: 'head' should be a number."))
  }

  return (head & (1 << 4));
}

/*! 
  isNoCrc

  Check if the don't calculate CRC bit is set.  This is 
  present for wireless devices and similar.

  @param {number} head VSCP head (16-bit or 8-bit)
  @return {boolean} true if CRC should noe be calculated

*/

var isNoCrc = function(head) {
  if ( 'number' !== typeof head ) {
    throw(new Error("Parameter error: 'head' should be a number."))
  }
  return (head & (1 << 3));
}

/*!
  getRollingIndex

  Some nodes keep a rolling index of there frames (typically
  wireless nodes). This function get the index.

  @param {number} head VSCP head (16-bit or 8-bit)
  @return {number} Rolling index 0-7.
*/

var getRollingIndex = function(head) {

  if ( 'number' !== typeof head ) {
    throw(new Error("Parameter error: 'head' should be a number."))
  }
  return (head & 7);
}

/* ---------------------------------------------------------------------- */

/*!
  toFixed
 
  Round value to a fixed precision.

  @param {number} value        - Value
  @param {number} precision    - Precision
  @return {string} Rounded value
*/

var toFixed = function(value, precision) {

  if ( ('number' !== typeof value) || 
       ('number' !== typeof precision) ) {
    throw(new Error("Parameter error: 'value' and precision' should be numbers."))
  }
  var power = Math.pow(10, precision || 0);
  return String((Math.round(value * power) / power).toFixed(precision));
};

/*! 
  varInteger2Float
  Convert an integer value to floating point value. 
  The integer is stored in a byte array with MSB to LSB 
  storage order.

  @param {number[]} data - Byte array
  @return {number} Float value
*/

var varInteger2Float = function(data) {
  var rval = 0.0;
  var bNegative = false;
  var i = 0;

  if ( !Array.isArray(data) ) {
    throw(new Error("Data must be a byte array."))
  }

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

/*! 
  getDataCoding

  Get data coding.

  @param {number} data - Data
  @return {number} Coding
*/

var getDataCoding = function(data) {

  if ( 'number' !== typeof data ) {
    throw(new Error("Parameter error: 'data' should be a number."))
  }
  return (data >> 5) & 7;
};

/*! 
  getUnit

  Get unit from data coding.

  @param {number} data - Data coding
  @return {number} Unit
*/

var getUnit = function(data) {

  if ( 'number' !== typeof data ) {
    throw(new Error("Parameter error: 'data' should be a number."))
  }
  return (data >> 3) & 3;
};

/*! 
  getSensorIndex

   Get sensor index from data coding.

   @param {number} data - Data coding
   @return {number} Sensor index
*/

var getSensorIndex = function(data) {
  
  if ( 'number' !== typeof data ) {
    throw(new Error("Parameter error: 'data' should be a number."))
  }

  return (data & 7);
};

/*! 
  decodeClass10

  Decode a class 10 measurement.

  @param {number[]} data - Data (event data array where first data byte is the
  data coding)
  @return {number} Value as float
*/

var decodeClass10 = function(data) {

  var rval = 0.0;
  var newData = [];
  var sign = 0;
  var exp = 0;
  var mantissa = 0;
  var str = '';
  var i = 0;

  if ( !Array.isArray(data) ) {
    throw(new Error("Parameter error: 'data' should be a numeric array."))
  }

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

/*! 
  decodeClass60Number

  Decode a class 60 measurement.
  @param {number}  data - Data
  @return {number} Value as float
*/

var decodeClass60Number = function(data) {

  var rval = 0;
  var sign = 0;
  var exp = 0;
  var mantissa = 0;

  if ( !Array.isArray(data) ) {
    throw(new Error("Parameter error: 'data' should be a numeric array."))
  }

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

/*! 
  decodeClass65Number

  Decode a class 65 measurement.

  @param {number} data - Data
  @return {number} Value as float
*/

var decodeClass65Number = function(data) {

  var rval = 0;
  var exp = data[3];
  var i = 0;

  if ( 'number' !== typeof data ) {
    throw(new Error("Parameter error: 'data' should be a number."))
  }

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

/*! 
  isMeasurement

  Returns true if vscpClass is a measurement class

  @param {number} vscpClass - VSCP class to check
  @return {boolean True if vscpClass is a measurement class, false otherwise
*/

var isMeasurement = function(vscpClass) {
  let rv = false;

  if ((10 == vscpClass) || (60 == vscpClass) || (65 == vscpClass) ||
      (70 == vscpClass) || (85 == vscpClass) || (1040 == vscpClass) ||
      (1060 == vscpClass)) {
    rv = true;
  }
  return rv;
}

/*! 
  vscp_getVscpHeadFromCANALid

  @param {number} id canid to get vscpHead from
  @return  {number}  vscpHead
*/

var getVscpHeadFromCANALid = function(id) {

  var hardcoded = 0;
  var priority  = (0x07 & (id >> 26));
  
  if (id & (1 << 25)) {
    hardcoded = 0x10;
  }

  return ((priority << 5) | hardcoded);
}

/*!
  getVscpClassFromCANALid

  @param {number} id canid to get vscpClass from
  @return  {number}  vscpClass
*/

var getVscpClassFromCANALid = function(id) {
  return (0x1ff & (id >> 16));
}

/*!
  getVscpTypeFromCANALid

  @param {number} id canid to get vscpType from
  @return  {number}  vscpType
*/

var getVscpTypeFromCANALid = function(id) {
  return (0xff & (id >> 8));
}

/*!
  getNicknameFromCANALid

  @param {number} id canid from which nodeid/nickname should be extracted
  @return {number} nodeid/nickname
*/

var getNicknameFromCANALid = function(id) {
  return (id & 0xff);
}

/*! 
  getCANALid

  @param {number} vscpPriority VSCP priority (0-7)
  @param {number} vscpClass VSCP class
  @param {number} vscpType VSCP type
*/

var getCANALid = function(vscpPriority,
                      vscpClass,
                      vscpType)
{
    if ( ('number' !== typeof vscpPriority) ||
         ('number' !== typeof vscpClass) ||
         ('number' !== typeof vscpClass) || 
         ( vscpPriority > 7 ) || 
         ( vscpClass > 0x1fff ) || 
         ( vscpType > 0xff ) ) {
      throw( new Error("[getCANALid] Invalid parameter."));
    }

    return ((vscpPriority << 26) |
            (vscpClass << 16) |
            (vscpType << 8) | 0);
}

///////////////////////////////////////////////////////////////////////////////
// convertEventToCanMsg
//
// @param {Event} ev Event to convert
// @return {object} Can message object on success or 
//                  null on failure.


var convertEventToCanMsg = function(ev) {

  if ( ('object' === typeof ev ) && !(ev instanceof Event)) {
    ev = new Event(ev);
  }
  else if (!(ev instanceof Event)) {
    throw(new Error("Parameter should be VSCP Event"));
  }

  var msg = {};         // CAN message
  // msg.ext = true;   // VSCP CAN messages are always extended
  // msg.rtr = false;  // This is no remote transmission request
  msg.id = getCANALid( getPriority(ev.vscpHead), 
                                      ev.vscpClass,
                                      ev.vscpType );
  msg.id += getNodeId(ev.vscpGuid);
  msg.flags = 1; //CANAL extended id
  msg.obid = ev.obid;
  msg.timestamp = ev.vscpTimeStamp;
  msg.data = ev.vscpData;
  // msg.dlc = ev.vscpData.length;
  // if ( msg.dlc > 8 ) {
  //   throw(new Error("Data length is > 8 [" + msg.dlc + "]"));
  // }
  
  
  return msg;
}

/*! 
  convertCanMsgToEvent

   @param {object} msg CAN message object
   @return {Event} Converted event or null on failure.

   canmsg
   {
      ext: false,
      rtr: false,
      timestamp: 1233,
      canid: 123,
      dlc: 4,
      data: [1,2,3,4]
   }
*/

var convertCanMsgToEvent = function(msg) {

  // must be object
  if ( typeof msg !== 'object') {
    throw(new Error("Parameter error: 'msg' should be canmsg object."));
  } 

  // VSCP use id not canid
  if ('undefined' === typeof msg.canid) {
    msg.canid = msg.id;
  }
  
  var ev = {};
  ev.vscpGuid  = "00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00"
  ev.vscpHead  = getVscpHeadFromCANALid(msg.canid);
  ev.vscpClass = getVscpClassFromCANALid(msg.canid);
  ev.vscpType  = getVscpTypeFromCANALid(msg.canid);
  ev.vscpTimeStamp = msg.timestamp || new Date().getTime();
  var d = new Date(new Date().toUTCString());
  ev.vscpDateTime = d.toISOString();
  ev.vscpGuid = setNickName(ev.vscpGuid, getNicknameFromCANALid(msg.canid));
  ev.obid = msg.obid || 0;
  // Handle data
  if (msg.data) { 
    if ( 'string' === typeof msg.data ) {
      ev.vscpData = msg.data.split(',');
    }
    else if ( Array.isArray(msg.data) ) {
      ev.vscpData = msg.data;
    }
    else if (Buffer.isBuffer(msg.data) ) {
      ev.vscpData = Array.prototype.slice.call(msg.data, 0)
    }
  }
  else {
    if ( msg.dlc && (msg.dlc > 0 )) {
      console.error("CAN message has no message data but dlc =",msg.dlc);
    }
    ev.vscpData = [];
  }

  return ev;
}

// module.exports = {

//   Event: Event,

//   // Constants
//   version: version,
//   priorities: priorities,
//   hostCapabilities: hostCapabilities,
// } 

module.exports = {

  Event,

  // Constants
  version,
  priority,
  guidtype,
  hostCapability,
  measurementDataCodingMask,
  measurementDataCoding,

  // Helpers  
  readValue,
  getTime,
  guidToStr,
  strToGuid,
  isGuidZero,
  getNodeId,
  getNickName,
  setNodeId,
  setNickName,
  b64EncodeUnicode,
  b64DecodeUnicode,
  isGuidIpv6,
  isDumbNode,
  isHardCoded,
  isNoCrc,
  getPriority,
  getGuidType,
  getRollingIndex,

  // Measurements
  isMeasurement,
  toFixed,
  varInteger2Float,
  getDataCoding,
  getUnit,
  getSensorIndex,
  decodeClass10,
  decodeClass60Number,
  decodeClass65Number,

  // CANAL conversions
  getVscpHeadFromCANALid,
  getVscpClassFromCANALid,
  getVscpTypeFromCANALid,
  getNicknameFromCANALid,
  getCANALid,
  convertEventToCanMsg,
  convertCanMsgToEvent
}

