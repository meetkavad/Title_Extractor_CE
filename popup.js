import { profiles } from "./profileLink.js";
const btn = document.querySelector(".extract-button");

btn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openProfiles", links: profiles });
});
