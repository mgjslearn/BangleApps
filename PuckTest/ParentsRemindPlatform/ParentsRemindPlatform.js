 var notifCounter = 0;
  
    function executeLunchReminder() {
     
       showAlert2(); 
       Puck.write('LED1.set();\n'); 
       connection.write(E.showMessage("test","test"));
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

  var BANGLE_CODE = `
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
        connection.write(executeLunchReminder());
      }, 1000);
    });

  });
});

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
