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
  }
  catch {
    connectionStatus.textContent = "CANCELLED";
  }

}
