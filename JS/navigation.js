document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navDrawer = document.getElementById("navDrawer");
    const navOverlay = document.getElementById("navOverlay");

    if (!navToggle || !navDrawer || !navOverlay) return;

    function toggleNav() {
      navToggle.classList.toggle("nav-open");
      navDrawer.classList.toggle("nav-open");
      navOverlay.classList.toggle("nav-open");
    }

    navToggle.addEventListener("click", toggleNav);
    navOverlay.addEventListener("click", toggleNav);
});