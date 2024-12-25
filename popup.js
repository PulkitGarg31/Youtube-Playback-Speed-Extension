document.getElementById('setSpeedBtn').addEventListener('click', () => {
  const speed = parseFloat(document.getElementById('speedInput').value);
  if (isNaN(speed) || speed <= 0) {
    alert('Please enter a valid speed greater than 0.');
    return;
  }

  // Send a message to the background script
  chrome.runtime.sendMessage({ type: "setSpeed", speed }, (response) => {
    if (response?.status === "Speed adjustment message sent") 
    {
      console.log("Speed adjustment request forwarded to content script.");
      speedInput.value ="";
    } 
    else 
    {
      console.error("Failed to send speed adjustment request.");
    }
  });
});
