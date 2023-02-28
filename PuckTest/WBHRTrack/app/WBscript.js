const controlButton = document.getElementById("controlButton");
const deviceNameInput = document.getElementById("deviceNameInput");
const connectionStatus = document.getElementById("connectionStatus");
controlButton.addEventListener("click", BLEManager);
async function BLEManager() {

  connectionStatus.textContent = "SEARCHING";

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{
        name: deviceNameInput.value,
        services: ['heart_rate', 'battery_service']
      }]
    });

    const connectedDevice = await device.gatt.connect();
    connectionStatus.textContent = "CONNECTED";

  }
  catch {
    if (typeof device !== 'undefined') {
      connectionStatus.textContent = "CONNECTION FAILED";
    }
    else {
      connectionStatus.textContent = "CANCELLED"
    }
  }
 
}
