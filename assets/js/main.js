let swiper = new Swiper(".mySwiper", {
  speed:18000,
  direction: 'horizontal',
  autoplay: 
    {
      delay: 0,
      // pauseOnMouseEnter: true
    },
  slidesPerView: "auto",
  freeMode: true,
  loop: true,
  centerSlide: true,
});

// pause on hover 

new WOW().init();

// menu mobile click
document.querySelectorAll('#menu_mobile li a:not([target="_blank"])').forEach(el => {
  el.addEventListener('click',()=>{
    document.querySelector('#menu_mobile li a.is-active')?.classList?.remove('is-active');
    el.classList.add('is-active')
  })
})