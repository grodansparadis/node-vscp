const vscp_class = require('node-vscp-class');
const vscp_type = require('node-vscp-type');

const vscp = require("../src/vscp.js");
const {priority:ttt} = require("../src/vscp.js");

var ev = new vscp.Event();
console.log("Module version: " + vscp.version.major + "."+ vscp.version.minor + "." + vscp.version.release);

console.log(vscp.getPriority(0x88));
console.log(vscp.isHardCoded(0x88));

// Define event by setting from string
e = new vscp.Event();
if (true === (e instanceof vscp.Event)) {
    console.log("YES! e is an instance of Event.");
}
e.setFromString('3,10,6,4,2020-02-11T17:00:02Z,4074759495,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,0x48,0x35,0x31,0x2E,0x39,0x32');
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
    vscpHead: vscp.priority.PRIORITY_6 << 5,
    vscpClass: vscp_class.VSCP_CLASS1_MEASUREMENT,
    vscpType: vscp_type.VSCP_TYPE_MEASUREMENT_TEMPERATURE,
    vscpGuid: "FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01",
    vscpsizeData: 4,
    vscpData: [0x89,0x82,0xFE,0xDC]
});

console.log(e5);

console.log("Event on string form: ", e5.getAsString());
console.log("Type of:" + typeof e5.vscpDateTime);

console.log("\nisIPV6Addr");
console.log("IP v6 address :", (e5.isIPV6Addr() ? "yes" : "no" ), " - vscpHead", e5.vscpHead );
e5.setIPV6Addr();
console.log("IP v6 address :", (e5.isIPV6Addr() ? "yes" : "no" ), " - vscpHead", e5.vscpHead );

console.log("\nisDumbNode");
console.log("Dumb node :", (e5.isDumbNode() ? "yes" : "no" ), " - vscpHead", e5.vscpHead );
e5.setDumbNode();
console.log("Dumb node :", (e5.isDumbNode() ? "yes" : "no" ), " - vscpHead", e5.vscpHead );

console.log("\nisHardCodedAddr");
console.log("Hardcoded address :", (e5.isHardCodedAddr() ? "yes" : "no" ), " - vscpHead", e5.vscpHead );
e5.setHardCodedAddr();
console.log("Hardcoded address :", (e5.isHardCodedAddr() ? "yes" : "no" ), " - vscpHead", e5.vscpHead );

console.log("\nisDoNotCalcCRC");
console.log("Calculate CRC :", (e5.isDoNotCalcCRC() ? "yes" : "no" ), " - vscpHead", e5.vscpHead );
e5.setDoNotCalcCRC();
console.log("Calculate CRC :", (e5.isDoNotCalcCRC() ? "yes" : "no" ), " - vscpHead", e5.vscpHead );

console.log("\nPriority");
console.log("--------");
console.log("Priority is", e5.getPriority()  );
e5.setPriority(vscp.priority.PRIORITY_NORMAL);
console.log("Priority is", e5.getPriority()  );

console.log("\nGUID Type");
console.log("--------");
e5.vscpHead = 0;
console.log("GUID type is", e5.getGuidType()  );
e5.setGuidType(vscp.guidtype.GUIDTYPE_IPV6);
console.log("GUID type is", e5.getGuidType()  );

console.log("\nreadValue");
console.log("---------");
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

// From require of just priority constants
// and where the name is changed from 'priority'
// to 'ttt'
console.log(ttt.PRIORITY_HIGH);
console.log(ttt.PRIORITY_LOW);

var h1 = 0;
console.log("Is standard GUID?",  
    (h1 === vscp.guidtype.GUIDTYPE_STANDARD ) ? "yes" : "no");

// what_can_you_do is fetched from server to
// know what capabilities it have
var what_can_you_do = 0x000f;
console.log( "Does server accept more than one connection? ", 
(what_can_you_do & vscp.hostCapability.TWO_CONNECTIONS) ? "yes" : no );


// Gettime
console.log(vscp.getTime());

// guidStr
var guid = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
console.log(vscp.guidToStr(guid));

var strguid1 = "00:01:02:02:04:05:06:07:08:09:0a:0b:0c:0d:0e:0f";
console.log(vscp.strToGuid(strguid1));

var strguid2 = "00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00";
console.log("Check GUID str 1 - "+vscp.isGuidZero(strguid1));
console.log("Check GUID str 2 - "+vscp.isGuidZero(strguid2));

var guid1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var guid2 = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
console.log("Check GUID array 1 - "+vscp.isGuidZero(guid1));
console.log("Check GUID array 2 - "+vscp.isGuidZero(guid2));

console.log("Nodeid - ",vscp.getNodeId(strguid1),vscp.getNickName(strguid1));

// setNodeId / setNickName
console.log(vscp.setNodeId(strguid1,255));
console.log(vscp.setNickName(strguid1,115));

console.log(vscp.b64EncodeUnicode("This is a test string"));

console.log(vscp.b64DecodeUnicode("Q2FycGUgRGllbQo="));

console.log("Is this an Ipv6 node: " + vscp.isGuidIpv6(0xff00) );
console.log("Is this an dumb node: " + vscp.isDumbNode(0xff00) );

console.log("Priority: " + vscp.getPriority(0xffff) );
console.log("GUID type: " + vscp.getGuidType(0x1f00) );
console.log("Rolling index: " + vscp.getRollingIndex(0x1234) );

// Value = -2.92 C
// vscpData: [0x89,0x82,0xFE,0xDC]
console.log("Fixed precision is " + vscp.toFixed(1.234, 1));
console.log("Integer value is " + vscp.varInteger2Float([0xFE,0xDC]));
console.log("Data coding is " + vscp.getDataCoding(0x89) );

var d = [0x89,0x82,0xFE,0xDC];
console.log("Measurement type",
    (d[0] & vscp.measurementDataCodingMask.MASK_DATACODING_TYPE) >> 5 );
console.log("Measurement unit",
    (d[0] & vscp.measurementDataCodingMask.MASK_DATACODING_UNIT) >> 3 );
console.log("Measurement sensor index",
    d[0] & vscp.measurementDataCodingMask.MASK_DATACODING_INDEX );

console.log("Is this a normalized integer",
    (d[0] & vscp.measurementDataCodingMask.MASK_DATACODING_TYPE) === 
    vscp.measurementDataCoding.DATACODING_NORMALIZED );    

console.log("Datacoding: ",vscp.getDataCoding(d[0]));
console.log("Unit: ",
    vscp.getUnit(d[0]));
console.log("Sensor index: ",
    vscp.getSensorIndex(d[0]));

console.log("Measurement data [0x89,0x82,0xFE,0xDC]is ",
            vscp.decodeClass10(d));

console.log(e5.toString());

// --------------------------------------------------------------
// convertCanMsgToEvent
// --------------------------------------------------------------

console.log(vscp.getCANALid(7,10,6)+42);
console.log(vscp.getNicknameFromCANALid(vscp.getCANALid(7,10,6)+42));

console.log(" --- convertCanMsgToEvent 1");
console.log( vscp.convertCanMsgToEvent({
    canid: vscp.getCANALid(7,10,6)+42,
    ext: true,
    rtr: false,
    dlc: 4,
    data: "1,2,3,4"
  }
));

console.log(" --- convertCanMsgToEvent 2");
console.log( vscp.convertCanMsgToEvent({
    canid: vscp.getCANALid(7,10,6)+42,
    ext: true,
    rtr: false,
    dlc: 4,
    data: [1,2,3,4]
  }
));

console.log(" --- convertCanMsgToEvent 3");
console.log( vscp.convertCanMsgToEvent({
    canid: vscp.getCANALid(7,10,6)+42,
    ext: true,
    rtr: false,
    dlc: 4,
    data: new Buffer.from([1,2,3,4])
  }
));

console.log(" --- convertCanMsgToEvent 4");
console.log( vscp.convertCanMsgToEvent({
    canid: vscp.getCANALid(7,10,6)+42,
    ext: true,
    rtr: false,
  }
));

console.log(" --- convertCanMsgToEvent 5");
console.log( vscp.convertCanMsgToEvent({
    canid: vscp.getCANALid(7,10,6)+42,
    ext: true,
    rtr: false,
    dlc: 4,
  }
));


// convertEventToCanMsg

console.log(" --- convertEventToCanMsg");
console.log(vscp.convertEventToCanMsg(e5));