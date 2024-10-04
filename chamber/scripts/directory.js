//hamburger menu

const hamburgerElement = document.querySelector("#menu-button");
const navElement = document.querySelector("#animateMe");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
});

//grid view button

const toggleButton = document.getElementById("viewToggle");
const cardsContainer = document.querySelector("#cards-container");
let isGridView = true;

toggleButton.addEventListener("click", () => {
  if (isGridView) {
    cardsContainer.classList.add("cards-list-view");
    toggleButton.textContent = "Switch to Grid View";
  } else {
    cardsContainer.classList.remove("cards-list-view");
    toggleButton.textContent = "Switch to List View";
  }

  isGridView = !isGridView;
});

//members

async function getMemberData() {
  const results = await fetch("./data/members.json");
  const data = await results.json();
  displayMembers(data.members);
}

getMemberData();

const displayMembers = (members) => {
  members.forEach((member) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let nameDiv = document.createElement("div");
    nameDiv.setAttribute("id", "name");

    let pictureDiv = document.createElement("div");
    pictureDiv.setAttribute("id", "picture");

    let infoDiv = document.createElement("div");
    infoDiv.setAttribute("id", "info");

    let name = document.createElement("h2");
    let picture = document.createElement("img");
    let address = document.createElement("p");
    let phone = document.createElement("p");
    let website = document.createElement("a");

    name.textContent = `${member.name}`;
    nameDiv.appendChild(name);

    picture.setAttribute("src", member.image);
    picture.setAttribute("alt", `Picture of ${member.name}`);
    picture.setAttribute("loading", "lazy");
    picture.setAttribute("width", "100");
    picture.setAttribute("height", "100");
    pictureDiv.appendChild(picture);

    address.textContent = `Address: ${member.address}`;
    phone.textContent = `Phone: ${member.phoneNumber}`;
    website.textContent = `Website`;
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");

    infoDiv.appendChild(address);
    infoDiv.appendChild(phone);
    infoDiv.appendChild(website);

    let pictureInfoContainer = document.createElement("div");
    pictureInfoContainer.appendChild(pictureDiv);
    pictureInfoContainer.appendChild(infoDiv);
    pictureInfoContainer.setAttribute("id", "card-main");

    card.appendChild(nameDiv);
    card.appendChild(pictureInfoContainer);

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
