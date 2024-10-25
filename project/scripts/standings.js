//hamburger menu

const hamburgerElement = document.querySelector("#menu-button");
const navElement = document.querySelector("#animateMe");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
});

//nav
function setActiveNavLink() {
  // Get the current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Get all navigation links
  const navLinks = document.querySelectorAll('nav a');
  
  // Loop through each link
  navLinks.forEach(link => {
      // Get the href filename
      const linkPage = link.getAttribute('href');
      
      // Check if this link matches the current page
      if (linkPage === currentPage) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });
}

//standings
//api key ZBZyilgyh6ztGjDzXPUtpQumtSoThBjqXtsHbk3GJutKHrWFSnWmxdFmGo3D

const url = "https://run.mocky.io/v3/abbdd064-0303-4c7e-94e0-bf70566b1beb";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data.standings); // testing only
      displayResults(data.standings); // uncomment when ready
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  const tableBody = document.querySelector("#standingsTable tbody");
  tableBody.innerHTML = ""; // Clear any existing rows

  data.forEach((team) => {
    const row = document.createElement("tr");

    // Create cells for position and team
    const positionCell = document.createElement("td");
    positionCell.textContent = team.position;
    row.appendChild(positionCell);

    const teamCell = document.createElement("td");
    teamCell.textContent = team.team;
    teamCell.classList.add("clickable");
    teamCell.addEventListener("click", () => showModal(team)); // Show modal on click
    row.appendChild(teamCell);

    // Add row to the table body
    tableBody.appendChild(row);
  });
}

function showModal(team) {
  // Get modal elements
  const modal = document.getElementById("teamModal");
  const modalTeamName = document.getElementById("modalTeamName");
  const modalPlayed = document.getElementById("modalPlayed");
  const modalWins = document.getElementById("modalWins");
  const modalDraws = document.getElementById("modalDraws");
  const modalLosses = document.getElementById("modalLosses");
  const modalPoints = document.getElementById("modalPoints");
  const modalGoalsFor = document.getElementById("modalGoalsFor");
  const modalGoalsAgainst = document.getElementById("modalGoalsAgainst");
  const modalGoalDifference = document.getElementById("modalGoalDifference");

  // Set modal content
  modalTeamName.textContent = team.team;
  modalPlayed.textContent = team.played;
  modalWins.textContent = team.won;
  modalDraws.textContent = team.drawn;
  modalLosses.textContent = team.lost;
  modalPoints.textContent = team.points;
  modalGoalsFor.textContent = team.goalsFor;
  modalGoalsAgainst.textContent = team.goalsAgainst;
  modalGoalDifference.textContent = team.goalDifference;

  // Display the modal
  modal.style.display = "block";
}

// Close the modal when the close button is clicked
document.querySelector(".close-button").addEventListener("click", () => {
  document.getElementById("teamModal").style.display = "none";
});

// Close the modal when the user clicks outside the modal content
window.addEventListener("click", (event) => {
  const modal = document.getElementById("teamModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Fetch and display the data
apiFetch();

//footer

const currentYear = new Date().getFullYear();
document.getElementById(
  "currentYear"
).textContent = `© ${currentYear} Morgan's Soccer League`;

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
