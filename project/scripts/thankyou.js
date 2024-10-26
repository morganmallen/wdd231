// Hamburger menu
const hamburgerElement = document.querySelector("#menu-button");
const navElement = document.querySelector("#animateMe");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("open");
  hamburgerElement.classList.toggle("open");
});

//form data
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    "first-name": params.get("first-name"),
    "last-name": params.get("last-name"),
    email: params.get("email"),
    phone: params.get("phone"),
    notifications: params.getAll("notifications[]")
  };
}
const formData = getQueryParams();
document.getElementById("firstName").textContent =
  formData["first-name"] || "N/A";
document.getElementById("lastName").textContent =
  formData["last-name"] || "N/A";
document.getElementById("email").textContent = formData.email || "N/A";
document.getElementById("mobileNumber").textContent = formData.phone || "N/A";

// Handle notifications checkboxes
const notificationsElement = document.getElementById("notifications");
const notifications = formData.notifications;

if (notifications) {
  // If notifications is an array (multiple checkboxes selected)
  if (Array.isArray(notifications)) {
    notificationsElement.textContent = notifications.join(", ");
  }
  // If notifications is a single value (one checkbox selected)
  else {
    notificationsElement.textContent = notifications;
  }
} else {
  notificationsElement.textContent = "None selected";
}
// Footer
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
