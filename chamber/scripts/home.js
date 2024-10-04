//hamburger menu

const hamburgerElement = document.querySelector("#menu-button");
const navElement = document.querySelector("#animateMe");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
});

// current weather
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDescription = document.querySelector("#weather-description");
const high = document.querySelector("#high");
const low = document.querySelector("#low");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

const weatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=40.13&lon=-111.58&appid=16e08ff9d81238ec30f641dd6b4d1cd6&units=imperial";
//api key 16e08ff9d81238ec30f641dd6b4d1cd6

async function weatherApiFetch() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      //   console.log(data);
      displayWeatherResults(data);
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

weatherApiFetch();

function displayWeatherResults(data) {
  roundedTemp = Math.round(data.main.temp);
  currentTemp.innerHTML = `${roundedTemp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);
  weatherDescription.textContent = `${desc}`;
  high.textContent = `${Math.round(data.main.temp_max)}`;
  low.textContent = `${Math.round(data.main.temp_min)}`;
  humidity.textContent = `${data.main.humidity}%`;

  const sunriseTimestamp = data.sys.sunrise;
  const sunsetTimestamp = data.sys.sunset;

  function convertUnixTimestampToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    minutes = minutes < 10 ? "0" + minutes : minutes;

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  sunrise.textContent = `${convertUnixTimestampToTime(sunriseTimestamp)}`;
  sunset.textContent = `${convertUnixTimestampToTime(sunsetTimestamp)}`;
}

// Forecast

const forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=40.13&lon=-111.58&appid=16e08ff9d81238ec30f641dd6b4d1cd6&units=imperial&cnt=20";

async function forecastApiFetch() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecastResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

forecastApiFetch();

function displayForecastResults(data) {
  const filteredForecasts = data.list.filter((entry) =>
    entry.dt_txt.includes("00:00:00")
  );

  if (filteredForecasts.length >= 3) {
    const getDayOfWeek = (dateString) => {
      const dateObject = new Date(dateString);
      const options = { weekday: "long" };
      return dateObject.toLocaleDateString("en-US", options);
    };

    const todayForecast = filteredForecasts[0];
    const tomorrowForecast = filteredForecasts[1];
    const dayAfterForecast = filteredForecasts[2];

    const todayTemp = Math.round(todayForecast.main.temp);
    const tomorrowTemp = Math.round(tomorrowForecast.main.temp);
    const dayAfterTemp = Math.round(dayAfterForecast.main.temp);

    const todayDay = getDayOfWeek(todayForecast.dt_txt);
    const tomorrowDay = getDayOfWeek(tomorrowForecast.dt_txt);
    const dayAfterDay = getDayOfWeek(dayAfterForecast.dt_txt);

    document.getElementById(
      "today"
    ).textContent = `${todayDay}: ${todayTemp}°F`;
    document.getElementById(
      "tomorrow"
    ).textContent = `${tomorrowDay}: ${tomorrowTemp}°F`;
    document.getElementById(
      "dayAfter"
    ).textContent = `${dayAfterDay}: ${dayAfterTemp}°F`;
  }
}

//members

const cardsContainer = document.getElementById("cards-container");

async function getMemberData() {
  const results = await fetch("./data/members.json");
  const data = await results.json();
  displayMembers(data.members);
}

getMemberData();

const displayMembers = (members) => {
  const eligibleMembers = members.filter(
    (member) => member.membershipLevel >= 2
  );

  const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

  const selectedMembers = shuffledMembers.slice(0, 3);

  selectedMembers.forEach((member) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let nameDiv = document.createElement("div");
    nameDiv.classList.add("card-header");
    let name = document.createElement("h2");
    name.textContent = member.name;
    nameDiv.appendChild(name);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let pictureDiv = document.createElement("div");
    pictureDiv.classList.add("card-picture");
    let picture = document.createElement("img");
    picture.setAttribute("src", member.image);
    picture.setAttribute("alt", `Picture of ${member.name}`);
    picture.setAttribute("loading", "lazy");
    picture.setAttribute("width", "100");
    picture.setAttribute("height", "100");
    pictureDiv.appendChild(picture);

    let infoDiv = document.createElement("div");
    infoDiv.classList.add("card-info");
    let address = document.createElement("p");
    let phone = document.createElement("p");
    let website = document.createElement("a");

    address.textContent = `Address: ${member.address}`;
    phone.textContent = `Phone: ${member.phoneNumber}`;
    website.textContent = `Website`;
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");

    infoDiv.appendChild(address);
    infoDiv.appendChild(phone);
    infoDiv.appendChild(website);

    cardBody.appendChild(pictureDiv);
    cardBody.appendChild(infoDiv);

    card.appendChild(nameDiv);
    card.appendChild(cardBody);

    cardsContainer.appendChild(card);
  });
};

//footer

const currentYear = new Date().getFullYear();
document.getElementById(
  "currentYear"
).textContent = `© ${currentYear} Mapleton Chamber of Commerce`;

const lastModification = new Date(document.lastModified);

const month = String(lastModification.getMonth() + 1).padStart(2, "0");
const day = String(lastModification.getDate()).padStart(2, "0");
const year = lastModification.getFullYear();

const hours = String(lastModification.getHours()).padStart(2, "0");
const minutes = String(lastModification.getMinutes()).padStart(2, "0");
const seconds = String(lastModification.getSeconds()).padStart(2, "0");

const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

document.getElementById(
  "lastModified"
).textContent = `Last Modification: ${formattedDate}`;
