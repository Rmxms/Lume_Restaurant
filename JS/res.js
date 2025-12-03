// Cleanup from older versions that used localStorage
localStorage.removeItem("lumeReservation");

// ----- smooth scroll from hero to atmosphere -----
const goToAtmosphereBtn = document.getElementById("goToAtmosphere");
const atmosphereSection = document.getElementById("atmospherePage");

if (goToAtmosphereBtn && atmosphereSection) {
    goToAtmosphereBtn.addEventListener("click", function () {
        atmosphereSection.scrollIntoView({ block: "start" });
      });      
  };


// ----- atmosphere cards -----
const atmosphereBoxes = document.querySelectorAll(".atm-box");
const reservationDetailsSection = document.getElementById("reservationDetails");
const chosenMoodInput = document.getElementById("chosenMood");

atmosphereBoxes.forEach(function (box) {
  box.addEventListener("click", function () {
    // 1) visual state
    atmosphereBoxes.forEach((b) => b.classList.remove("selected"));
    box.classList.add("selected");

    // 2) store selected mood
    const mood = box.getAttribute("data-mood");
    if (chosenMoodInput && mood) {
      chosenMoodInput.value = mood;
    }

    // 3) change page palette based on mood
    document.body.classList.remove("mood-romantic", "mood-family", "mood-social");
    if (mood === "Romantic") {
      document.body.classList.add("mood-romantic");
    } else if (mood === "Family Warmth") {
      document.body.classList.add("mood-family");
    } else if (mood === "Social & Friends") {
      document.body.classList.add("mood-social");
    }


  });
});

// ----- form submission -----
const simpleForm = document.getElementById("reservationFormSimple");
const simpleFormMessage = document.getElementById("simpleFormMessage");

if (simpleForm && simpleFormMessage) {
  simpleForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phoneSimple").value.trim();
    const dateTime = document.getElementById("dateTime").value.trim();
    const guests = document.getElementById("guestsSimple").value.trim();
    const chosenMood = chosenMoodInput ? chosenMoodInput.value.trim() : "";

    // 1) empty check
    if (!fullName || !phone || !dateTime || !guests) {
      simpleFormMessage.textContent = "Please fill in all fields.";
      simpleFormMessage.className = "message error";
      simpleFormMessage.style.display = "block";
      return;
    }

    // 2) mood required
    if (!chosenMood) {
      simpleFormMessage.textContent = "Please choose your atmosphere above.";
      simpleFormMessage.className = "message error";
      simpleFormMessage.style.display = "block";
      return;
    }

    // 3) UAE phone validation: +9715XXXXXXXX
    const phonePattern = /^\+9715\d{7,8}$/;
    if (!phonePattern.test(phone)) {
      simpleFormMessage.textContent =
        "Please enter a valid UAE phone number (e.g. +9715XXXXXXXX).";
      simpleFormMessage.className = "message error";
      simpleFormMessage.style.display = "block";
      return;
    }

    // 4) time between 10:00 and 23:59
    const dt = new Date(dateTime);
    const hour = dt.getHours();

    // If parsing failed or outside opening hours
    if (isNaN(hour) || hour < 10 || hour > 23) {
      simpleFormMessage.textContent =
        "Please choose a time between 10:00 and 23:59. The restaurant is closed otherwise.";
      simpleFormMessage.className = "message error";
      simpleFormMessage.style.display = "block";
      return;
    }

    // 5) guests ≥ 1
    if (Number(guests) <= 0) {
      simpleFormMessage.textContent = "Number of guests must be at least 1.";
      simpleFormMessage.className = "message error";
      simpleFormMessage.style.display = "block";
      return;
    }

    // ----- success -----

    // Store reservation data so the next page can use it
    // ----- success: store in *session* and go to table booking -----
    const reservationData = {
      fullName,
      phone,
      dateTime,
      guests,
      chosenMood,
    };

    try {
      sessionStorage.setItem("lumeReservation", JSON.stringify(reservationData));
    } catch (e) {
      console.warn("Could not save reservation in sessionStorage:", e);
    }

    // smooth feel: tiny delay then go to table map
    setTimeout(() => {
      window.location.href = "TableBooking.html";
    }, 300);


  });
}

// ----- navigation burger -----
const navToggle = document.getElementById("navToggle");
const navDrawer = document.getElementById("navDrawer");
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

// ----- prefill form from current session reservation (if exists) -----
(function prefillReservationForm() {
  try {
    const stored = sessionStorage.getItem("lumeReservation");
    if (!stored) return;
    const data = JSON.parse(stored);

    if (data.fullName) document.getElementById("fullName").value = data.fullName;
    if (data.phone) document.getElementById("phoneSimple").value = data.phone;
    if (data.dateTime) document.getElementById("dateTime").value = data.dateTime;
    if (data.guests) document.getElementById("guestsSimple").value = data.guests;

    const mood = data.chosenMood;
    if (mood) {
      chosenMoodInput.value = mood;

      atmosphereBoxes.forEach((box) => {
        if (box.getAttribute("data-mood") === mood) {
          box.classList.add("selected");
        }
      });

      document.body.classList.remove("mood-romantic", "mood-family", "mood-social");
      if (mood === "Romantic") {
        document.body.classList.add("mood-romantic");
      } else if (mood === "Family Warmth") {
        document.body.classList.add("mood-family");
      } else if (mood === "Social & Friends") {
        document.body.classList.add("mood-social");
      }
    }

  } catch (e) {
    console.warn("Could not prefill reservation form:", e);
  }
})();


