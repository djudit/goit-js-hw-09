import Notiflix from 'notiflix';

const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const btn = document.querySelector('button[type="submit"]');

btn.addEventListener('click', handleClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleClick(event) {
  event.preventDefault();
  for (let i = 0; i < inputAmount.valueAsNumber; i += 1) {
    const promiseDelay = inputDelay.valueAsNumber + inputStep.valueAsNumber * i;

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position + 1} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${position + 1} in ${delay}ms`
        );
      });
  }
}
