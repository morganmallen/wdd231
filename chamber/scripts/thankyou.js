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
    firstName: params.get("first-name"),
    lastName: params.get("last-name"),
    email: params.get("email"),
    mobileNumber: params.get("phone"),
    businessName: params.get("organization-name"),
    timestamp: params.get("timestamp"),
  };
}
const formData = getQueryParams();
document.getElementById("firstName").textContent = formData.firstName || "N/A";
document.getElementById("lastName").textContent = formData.lastName || "N/A";
document.getElementById("email").textContent = formData.email || "N/A";
document.getElementById("mobileNumber").textContent =
  formData.mobileNumber || "N/A";
document.getElementById("businessName").textContent =
  formData.businessName || "N/A";
document.getElementById("currentDate").textContent =
  formData.timestamp || "N/A";

// Footer
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
