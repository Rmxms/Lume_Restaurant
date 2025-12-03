document.addEventListener("DOMContentLoaded", function () {
  // ---------- THUMB STRIP (only on dish pages) ----------
  const row   = document.getElementById("thumbRow");
  const left  = document.getElementById("thumbLeft");
  const right = document.getElementById("thumbRight");

  if (row && left && right) {
    left.addEventListener("click", function () {
      row.scrollBy({ left: -250, behavior: "smooth" });
    });

    right.addEventListener("click", function () {
      row.scrollBy({ left: 250, behavior: "smooth" });
    });
  }

  // ---------- TABS (only on dish pages) ----------
  const btnDetails = document.getElementById("btnDetails");
  const btnIng     = document.getElementById("btnIngredients");
  const btnCal     = document.getElementById("btnCalories");

  const panelDetails = document.getElementById("detailsPanel");
  const panelIng     = document.getElementById("ingredientsPanel");
  const panelCal     = document.getElementById("caloriesPanel");

  const tabs = [
    { btn: btnDetails, panel: panelDetails },
    { btn: btnIng,     panel: panelIng     },
    { btn: btnCal,     panel: panelCal     },
  ];

  if (btnDetails && btnIng && btnCal && panelDetails && panelIng && panelCal) {
    function activate(targetBtn) {
      tabs.forEach(({ btn, panel }) => {
        const isActive = btn === targetBtn;
        btn.classList.toggle("tab-active", isActive);
        panel.classList.toggle("dish-panel--hidden", !isActive);
      });
    }

    btnDetails.addEventListener("click", () => activate(btnDetails));
    btnIng.addEventListener("click", () => activate(btnIng));
    btnCal.addEventListener("click", () => activate(btnCal));
  }

  // ---------- NAV (used on ALL pages) ----------
  const navToggle  = document.getElementById("navToggle");
  const navDrawer  = document.getElementById("navDrawer");
  const navOverlay = document.getElementById("navOverlay");

  if (navToggle && navDrawer && navOverlay) {
    function toggleNav() {
      navToggle.classList.toggle("nav-open");
      navDrawer.classList.toggle("nav-open");
      navOverlay.classList.toggle("nav-open");
    }

    navToggle.addEventListener("click", toggleNav);
    navOverlay.addEventListener("click", toggleNav);
  }
});
