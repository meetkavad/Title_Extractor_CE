chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openProfiles") {
    message.links.forEach((link, index) => {
      setTimeout(() => {
        chrome.tabs.create({ url: link }, (tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
          });
        });
      }, index * 5000); // to open each link with a delay of 5 seconds
    });
  }
});
