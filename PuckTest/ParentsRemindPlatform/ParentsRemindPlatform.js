var connection;
document.getElementById("upload").addEventListener("click", function() {
  // disconnect if connected already
  if (connection) {
    connection.close();
    connection = undefined;
  }
  const message = document.getElementById("reminderValue").value;
  const hours = document.getElementById("hourValue").value;
  const mins = document.getElementById("minValue").value;  
  const hour_val = hours * 3600000;
  const min_val = mins * 60000;
  
     document.getElementById("upload").addEventListener("click", function() {
     var connection;
  
  // disconnect if connected already
  var BANGLE_CODE = `
Bangle.loadWidgets();
Bangle.drawWidgets();
require("sched").getAlarms();
require("sched").setAlarm("alarm", {
  msg: "${message}",
  t: ${hour_val+min_val},
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
