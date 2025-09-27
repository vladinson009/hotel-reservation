// Глобален модел (ако вече съществува, пазим го)
window.reservation = window.reservation || {
  startDate: null,
  endDate: null,
  guestsCount: 0,
  roomType: null,
  name: null,
  phone: null,
  email: null,
};

// Универсално превключване на екрани (SPA)
function changeContent(className) {
  document.querySelectorAll('.custom-form').forEach(d => d.classList.add('hidden'));
  const target = document.querySelector('.' + className);
  if (target) target.classList.remove('hidden');
}

/* =======================
   Offerer — Our Offers
   ======================= */
function initOurOffersForm() {
  const btn = document.getElementById('btnSelectOffer');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="roomType"]:checked').value;
    reservation.roomType = selected;
    // След Offers -> отиваме към Guest Details
    changeContent('guest-details-form-content');
  });
}

// “Make new reservation” (връща към Search)
function initOurOffersForm() {
  const offerCards = document.querySelectorAll('.offer-card');
  const nextBtn = document.getElementById('offers-next-btn');
  const backBtn = document.getElementById('offers-back-btn');

  let selectedRoom = null;

  offerCards.forEach(card => {
    card.addEventListener('click', () => {
      // махаме селекция от другите
      offerCards.forEach(c => c.classList.remove('selected-room'));
      // селектираме текущата
      card.classList.add('selected-room');
      selectedRoom = card.dataset.room;
      reservation.roomType = selectedRoom;
      nextBtn.disabled = false;
    });
  });

  nextBtn.addEventListener('click', () => {
    if (selectedRoom) {
      changeContent('guest-details-form-content');
    }
  });

  backBtn.addEventListener('click', () => {
    changeContent('search-form-content');
  });
}


/* =======================
   Questioner — Search
   ======================= */
function initSearchForm() {
  const btn = document.querySelector('#search-form-button');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const checkIn = form.querySelector('#check-in').value;
    const checkOut = form.querySelector('#check-out').value;
    const people = form.querySelector('#people').value;

    if (checkIn && checkOut && people && new Date(checkIn) <= new Date(checkOut)) {
      reservation.startDate = checkIn;
      reservation.endDate = checkOut;
      reservation.guestsCount = people;
      // След Search -> Our Offers
      changeContent('search-result-form-content');
    }
  });
}

/* =======================
   Admin — Guest Details
   ======================= */
function initGuestDetails() {
  const backBtn = document.querySelector('#guest-details-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      changeContent('search-result-form-content'); // назад към Our Offers
    });
  }

  const nextBtn = document.querySelector('#guest-details-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const form = e.target.closest('form');
      const name = form.querySelector('#name').value.trim();
      const phone = form.querySelector('#phone-number').value.trim();
      const email = form.querySelector('#email').value.trim();

      if (name && phone && email) {
        reservation.name = name;
        reservation.phone = phone;
        reservation.email = email;
        changeContent('confirm-reservation-content');
        fillConfirmReservationData(reservation);
      }
    });
  }
}

function fillConfirmReservationData(r) {
  const $ = (sel) => document.querySelector(sel);
  $('.confirm-reservation #guest-name').textContent = `Name: ${r.name}`;
  $('.confirm-reservation #guest-phone').textContent = `Phone Number: ${r.phone}`;
  $('.confirm-reservation #guest-email').textContent = `Email: ${r.email}`;
  $('.confirm-reservation #guest-room-type').textContent = `Room Type: ${r.roomType}`;
  $('.confirm-reservation #guest-data-in').textContent = `Date-in: ${r.startDate}`;
  $('.confirm-reservation #guest-data-out').textContent = `Date-out: ${r.endDate}`;
}

/* =======================
   Verifier — Confirm
   ======================= */
function initConfirm() {
  const backBtn = document.querySelector('#confirm-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      changeContent('guest-details-form-content');
    });
  }

  const confirmBtn = document.querySelector('#confirm-reservation');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      changeContent('thank-you-content');
    });
  }
}

/* =======================
   Init on load
   ======================= */
document.addEventListener('DOMContentLoaded', () => {
  // начало на потока: Search
  changeContent('search-form-content');
document.addEventListener('DOMContentLoaded', () => {
  initOurOffersForm();
});

  // инициализации на всички екрани
  initSearchForm();
  initOurOffersForm();
  initGuestDetails();
  initConfirm();
  initNewReservation();
});
