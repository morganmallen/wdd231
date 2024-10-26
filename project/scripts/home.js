//hamburger menu

const hamburgerElement = document.querySelector("#menu-button");
const navElement = document.querySelector("#animateMe");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
});

//nav
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (currentPage.includes(linkPage)) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });
}

setActiveNavLink();

document.addEventListener('DOMContentLoaded', setActiveNavLink);

//visit tracking
document.addEventListener('DOMContentLoaded', function() {
  const visitMessage = document.getElementById('visitMessage');
  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = Date.now();

  if (!lastVisit) {
      visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
      const daysBetween = Math.floor((currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
      
      if (daysBetween < 1) {
          visitMessage.textContent = "Back so soon! Awesome!";
      } else {
          visitMessage.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} ago.`;
      }
  }

  localStorage.setItem('lastVisit', currentDate);
});


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
