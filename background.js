// Listener for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "setSpeed") {
    // Query the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        sendResponse({ status: "No active tab found" });
        return;
      }

      const activeTab = tabs[0];

      // Inject content script if necessary
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          files: ["content.js"],
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Error injecting content script:", chrome.runtime.lastError.message);
            sendResponse({ status: "Error injecting content script" });
            return;
          }

          // Send the speed adjustment message to the content script
          chrome.tabs.sendMessage(
            activeTab.id,
            { speed: message.speed },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error("Error sending message to content script:", chrome.runtime.lastError.message);
                sendResponse({ status: "Error sending message to content script" });
              } else {
                sendResponse({ status: "Speed adjustment message sent", response });
              }
            }
          );
        }
      );
    });

    // Return true to indicate asynchronous response
    return true;
  }
});
