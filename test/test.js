const vscp = require("../src/vscp.js");

console.log("Module version: " + vscp.version.major + "."+ vscp.version.minor + "." + vscp.version.release);

console.log(vscp.getPriority(0x88));
console.log(vscp.isHardCoded(0x88));

console.log(vscp.varTypes.STRING);

e = new vscp.Event();
e.setFromText('3,10,6,4,2020-02-11T17:00:02Z,4074759495,FF:FF:FF:FF:FF:FF:FF:FE:B8:27:EB:40:59:96:00:01,0x48,0x35,0x31,0x2E,0x39,0x32');
