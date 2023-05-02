document.getElementById("repeat").addEventListener("change", function() {
    var customRepeat = document.getElementById("custom-repeat");
    if (this.value == "custom") {
      customRepeat.style.display = "block";
    } else {
      customRepeat.style.display = "none";
    }
  });
  
  document.getElementById("custom-end").addEventListener("change", function() {
    var customEndDate = document.getElementById("custom-end-date");
    var customEndOccurrences = document.getElementById("custom-end-occurrences");
    if (this.value == "on") {
      customEndDate.style.display = "inline-block";
      customEndOccurrences.style.display = "none";
    } else if (this.value == "after") {
      customEndDate.style.display = "none";
      customEndOccurrences.style.display = "inline-block";
    } else {
      customEndDate.style.display = "none";
      customEndOccurrences.style.display = "none";
    }
  });
