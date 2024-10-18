//hamburger menu

const hamburgerElement = document.querySelector("#menu-button");
const navElement = document.querySelector("#animateMe");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
});

// Lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    };

    const loadImage = (entry) => {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry);
            }
        });
    }, options);

    images.forEach(img => {
        observer.observe(img);
    });
});

// Visit tracking
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
