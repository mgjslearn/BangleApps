var connection;
document.getElementById("upload").addEventListener("click", function() {
  // disconnect if connected already
  if (connection) {
    connection.close();
    connection = undefined;
  }

  const mess = document.getElementById("detail").value;
  const time = document.getElementById("time").value;
  const timeHour = time.substring(0,2) * 3600000;
  const timeMin = time.substring(3,5) * 60000;

  const date = document.getElementById("date").value;
  document.getElementById("demo").innerHTML = date;

  const repeat = document.getElementById("repeat").value;

  var BANGLE_CODE = `
Bangle.loadWidgets();
Bangle.drawWidgets();
require("sched").getAlarms();
require("sched").setAlarm("alarm", {
  msg: "${mess}",
  t: ${timeHour+timeMin},
  date: "${date}"
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

function addAlarm() {
  const newTime = document.createElement('INPUT');
  newTime.setAttribute("type", "time");
  newTime.setAttribute("id", "time");
  newTime.setAttribute("class", "item");
  document.getElementById("timeDiv").appendChild(newTime); 

  const newDate = document.createElement('INPUT');
  newDate.setAttribute("type", "date");
  newDate.setAttribute("id", "date");
  newDate.setAttribute("class", "item");
  document.getElementById("dateDiv").appendChild(newDate); 

  const newMsg = document.createElement('INPUT');
  newMsg.setAttribute("type", "text");
  newMsg.setAttribute("id", "detail");
  newMsg.setAttribute("class", "item");
  document.getElementById("detailDiv").appendChild(newMsg); 

  const newPtrn = document.createElement('INPUT');
  newPtrn.setAttribute("type", "text");
  newPtrn.setAttribute("id", "repeat");
  newPtrn.setAttribute("class", "item");
  document.getElementById("patternDiv").appendChild(newPtrn); 
}
