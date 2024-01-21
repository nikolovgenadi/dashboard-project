import axios from "axios";

const WEATHER_API_URL = "http://api.weatherstack.com/current";
const IMAGES_API_URL = `https://pixabay.com/api/`;

const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;
const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;

const appContainer = document.querySelector(".app-container");
const changeBackgroundButton = document.querySelector(
  ".change-background-button"
);
const appTime = document.querySelector(".time-time");
const appDate = document.querySelector(".time-date");

// const userNameEdit = document.querySelector("user-name-title");

setInterval(() => {
  const date = new Date();
  appTime.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  appDate.textContent = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
}, 1000);

// changeBackgroundButton.addEventListener("click", () => {
//   changeBackground();
// });

// async function getBackgroundPicture() {
//   if (!localStorage.getItem("backgroundData")) {
//     const { data } = await axios.get(IMAGES_API_URL, {
//       params: { key: PIXABAY_KEY, q: "forest", image_type: "photo" },
//     });

//     const imagesList = data.hits.map((a) => a.largeImageURL);
//     localStorage.setItem("backgroundData", JSON.stringify(imagesList));
//   }

//   const urls = JSON.parse(localStorage.getItem("backgroundData"));

//   appContainer.style.backgroundImage = `url(${urls[0]})`;
// }
// getBackgroundPicture();

// function changeBackground() {
//   const urls = JSON.parse(localStorage.getItem("backgroundData"));

//   const url = Math.floor(Math.random() * urls.length);

//   appContainer.style.backgroundImage = `url(${urls[url]})`;
// }

// async function getWeatherData() {
//   let lat = 59.2058347;
//   let long = 17.6606326;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((s) => {
//       console.log(s.coords);
//       lat = s.coords.latitude;
//       long = s.coords.longitude;
//     });
//   }

//   const { data } = await axios.get(WEATHER_API_URL, {
//     params: {
//       access_key: WEATHER_KEY,
//       query: `${lat}, ${long}`,
//     },
//   });

//   console.log(data);
// }

// getWeatherData();

const userNameEdit = document.getElementById("userNameEdit");

function handleInput() {
  console.log("Input event triggered");
  const updatedUserName = userNameEdit.innerText;
  localStorage.setItem("user-name-title", JSON.stringify(updatedUserName));
}

function handleBlur() {
  console.log("Blur event triggered");
  const updatedUserName = userNameEdit.innerText;
  localStorage.setItem("user-name-title", JSON.stringify(updatedUserName));
  console.log("Username saved:", updatedUserName);
}

userNameEdit.addEventListener("input", handleInput);
userNameEdit.addEventListener("blur", handleBlur);

const savedUserName = localStorage.getItem("user-name-title");
if (savedUserName !== null && savedUserName !== undefined) {
  userNameEdit.innerText = JSON.parse(savedUserName);
}

const newLinkButton = document.querySelector(".add-new-link-button");
const linkList = document.querySelector(".links-wrapper");
let linkListArray = JSON.parse(localStorage.getItem("linkList")) || [];

function createNewLink() {
  let linkInput = prompt("Add your link in the input field.");

  if (linkInput !== null) {
    if(!linkInput.includes("://")) {
      linkInput = "http://" + linkInput;
    }
    const newLinkAnchor = document.createElement("a");
    newLinkAnchor.href = linkInput;
    newLinkAnchor.textContent = linkInput;

    newLinkAnchor.addEventListener('click', function(event) {
      event.preventDefault();
      window.open(linkInput, "_blank");
    });

    const newLinkDiv = document.createElement("div");
    newLinkDiv.appendChild(newLinkAnchor);
    linkList.appendChild(newLinkDiv);
    linkListArray.push(linkInput);

    localStorage.setItem("linkList", JSON.stringify(linkListArray));
    console.log("Link was added:", linkInput);
  }
}

linkListArray.forEach(link => {
  const newLinkAnchor = document.createElement('a');
  newLinkAnchor.href = link;
  newLinkAnchor.textContent = link;

  newLinkAnchor.addEventListener('click', function(event) {
    event.preventDefault();
    window.open(link, "_blank");
  });

  const newLinkDiv = document.createElement('div');
  newLinkDiv.appendChild(newLinkAnchor);

  linkList.appendChild(newLinkDiv);
});

newLinkButton.addEventListener("click", createNewLink);

// async function getUser(url) {
//   try {
//     const response = await axios.get(url);
//     console.log(response);

//     const firstUserId =
//       response.data.length > 0 ? response.data[0].id : undefined;
//     return console.log({ firstUserId });
//   } catch (error) {
//     console.error(error);
//   }
// }
// getUser(url);
