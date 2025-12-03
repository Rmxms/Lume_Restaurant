document.querySelectorAll('a[data-fade]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    document.body.classList.add('is-fading');
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  });
});

const hero = document.querySelector('.hero');
const heroImages = [
  '../pics/home.png',
  '../pics/home2.JPG',
  '../pics/home3.WEBP',
  '../pics/home4.JPG',
  '../pics/home5.WEBP'
];
let heroIndex = 0;

function changeBackground() {
  heroIndex++;
  if (heroIndex >= heroImages.length) {
    heroIndex = 0;
  }
  hero.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
}

setInterval(changeBackground, 3000);


