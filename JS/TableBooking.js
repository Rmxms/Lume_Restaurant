const bookedTables = new Set(["O3", "I5"]);
const mapEl = document.getElementById("floorMap");
const selectionInfo = document.getElementById("selectionInfo");
const confirmBtn = document.getElementById("confirmBtn");
const bookingWrapper = document.getElementById("bookingWrapper");
const confirmationScreen = document.getElementById("confirmationScreen");
const confirmedTableLabel = document.getElementById("confirmedTableLabel");

let currentSelected = null;
let reservationName = "Guest";
try {
    const stored = sessionStorage.getItem("lumeReservation");
    if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.fullName) {
        reservationName = parsed.fullName;
    }
    }
} catch (e) {
    console.warn("Could not read reservation data:", e);
}


const guestNameSpan = document.getElementById("guestName");
if (guestNameSpan) {
    guestNameSpan.textContent = reservationName;
}

function initTables() {
    const allTables = mapEl.querySelectorAll(".table-btn");
    allTables.forEach(btn => {
    const id = btn.dataset.id;
    if (bookedTables.has(id)) {
        btn.classList.remove("table-available");
        btn.classList.add("table-booked");
    } else {
        btn.classList.add("table-available");
    }
    btn.addEventListener("click", () => handleTableClick(btn));
    });
}

function handleTableClick(btn) {
    const id = btn.dataset.id;
    if (btn.classList.contains("table-booked")) {
    return; 
    }

    if (currentSelected && currentSelected !== btn) {
    currentSelected.classList.remove("table-selected");
    }

    const isAlreadySelected = btn.classList.contains("table-selected");
    if (isAlreadySelected) {
    btn.classList.remove("table-selected");
    currentSelected = null;
    selectionInfo.textContent = "No table selected yet.";
    confirmBtn.classList.add("hidden");
    } else {
    btn.classList.add("table-selected");
    currentSelected = btn;
    selectionInfo.textContent = `Selected table: ${id}`;
    confirmBtn.classList.remove("hidden");
    }
}

confirmBtn.addEventListener("click", () => {
    if (!currentSelected) return;
    const id = currentSelected.dataset.id;
    confirmedTableLabel.textContent = id;

    bookingWrapper.style.display = "none";
    confirmationScreen.style.display = "block";
});

const backToFormBtn = document.getElementById("backToForm");
if (backToFormBtn) {
    backToFormBtn.addEventListener("click", () => {
    window.location.href = "res.html#reservationDetails";
    });
}

initTables();