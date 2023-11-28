import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// console.log('test');

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timer = {
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMinutes: document.querySelector('span[data-minutes]'),
  timerSeconds: document.querySelector('span[data-seconds]'),
};

// timer.style.display = 'flex';

btnStart.setAttribute('disabled', '');
btnStart.addEventListener('click', handleClick);

let delta;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    delta = convertMs(selectedDates[0].getTime() - Date.now());
    // Notiflix.Notify.success('Press Stsrt');
    btnStart.removeAttribute('disabled', '');
  },
};

flatpickr(input, options);

function createTimer({ days, hours, minutes, seconds }) {
  timer.timerDays.textContent = days;
  timer.timerHours.textContent = hours;
  timer.timerMinutes.textContent = minutes;
  timer.timerSeconds.textContent = seconds;
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

  // const days = Math.floor(ms / day);
  // const hours = Math.floor((ms % day) / hour);
  // const minutes = Math.floor(((ms % day) % hour) / minute);
  // const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  createTimer({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

let timerId = null;

function handleClick(event) {
  timerId = setInterval(() => {
    if (ms > 0) {
      delta -= 1;
    } else {
      clearInterval(timerId);
    }
  }, 1000);

  // timerId = setInterval(() => {
  //   if (timer.timerSeconds.textContent >= 1) {
  //     timer.timerSeconds.textContent -= 1;
  //   } else {
  //     clearInterval(timerId);
  //   }
  // }, 1000);
}
