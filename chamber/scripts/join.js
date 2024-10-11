//hamburger menu

const hamburgerElement = document.querySelector("#menu-button");
const navElement = document.querySelector("#animateMe");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
});


//modal
document.addEventListener('DOMContentLoaded', () => {
    const modalLinks = document.querySelectorAll('.membership-cards a');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.onclick = function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
});


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
