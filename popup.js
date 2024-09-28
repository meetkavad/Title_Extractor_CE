// import { profiles } from "./profileLink.js";
const likeCountInput = document.getElementById("like-count");
const commentCountInput = document.getElementById("comment-count");
const btn = document.querySelector(".action-button");

btn.addEventListener("click", () => {
  const likeCount = parseInt(likeCountInput.value);
  const commentCount = parseInt(commentCountInput.value);

  if (!isNaN(likeCount) && !isNaN(commentCount)) {
    // Send like and comment counts to the background script
    chrome.runtime.sendMessage({
      action: "openLinkedinFeed",
      likeCount: likeCount,
      commentCount: commentCount,
    });
  } else {
    alert("Please enter valid numbers for both like and comment count");
  }
});
