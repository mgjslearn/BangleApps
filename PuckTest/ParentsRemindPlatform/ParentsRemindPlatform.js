const message = document.getElementById("detail");
const hour = document.getElementById("hour");
const min = document.getElementById("minute");

  
var connection;
document.getElementById("upload").addEventListener("click", function() {
  // disconnect if connected already
  if (connection) {
    connection.close();
    connection = undefined;
  }

  var BANGLE_CODE = '
 Bangle.loadWidgets();
Bangle.drawWidgets();
require("sched").getAlarms();
require("sched").newDefaultAlarm();
require("sched").setAlarm("myalarm", {
  msg: "${message}",
  rp: true
});
require("sched").reload();
Bangle.buzz();
Bangle.setLCDPower(1);
`;
  
  // Connect
  Puck.connect(function(c) {
    if (!c) {
      alert("Couldn't connect!");
      return;
    }
    connection = c;
    // First, reset the Bangle
    connection.write("reset();\n", function() {
      // Wait for it to reset itself
      setTimeout(function() {
        // Now upload our code to it
        connection.write(BANGLE_CODE);
      }, 1000);
    });

  });
});


  
