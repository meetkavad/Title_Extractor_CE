const btn = document.querySelector(".extract-button");
const titleElement = document.querySelector(".display-title");

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractTitle,
  });
});

async function extractTitle() {
  try {
    const title = document.title;
    alert(title);
  } catch (error) {
    console.error(error);
  }
}
