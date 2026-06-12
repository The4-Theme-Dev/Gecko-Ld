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


// banner popup
class bannerPopup extends HTMLElement{
  static get observedAttributes(){
    return ['open'];
  }
  get open(){
    return this.hasAttribute('open');
  }
  constructor(){
    super();
    // return;
    this._id = this.getAttribute('id');
    this.shown = JSON.parse(sessionStorage.getItem(this._id));
    console.log(this.shown)
    if(this.shown) return;
    this.attachShadow({mode:'open'});
    const template = `
      <style>
        :host{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }
        .wrap{
            pointer-events:auto;
        }
        .overlay{
          position: absolute;
          inset:0;
            background-color: rgba(0,0,0,0.3);
            -webkit-backdrop-filter: blur(3px);
            backdrop-filter: blur(3px);
          opacity: 0;
          transition: .2s ease-in-out;
          cursor: url('./assets/images/cursor-close.svg') 25 25, auto;
          @media (width > 1150px){
            display: none;
          }
        }
        .content{

          z-index: 1;
          position: relative;
          transform: translateX(-20px);
          opacity: 0;
          transition: .3s ease-in-out;
        }
        .body{
          width: min(750px, 95vw);
          // aspect-ratio: 1;
          border-radius: 10px;
          overflow:hidden;
          @media (width > 1150px){
            width: min(400px, 30vw);
          }
        }
        button.close{
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 2;
          color: #fff;
          font-zise: 1rem;
          transition: .3s ease-in-out;
        }
        button.close:hover{
          color: #db1512;
        }
      </style>
      <div class="wrap">
        <div class="overlay"></div>
        <div class="content">
          <button part="close" class="close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
          </button>
          <div class="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `
    this.shadowRoot.innerHTML = template;

    this.close = this.shadowRoot.querySelector('.close');
    this.overlay = this.shadowRoot.querySelector('.overlay');
    this.content = this.shadowRoot.querySelector('.content');
    this.close.addEventListener('click',()=>{
      this.closePopup();
    });
    this.overlay.addEventListener('click',()=>{
      this.closePopup();
    });
    
    let timeout = setTimeout(() => {
      this.openPopup();
      clearTimeout(timeout);
    },15000);

  }
  openPopup(){
    this.style.setProperty('display','flex');
    setTimeout(() => {      
      this.overlay.style.setProperty('opacity','1');
      // document.querySelector('html').style.setProperty('overflow','hidden');
    }, 300);
    setTimeout(() => {
      this.content.style.setProperty('transform','translate(0,0)');
      this.content.style.setProperty('opacity','1');
    }, 500);
  }
  closePopup(){
    this.content.style.setProperty('transform','translateX(20px)');
    this.content.style.setProperty('opacity','0');
    setTimeout(() => {      
      this.overlay.style.setProperty('opacity','0');
      // document.querySelector('html').style.removeProperty('overflow');
    }, 300);
    setTimeout(() => {
      this.style.setProperty('display','none');
    }, 500);

    sessionStorage.setItem(this._id, true);
  }

}
customElements.define('clx-banner-popup',bannerPopup);

