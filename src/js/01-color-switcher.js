const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyBG = document.querySelector('body');

btnStart.addEventListener('click', startClick);
btnStop.addEventListener('click', stopClick);

btnStop.setAttribute('disabled', '');

function startClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  timerId = setInterval(() => {
    bodyBG.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', '');
  btnStop.removeAttribute('disabled', '');
}

function stopClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  clearInterval(timerId);
  btnStop.setAttribute('disabled', '');
  btnStart.removeAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
