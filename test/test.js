const vscp = require("../src/vscp.js");

console.log("Module version: " + vscp.version.major + "."+ vscp.version.minor + "." + vscp.version.release);

console.log(vscp.getPriority(0x88));
console.log(vscp.isHardCoded(0x88));

console.log(vscp.varTypes.STRING);
