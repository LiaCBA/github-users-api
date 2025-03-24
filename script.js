"use strict";

const username = document.getElementById("username");
const text = document.getElementById("text");
const xIcon = document.querySelector(".x-icon");
const themeSwitch = document.getElementById("themeswitch");
const body = document.body;
const noResults = document.getElementById("nores");
text.style.display = "none";

username.addEventListener("input", function () {
  const usernameApi = `https://api.github.com/users/${username.value}`;
  text.innerHTML = "";
  text.style.display = "";
  if (username.value) {
    fetch(usernameApi)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Not Found") {
          text.innerHTML = `<p class="nores">No result</p>`;
          return;
        }
        text.innerHTML = `
          <div class="wrapper">
            <div class="text-content">
               <div class="top-section">
               <img src="${data.avatar_url}" alt="Profile Picture" />
               <div class="top-text">
               <p class="name">${data.name || "Not Available"}</p> 
                <p class="username">@${data.login}</p>
                 <p class="bio-laptop">${data.bio || "No bio available."}</p>
                 <p class="date-mob">Joined ${new Date(data.created_at)
                   .toDateString()
                   .slice(4)}</p>
                </div>
                <p class="date-laptop">Joined ${new Date(data.created_at)
                  .toDateString()
                  .slice(4)}</p>    
               </div>
              <div class="bottom-section">
              <p class="bio-mob">${data.bio || "No bio available."}</p>
                <div class="info-container">
                  <div class="info">
                    <h4>Repos</h4>
                    <p>${data.public_repos}</p>
                  </div>
                  <div class="info">
                    <h4>Followers</h4>
                    <p>${data.followers}</p>
                  </div>
                  <div class="info">
                    <h4>Following</h4>
                    <p>${data.following}</p>
                  </div>
                </div>
                    <div class="links-container">
                    <p>
                      <img src="assets/svg/location.svg" alt="location" />
                      ${data.location || "Not Available"}
                    </p>
                    <p>
                      <img src="assets/svg/twitter.svg" alt="twitter" />
                      ${
                        data.twitter_username
                          ? "@" + data.twitter_username
                          : "Not Available"
                      }</p>
                  <p>
                    <img src="assets/svg/url.svg" alt="url" />
                    <a href="${data.blog}" target="_blank">
                    ${data.blog || "Not Available"}</a></p>
                  <p>
                    <img src="assets/svg/office.svg" alt="office" />
                    ${data.company || "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        `;
      });
  } else {
    text.style.display = "none";
  }
});

xIcon.addEventListener("click", function () {
  username.value = "";
  text.innerHTML = "";
  text.style.display = "none";
});

themeSwitch.addEventListener("click", function () {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    themeSwitch.querySelector("p").textContent = "DARK";
    themeSwitch.querySelector("img[alt='light']").style.display = "none";
    themeSwitch.querySelector("img[alt='dark']").style.display = "";
  } else {
    body.classList.add("dark-mode");
    themeSwitch.querySelector("p").textContent = "LIGHT";
    themeSwitch.querySelector("img[alt='dark']").style.display = "none";
    themeSwitch.querySelector("img[alt='light']").style.display = "";
  }
});
