const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');

const vscp = require("../src/vscp.js");
var ev = new vscp.Event();
console.log("Module version: " + vscp.version.major + "."+ vscp.version.minor + "." + vscp.version.release);

console.log(vscp.getPriority(0x88));
console.log(vscp.isHardCoded(0x88));

// Define event by setting from text
e = new vscp.Event();
if (true === (e instanceof vscp.Event)) {
    console.log("YES! e is an instance of Event.");
}
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

console.log("\ne5");
console.log("----------------------------------------------");

// Define event with object in constructor and data defined 
// as string. 
// Also with symbolic class/type
// Unit=1 Celsius
// Sensor = 1
// Format: Normalized integer
// Value = -2.92 C
e5 = new vscp.Event({
    vscpHead: 3,
    vscpClass: vscp_class.VSCP_CLASS1_MEASUREMENT,
    vscpType: vscp_type.VSCP_TYPE_MEASUREMENT_TEMPERATURE,
    vscpGuid: "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01",
    vscpsizeData: 4,
    vscpData: [0x89,0x82,0xFE,0xDC]
});
console.log(e5);
console.log(typeof e5.vscpDateTime);

console.log("readValue(\"77\")",vscp.readValue("77"));
console.log("readValue(\"0x77\")",vscp.readValue("0x77"));
console.log("readValue(\"0b1010\")",vscp.readValue("0b1010"));
console.log("readValue(\"0o77\")",vscp.readValue("0o77"));
console.log("readValue(\"0y77\")",vscp.readValue("0y77"));

console.log("\nCANAL conversion functionality");
console.log("------------------------------");

console.log("vscpHead = " + vscp.getVscpHeadFromCANALid(470418944 + 9));
console.log("vscpClass = " + vscp.getVscpClassFromCANALid(470418944 + 9));
console.log("vscpType = " + vscp.getVscpTypeFromCANALid(470418944 + 9));
console.log("Nickname = " + vscp.getNicknameFromCANALid(470418944 + 9) )

console.log("priority=7, vscpClass=10, vscpType=6  canid=" + vscp.getCANALid(7,10,6) );
try {
    console.log("priority=7, vscpClass=10, vscpType=600  canid=" + vscp.getCANALid(7,10,600) );
}
catch(err) {
    console.log("Catched invalid parameter error: (vscpType value is to big)", err.message );
}

console.log("\nTesting Event conversions\n\n",e5);
console.log(vscp.convertEventToCanMsg(e5) );