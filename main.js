import axios from "axios";

const WEATHER_API_URL = "http://api.weatherstack.com/current";
const IMAGES_API_URL = `https://pixabay.com/api/`;
const BACKGROUNDIMAGES_API_URL = `https://api.unsplash.com/photos/?client_id=`;
const NEWWEATHER_API_URL = `https://api.openweathermap.org/data`;

const BACKGROUNDIMAGES_KEY = import.meta.env.VITE_BACKGROUNDIMAGES_KEY;
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;
const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;
const NEWWEATHER_KEY = import.meta.env.VITE_NEWWEATHER_KEY;

const appContainer = document.querySelector(".app-container");
const changeBackgroundButton = document.querySelector(
  ".change-background-button"
);
const appTime = document.querySelector(".time-time");
const appDate = document.querySelector(".time-date");

setInterval(() => {
  const date = new Date();
  appTime.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  appDate.textContent = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
}, 1000);

// TODAYS WEATHER
let lat = 59.3293;
let lon = 18.0686;

async function weatherInformation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (x) => {
      lat = x.coords.latitude;
      lon = x.coords.longitude;
    });

    try {
      const response = await axios.get(
        `${NEWWEATHER_API_URL}/2.5/weather?lat=${lat}&lon=${lon}&appid=${NEWWEATHER_KEY}`);
      const data = response.data;

      const weatherObject = { 
        city: data.name,
        humidity: data.main.humidity,
        temperature: data.main.temp,
        description: data.weather[0].description
      }
      const weatherWrapper = document.querySelector('.weather-wrapper');

      const cityDiv = document.createElement('div');
      const humidityDiv = document.createElement('div');
      const temperatureDiv = document.createElement('div');
      const descriptionDiv = document.createElement('div');

      cityDiv.textContent = `City: ${weatherObject.city}`;
      humidityDiv.textContent = `Humidity: ${weatherObject.humidity}%`;
      temperatureDiv.textContent = `Temperature: ${weatherObject.temperature}°F`;
      descriptionDiv.textContent = `Description: ${weatherObject.description}`;

      weatherWrapper.appendChild(cityDiv);
      weatherWrapper.appendChild(humidityDiv);
      weatherWrapper.appendChild(temperatureDiv);
      weatherWrapper.appendChild(descriptionDiv);

    }  
    catch {
      console.error("error");
    }
  }
}
weatherInformation();

// BACKGROUND IMAGES
let imageUrls = [];

async function randomImages() {
  const url = `https://api.unsplash.com/photos/?client_id=${BACKGROUNDIMAGES_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    imageUrls = data.map((image) => image.urls.regular);

    setRandomBackground();
    console.log("try");
  } catch (error) {
    console.log("error", error);
  }
}

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const randomImageUrl = imageUrls[randomIndex];

  document.body.style.backgroundImage = `url(${randomImageUrl})`;
  console.log("set");
}

changeBackgroundButton.addEventListener("click", randomImages);

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


// USER TITLE
const userNameEdit = document.getElementById("userNameEdit");

function handleInput() {
  const updatedUserName = userNameEdit.innerText;
  localStorage.setItem("user-name-title", JSON.stringify(updatedUserName));
}

userNameEdit.addEventListener("input", handleInput);

const savedUserName = localStorage.getItem("user-name-title");
if (savedUserName !== null && savedUserName !== undefined) {
  userNameEdit.innerText = JSON.parse(savedUserName);
}


// LINKS 
const newLinkButton = document.querySelector(".add-new-link-button");
const linkList = document.querySelector(".links-wrapper");
let linkListArray = JSON.parse(localStorage.getItem("linkList")) || [];

function createNewLink() {
  let linkInput = prompt("Add your link in the input field.");

  if (linkInput !== null) {
    if (!linkInput.includes("://")) {
      linkInput = "http://" + linkInput;
    }

    const newLinkAnchor = document.createElement("a");
    newLinkAnchor.href = linkInput;
    newLinkAnchor.textContent = linkInput;

    newLinkAnchor.addEventListener("click", function (event) {
      event.preventDefault();
      window.open(linkInput, "_blank");
    });

    const newLinkDiv = document.createElement("div");
    newLinkDiv.appendChild(newLinkAnchor);
    linkList.appendChild(newLinkDiv);
    linkListArray.push(linkInput);

    newLinkDiv.classList.add("links");

    localStorage.setItem("linkList", JSON.stringify(linkListArray));
    console.log("Link was added:", linkInput);
  }
}

function displayStoredLinks() {
  linkListArray.forEach((link) => {
    const newLinkAnchor = document.createElement("a");
    newLinkAnchor.href = link;
    newLinkAnchor.textContent = link;

    newLinkAnchor.addEventListener("click", function (event) {
      event.preventDefault();
      window.open(link, "_blank");
    });

    const newLinkDiv = document.createElement("div");
    newLinkDiv.appendChild(newLinkAnchor);
    linkList.appendChild(newLinkDiv);

    newLinkDiv.classList.add("links");
  });
}

window.addEventListener("load", () => {
  if (linkList !== null && linkList !== undefined) {
    displayStoredLinks();
  }
});

newLinkButton.addEventListener("click", createNewLink);



// NOTES 
const noteArea = document.querySelector("#notes");

function saveNotes() {
  const notes = noteArea.value;
  localStorage.setItem("notes", notes);
}

window.addEventListener("load", () => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes !== null && savedNotes !== undefined) {
    noteArea.value = savedNotes;
  }
});

let typingTimer;
const typingDelay = 500;

noteArea.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(saveNotes, typingDelay);
});

noteArea.addEventListener("input", saveNotes);
