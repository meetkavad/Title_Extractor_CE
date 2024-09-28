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
  } else if (message.action === "openLinkedinFeed") {
    chrome.tabs.create({ url: "https://www.linkedin.com/feed/" }, (tab) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["content2.js"], // Inject the script first
        },
        () => {
          // After injecting content2.js, send the message with likeCount and commentCount
          chrome.tabs.sendMessage(tab.id, {
            likeCount: message.likeCount,
            commentCount: message.commentCount,
          });
        }
      );
    });
  }
});
