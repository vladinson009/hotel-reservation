// Глобален модел (ако в проекта вече има такъв, остави този блок, за да не е undefined)
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

// Offerer — логика за „Our Offers“
function initOurOffersForm() {
  const btn = document.getElementById('btnSelectOffer');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="roomType"]:checked').value;
    reservation.roomType = selected;

    // Следващ екран в потока (при вас колегите имат guest-details-form)
    changeContent('guest-details-form-content');
  });
}

// “Make new reservation” (връща към начало — ако имате search-form)
const newResBtn = document.getElementById('new-reservation');
if (newResBtn) {
  newResBtn.addEventListener('click', (e) => {
    e.preventDefault();
    reservation.roomType = null;
    changeContent('search-form-content');
  });
}

// При локален тест от твоя клон стартираме директно нашия екран
document.addEventListener('DOMContentLoaded', () => {
  initOurOffersForm();
  // Махни следния ред преди merge, ако лидерът предпочита да се влиза от началния екран:
  changeContent('search-result-form-content');
});
