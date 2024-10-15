document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});

$(document).ready(function () {
  $("#userDropdown").on("click", function (e) {
    e.preventDefault();
    $(".dropdown-menu-nav").toggleClass("active");
  });
});
