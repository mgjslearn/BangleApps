

const message = document.getElementById("customSurvey");
const hour = document.getElementById("hour");
const min = document.getElementById("minute");

var connection;
document.getElementById("upload").addEventListener("click", function() {
  // disconnect if connected already
  if (connection) {
    connection.close();
    connection = undefined;
  }

// set snooze
// test 2 alarms at the same time
  var BANGLE_CODE = `
Bangle.loadWidgets();
Bangle.drawWidgets();
require("sched").getAlarms();
require("sched").newDefaultAlarm();
require("sched").setAlarm("myalarm", {
  msg: "${mess}",
  t: ${time},
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

var notifCounter = 0;
  
    function executeLunchReminder() {
       Puck.write('LED1.set();\n'); 
       showAlert2(); 
    }
       
    function showAlert1() {
      var myText = "HOMEWORK TIMER + REMINDER HAS BEEN SENT TO YOUR CHILD'S BANGLE WATCH";
      alert(myText);
      notifCounter = 1;
    }
    function showAlert2() {
      var myText = "MEAL TIME REMINDER HAS BEEN SENT TO YOUR CHILD'S BANGLE WATCH";
      alert(myText);
      let drag;
      notifCounter = 1; 
    }


    /***
    var Layout = require("Layout");
let drag;
const answers = [];
let answers0 = "Snoozed";
let answers1 = "No";
let answers2 = "Confirmed";



const states = {
  init: 1, // initial survey screen
  lunch: 2, // lunch
  pleaseRemember: 3, // remember 
  YayBye: 4, // yay farewell
  confirm: 5
};


var layout = new Layout( {
    type:"v", c: [
      {type:"txt", font:"6x8:1",pad:4, label:"View Parent Survey?", id:"label" },
      {type:"btn",font:"6x8:1", label:"View",pad:5, cb:()=> lunchReminder(), cbl: l=>print("One long press")},
    {type:"btn",font:"6x8:1",label:"Snooze",pad:4, cb:()=> setTimeout('', 1000), cbl: l=>print("long press to return")},
    ]
  });


function setLabel(x) {
  layout.label.label = x;
  layout.render();
}
g.clear();
layout.render();

function SnoozeFunc() {
  E.showMessage("Reminder Snoozed!");
 //setTimeout(introPage(), 1000);
}


function introPage() {
  g.clear();
  var layout = new Layout( {
  type:"v", c: [
      {type:"btn",font:"6x8:2", label:"View",pad:6, cb:()=> lunchReminder(), cbl: l=>print("One long press")},
    {type:"txt", font:"6x8:1.5",pad:4, label:"View Parent Survey?", id:"label" },
    {type:"btn",font:"6x8:2",label:"Snooze",pad:4, cb:()=> SnoozeFunc(), cbl: l=>print("long press to return")},
]});
g.clear();
layout.render();
}

introPage();

function lunchReminder() {
  answers0 = "View";
  g.clear();
  var layout = new Layout( {
  type:"v", c: [
      {type:"btn",font:"6x8:2", label:"Yes",pad:6, cb:()=> YesconfirmScreen(), cbl: l=>print("One long press")},
    {type:"txt", font:"6x8:2",pad:4, label:"Fruits eaten?", id:"label" },
    {type:"btn",font:"6x8:2",label:"No",pad:4, cb:()=> NoconfirmScreen(), cbl: l=>print("long press to return")},
]});
g.clear();
layout.render();
}


function NoconfirmScreen() {
  answers1 = "No";
  state = states.confirm;

  if(state == states.confirm) {
  E.showMessage("Confirm No?","Swipe up/down > confirm + right/left > back"); 
      Bangle.on("drag", e => {
      if (!drag) { // start dragging
        drag = {x: e.x, y: e.y};
      } else if (!e.b) { // released
        const dx = e.x-drag.x, dy = e.y-drag.y;
        drag = null;
        if (Math.abs(dy)>Math.abs(dx)+10) {
          // vertical up
          E.showMessage("DONE!","End of Survey");
         answers[2] = "Confirmed Answer";
        }  
        else if (Math.abs(dx)>Math.abs(dy)-10) {
          // vertical down
           lunchReminder();
        } 
       
       
       
      }
  }
                
);
      
  } 

}

function YesconfirmScreen() {

  state = states.confirm;
answers1 = "Yes";
  if(state == states.confirm) {
  E.showMessage("Confirm Y?","Swipe up/down > confirm + right/left > back"); 
      Bangle.on("drag", e => {
      if (!drag) { // start dragging
        drag = {x: e.x, y: e.y};
      } else if (!e.b) { // released
        const dx = e.x-drag.x, dy = e.y-drag.y;
        drag = null;
        if (Math.abs(dy)>Math.abs(dx)+10) {
          // vertical up
          E.showMessage("DONE!","End of Survey");
          answers2 = "Confirmed Answer";
        }  
        else if (Math.abs(dx)>Math.abs(dy)-10) {
          // vertical down
           lunchReminder();
        } 
       
       
       
      }
  }
                
);
      
  } 
 
}

const myJSON = '{"q1": "View Survey", "q2": "Fruits eaten?","q3": "Confirm Answer?"}';
const qJSON= JSON.parse(myJSON);

const answersJSON = JSON.stringify(answers);

 
let text = "";
answers[0] = answers0;
answers[1] = answers1;
answers[2] = answers2;
    const aJSON = JSON.parse(answersJSON);
  
let text = "";
for (const x in qJSON) {
  text += x + "Question:  " + myObj[x] + " ";
}
    for (const x in aJSON) {
  text += x + "Answer:  " + aJSON[x] + " ";
}
 ****/





/**'{

          "dayTimeSurvey": [{
              "question1": "did you eat your fruits today?",
              "answer1": "yes",
              "scheduled": 430
            },
            {
              "question1": "did you take your umbrella with you today?",
              "answer1": "yes",
              "type": "internet"
            },
            {
              "question1": "did you finish your homework?",
              "answer1": "yes",
              "type": "internet"
            }

          ],
          "EveningSurvey": [{
              "question4": "ready for your club meeting?",
              "answer4": "yes"
            },
            {
              "question5": "do you have any exams tomorrow?",
              "answer5": "yes",
              "type": "internet"
            },
            {
              "question6": "did you finish your homework?",
              "answer6": "yes",
              "type": "internet"
            }

          ]
       }'  
**/

/***
  var SURVEY_CODE = `
   E.showMessage("Hi","YAY");
`;

     

  var connection;
document.getElementById("reminder").addEventListener("click", function() {
  // disconnect if connected already
  if (connection) {
    connection.close();
    connection = undefined;
  }

  // Connect
  Puck.connect(function(c) {
    if (!c) {
      alert("Couldn't connect!");
      return;
    }
    connection = c;
    // reset the Bangle
    connection.write("reset();\n", function() {
      // Wait for it to reset itself
      setTimeout(function() {
        // upload code to it
        connection.write(SURVEY_CODE);
      }, 1000);
    });

  });
});
***/

//let result = BluetoothRemoteGATTCharacteristic[characteristic];
//result.service = 
// result.uuid = 

    /****** 
   
    property BluetoothRemoteGATTServer.connected;
    options =  {
      minInterval // min connection interval in milliseconds, 7.5 ms to 4 s
      maxInterval // max connection interval in milliseconds, 7.5 ms to 4 s
    };  
    function BluetoothRemoteGATTServer.connect(options);
    
    BluetoothRemoteGATTCharacteristic.on('characteristicvaluechanged', function() { 
     connection.write('E.showMessage("Hello")');
    });
     
    
                                                                                   
    function BluetoothRemoteGATTCharacteristic.startNotifications() {
      var device;
      NRF.connect(device_address).then(function(d) {
        device = d;
        return d.getPrimaryService("service_uuid");
      }).then(function(s) {
        console.log("Service ",s);
        return s.getCharacteristic("characteristic_uuid");
      }).then(function(c) {
        c.on('characteristicvaluechanged', function(event) {
          console.log("-> ",event.target.value); // this is a DataView
        });
        return c.startNotifications();
      }).then(function(d) {
        console.log("Waiting for notifications");
      }).catch(function() {
        console.log("Something's broken.");
      });
    }
   *********/
