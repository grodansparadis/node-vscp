const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');

const vscp = require("../src/vscp.js");

console.log("Module version: " + vscp.version.major + "."+ vscp.version.minor + "." + vscp.version.release);

console.log(vscp.getPriority(0x88));
console.log(vscp.isHardCoded(0x88));

console.log(vscp.varTypes.STRING);

// Define event by setting from text
e = new vscp.Event();
e.setFromText('3,10,6,4,2020-02-11T17:00:02Z,4074759495,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,0x48,0x35,0x31,0x2E,0x39,0x32');
console.log(e);

// Define event with members
e2 = new vscp.Event();
e2.vscpClass = 10;
e2.vscpType = 6;
e2.data = [1,2,3,4,5];
console.log(e2);

// Define event with string in constructor
// obid, date, timestamp and GUID can be non-value
e3 = new vscp.Event({text:'0,20,3,,,,-,15,14,13,12,11,10,9,8,7,6,5,4,3,2,0,0,1,35'});
console.log(e3);

// Define event with object in constructor and data in array
e4 = new vscp.Event({
    vscpHead: 0,
    vscpClass: 10,
    vscpType: 6,
    vscpData: [15,14,13,12,11,10,9,8,7,6,5,4,3,2,0,0,1,35]
});
console.log(e4);

// Define event with object in constructor and data defined 
// as string. 
// Also with symbolic class/type
// Unit=1 Celsius
// Sensor = 1
// Format: Normalized integer
// Value = -2.92 C
e5 = new vscp.Event({
    vscpHead: 0,
    vscpClass: vscp_class.VSCP_CLASS1_MEASUREMENT,
    vscpType: vscp_type.VSCP_TYPE_MEASUREMENT_TEMPERATURE,
    vscpData: "0x89,0x82,0xFE,0xDC"
});
console.log(e5);
console.log(typeof e5.vscpDateTime);




