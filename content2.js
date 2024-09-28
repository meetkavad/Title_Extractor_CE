chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const likeCount = message.likeCount;
  const commentCount = message.commentCount;
  const genericComment = "#CFBR";
  let liked = 0;
  let commented = 0;

  // Function to process a single post
  function processPost(index, posts) {
    let post = posts[index];
    if (!post || index >= posts.length) {
      console.log("No more posts to process or limit reached.");
      return;
    }

    // Like logic
    const usernameElement = post.querySelector(
      ".update-components-actor__name"
    );
    const username = usernameElement?.textContent || "Unknown user";
    console.log(`Processing post of user: ${username}`);

    if (liked < likeCount) {
      const likeButton = post.querySelector('button[aria-label="React Like"]');
      if (likeButton) {
        console.log("Like button found!");
        likeButton.click(); // Like the post
        liked++;
        console.log(`Liked post ${liked}`);
      } else {
        console.log("Like button not found.");
      }
    }

    // Comment logic
    if (commented < commentCount) {
      const commentButton = post.querySelector('button[aria-label="Comment"]');
      if (commentButton) {
        commentButton.click(); // Open comment box
        console.log("Comment button found!");

        setTimeout(() => {
          const commentBox = post.querySelector(".ql-editor");
          if (commentBox) {
            commentBox.innerHTML = `<p>${genericComment}</p>`; // Set comment content
            console.log(`Comment written: ${genericComment}`);

            setTimeout(() => {
              const submitButton = post.querySelector(
                "button.comments-comment-box__submit-button--cr"
              );
              if (submitButton) {
                console.log("Submit button found! Clicking submit...");
                submitButton.click(); // Submit the comment
                commented++;
                console.log(`Comment submitted on post ${commented}`);
              } else {
                console.log("Submit button not found.");
              }
            }, 1500); // Delay for submit button
          } else {
            console.log("Comment box not found.");
          }
        }, 1000); // Delay for comment box to appear
      } else {
        console.log("Comment button not found.");
      }
    }

    // Log the progress
    console.log(
      `Actions on ${username}'s post done. Liked: ${liked}, Commented: ${commented}`
    );

    // If we haven't reached the target likes and comments, continue to the next post
    if (liked < likeCount || commented < commentCount) {
      setTimeout(() => {
        processPost(index + 1, posts);
      }, 3000); // Add a 3-second delay between posts
    } else {
      console.log("Reached the required number of likes and comments.");
    }
  }

  // Wait for the feed to load fully
  setTimeout(() => {
    const posts = document.querySelectorAll("#fie-impression-container");
    if (posts.length > 0) {
      console.log(`Found ${posts.length} posts to process.`);
      // Start processing the first post
      processPost(0, posts);
    } else {
      console.log("No posts found.");
    }
  }, 3000); // Wait 3 seconds to ensure the feed has loaded
});
