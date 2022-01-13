// Toggle light/dark mode

let lightMode = localStorage.getItem('lightMode');
if (lightMode === 'enabled') {
  enableLightMode();
}

const lightModeToggle = document.querySelector('.light-mode-toggle');

function enableLightMode() {
  document.body.classList.add('lightmode');
  document.querySelector('header').classList.add('lightmode');
  localStorage.setItem('lightMode', 'enabled');
}

function disableLightMode() {
  document.body.classList.remove('lightmode');
  document.querySelector('header').classList.remove('lightmode');
  localStorage.setItem('lightMode', null);
}

lightModeToggle.addEventListener('click', () => {
  lightMode = localStorage.getItem('lightMode'); 
  if (lightMode !== 'enabled') {
    enableLightMode(); 
  } else {  
    disableLightMode(); 
  }
});