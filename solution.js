
window.reservation = window.reservation || {
  startDate: null,
  endDate: null,
  guestsCount: 0,
  roomType: null,
  name: null,
  phone: null,
  email: null,
};


function changeContent(className) {
  document.querySelectorAll('.custom-form').forEach(d => d.classList.add('hidden'));
  const target = document.querySelector('.' + className);
  if (target) target.classList.remove('hidden');
}

function initOurOffersForm() {
  const btn = document.getElementById('btnSelectOffer');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="roomType"]:checked').value;
    reservation.roomType = selected;
   
    changeContent('guest-details-form-content');
  });
}

const newResBtn = document.getElementById('new-reservation');
if (newResBtn) {
  newResBtn.addEventListener('click', (e) => {
    e.preventDefault();
    reservation.roomType = null;
    changeContent('search-form-content');
  });
}

document.querySelector('#search-form-button')
  .addEventListener('click', (e) => searchFormData(e));

function searchFormData(e) {
  e.preventDefault();
  const data = e.target.parentElement;
  const checkIn = data.querySelector('#check-in').value;
  const checkOut = data.querySelector('#check-out').value;
  const people = data.querySelector('#people').value;

  if (checkIn !== '' && checkOut !== '' && people !== '' &&
      new Date(checkIn) <= new Date(checkOut)) {
    reservation.startDate = checkIn;
    reservation.endDate = checkOut;
    reservation.guestsCount = people;
    // След Search -> отиваме към Our Offers
    changeContent('search-result-form-content');
  }
}

document.querySelector('#guest-details-back-btn')
  .addEventListener('click', (e) => fillRoomForm(e));

function fillRoomForm(e) {
  e.preventDefault();
  
  changeContent('search-result-form-content');
}

document.querySelector('#guest-details-next-btn')
  .addEventListener('click', (e) => getPersonalData(e));

function getPersonalData(e) {
  e.preventDefault();
  const data = e.target.closest('form');

  const name = data.querySelector('#name').value;
  const phone = data.querySelector('#phone-number').value;
  const email = data.querySelector('#email').value;

  if (name !== '' && phone !== '' && email !== '') {
    reservation.name = name;
    reservation.phone = phone;
    reservation.email = email;
   
    changeContent('confirm-reservation-content');
    fillConfirmReservationData(reservation);
  }
}

function fillConfirmReservationData(customReservation) {
  document.querySelector('.confirm-reservation #guest-name').textContent =
    `Name: ${customReservation.name}`;
  document.querySelector('.confirm-reservation #guest-phone').textContent =
    `Phone Number: ${customReservation.phone}`;
  document.querySelector('.confirm-reservation #guest-email').textContent =
    `Email: ${customReservation.email}`;
  document.querySelector('.confirm-reservation #guest-room-type').textContent =
    `Room Type: ${customReservation.roomType}`;
  document.querySelector('.confirm-reservation #guest-data-in').textContent =
    `Date-in: ${customReservation.startDate}`;
  document.querySelector('.confirm-reservation #guest-data-out').textContent =
    `Date-out: ${customReservation.endDate}`;
}

document.querySelector('#confirm-back-btn')
  .addEventListener('click', (e) => getBackToPersonalDa
