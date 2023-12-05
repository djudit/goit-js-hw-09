import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

const timerStyle = document.querySelector('.timer');
// const divField = document.querySelectorAll('.field');

timerStyle.style.display = 'flex';
timerStyle.style.gap = '20px';
timerStyle.style.marginTop = '20px';
// divField.style.display = 'flex';
// divField.style.flexDirection = 'column';
// divField.style.alignItems = 'center';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const today = new Date();
    if (selectedDates[0] - today <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.setAttribute('disabled', '');
      return;
    } else {
      btnStart.removeAttribute('disabled', '');
    }

    btnStart.addEventListener('click', handleClick);

    function handleClick() {
      const id = setInterval(() => {
        timer(selectedDates[0], id);
      }, 1000);
    }
  },
};

flatpickr('#datetime-picker', options);

function timer(future, id) {
  const today = new Date();
  const delta = future - today;

  if (delta <= 0) {
    clearInterval(id);
    return;
  }

  createTimer(convertMs(delta));
}

function createTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
