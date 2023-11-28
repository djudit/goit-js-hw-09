import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// console.log('test');
// console.log('test2');

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      alert('Please choose a date in the future');
    }
    console.log(selectedDates);
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

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  console.log(days);
  console.log(hours);
  console.log(minutes);
  console.log(seconds);

  createTimer({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));

function handleClick(event) {
  //   setInterval(() => {
  //     timer.timerDays.textContent -= 1;
  //   }, day);

  //   setInterval(() => {
  //     timer.timerHours.textContent -= 1;
  //   }, hour);

  //   setInterval(() => {
  //     timer.timerMinutes.textContent -= 1;
  //   }, minute);

  setInterval(() => {
    timer.timerSeconds.textContent -= 1;
  }, 1000);
}
