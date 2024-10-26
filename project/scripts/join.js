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