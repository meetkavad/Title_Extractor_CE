function scrapeLinkedInProfile() {
  const mainDiv = document.querySelector(".scaffold-layout__main");
  const infoSection = mainDiv.children[0];

  // Get the person's name
  const nameLink = document.querySelector("a[href*='about-this-profile']");
  const nameElement = nameLink.querySelector("h1");
  const name = nameElement ? nameElement.innerText.trim() : null;

  // Get the person's location
  const locDivOne = infoSection.querySelector(".ph5");
  const locDivTwo = locDivOne.querySelector(".mt2");
  const locDivThree = locDivTwo.children[2];
  const locationElement = locDivThree.querySelector("span");
  const location = locationElement ? locationElement.innerText.trim() : null;

  const aboutSection = mainDiv.children[1];

  // Get the person's about section
  const aboutElement = aboutSection.querySelectorAll("span")[2];
  const about = aboutElement ? aboutElement.innerText.trim() : null;

  // Get the person's bio
  const bioElement = document.querySelector(
    "div[data-generated-suggestion-target]"
  );
  const bio = bioElement ? bioElement.innerText.trim() : null;

  // Get the follower count and connection count
  const followerList = locDivOne.children[2];
  const numFolConn = followerList.querySelectorAll("li");
  const followerElement = numFolConn[0].querySelector("span");
  const followerCount = followerElement
    ? followerElement.innerText.replace(/\D/g, "").trim()
    : null;

  var connectionElement;
  if (numFolConn.length > 1) {
    connectionElement = numFolConn[1].querySelector("span");
  }
  const connectionCount = connectionElement
    ? connectionElement.innerText.replace(/\D/g, "").trim()
    : null;

  // Get the LinkedIn profile URL
  const profileUrl = window.location.href;

  return {
    name,
    location,
    about,
    bio,
    followerCount,
    connectionCount,
    profileUrl,
  };
}

// Function to send data to backend
async function sendToBackend(data) {
  try {
    const backendUrl = "http://localhost:5000/api/profiles/create";

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile: data }),
    });
    if (response.ok) {
      console.log("data sent successfully");
    } else {
      console.log("Internal Server Error");
    }
  } catch (error) {
    console.log(error.message);
  }
}

setTimeout(() => {
  const profileData = scrapeLinkedInProfile();
  sendToBackend(profileData);
}, 5000);
