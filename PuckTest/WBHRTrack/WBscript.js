const controlButton = document.getElementById("controlButton");
const deviceNameInput = document.getElementById("deviceNameInput");
const connectionStatus = document.getElementById("connectionStatus");
controlButton.addEventListener("click", BLEManager);
async function BLEManager() {
     // acceptAllDevices:true //scans for all devices
    const device = await navigator.bluetooth.requestDevice({
    filters: [{
      name: Bangle4e3c.value, //scans for devices only named Bangle4e3c
      services: ['heart_rate']
    }],
    optionalServices: ['battery_service']
  });
 
}
