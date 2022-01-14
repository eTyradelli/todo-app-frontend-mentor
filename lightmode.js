// Toggle light/dark mode

let lightMode = localStorage.getItem('lightMode');
let audio;
if (lightMode === 'enabled') {
  enableLightMode();
}

const lightModeToggle = document.querySelector('.light-mode-toggle');

function enableLightMode() {
  document.body.classList.add('lightmode');
  document.querySelector('header').classList.add('lightmode');
  localStorage.setItem('lightMode', 'enabled');
  audio = document.querySelector('.audio--light-on');
  audio.currentTime = 0;
  audio.play();
}

function disableLightMode() {
  document.body.classList.remove('lightmode');
  document.querySelector('header').classList.remove('lightmode');
  localStorage.setItem('lightMode', null);
  audio = document.querySelector('.audio--light-off');
  audio.currentTime = 0;
  audio.play();
}

lightModeToggle.addEventListener('click', () => {
  lightMode = localStorage.getItem('lightMode'); 
  if (lightMode !== 'enabled') {
    enableLightMode(); 
  } else {  
    disableLightMode(); 
  }
});