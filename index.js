import { textTyping, waitForMs } from './textTyping.js';

const element = document.getElementById('output');

function debounce(func, timeout) {
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function text() {
  return document.querySelector('input').value;
}

export const inputTyping = debounce(
  () => textTyping(element, text(), 100),
  1000
);

export async function deleteTyping() {
  if (window.event.keyCode === 8) {
    await waitForMs(50);
    element.innerText = text();
    // const sentence = element.innerHTML;
    // const letters = text().split('');
    // console.log('sentence: ', sentence);
    // console.log('letters: ', sentence.split(''));
    // if (letters.length > 0) {
    //   await waitForMs(50);
    //   letters.pop();
    //   element.innerHTML = letters.join('');
    // }

    // while (letters.length > 0) {
    //   await waitForMs(100);
    //   letters.pop();
    //   element.innerText = letters.join('');
    // }
  }
}
