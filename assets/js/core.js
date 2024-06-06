// ============== CORE =================
//    VERSION: 1.0
//    AUTHOR: THE4 STUDIO
//    DEV: CLX
//
//  STRUCTOR:
//      1. MARQUEE
//      2. HEADER
//      3. DEMO LIST + LOAD MORE
//      4. TABS
//      5. FAQs item
//      6. Menu mobile
//      7. Modals
//      8. Back to top
// =====================================

import { dataDemos, renderDemo } from "./handle/render_demo_item.js";
import { data_modal } from "./handle/data_modal.js";

// 1. MARQUEE
class infiniteLoop extends HTMLElement {
  constructor() {
    super();
    this.config = JSON.parse(this.getAttribute("config"));
    this.fps = 60 / 100; // 30fps
    if(window.innerWidth < 767){
      this.fps = 10/100;
    }
    this.container = this.querySelector(".loop-container");
    this.track = this.querySelector(".loop-track");
    this.items = this.querySelectorAll(".loop-item");
    this.width =
      Array.from(this.items).slice(-1)[0].offsetLeft +
      Array.from(this.items).slice(-1)[0].getBoundingClientRect().width;
    this.speed = this.config?.speed * this.items.length || 1000; // low to fast
    this.frame = this.fps * this.speed;

    this.steps = this.width / this.frame;
    this.posX = 0;
    this.direction = this.config?.direction == "" ? 1 : -1 || 1;
    // console.log(this.direction);
    this.tempSteps;

    this.init();
    // console.log(getComputedStyle(Array.from(this.items).slice(-1)[0]).left);
  }
  init() {
    this.clone();
    this.animated();
    this.registerEvents();
  }
  clone() {
    let times =
      Math.ceil(this.container.getBoundingClientRect().width / this.width) + 1;
    this.track.innerHTML = "";
    for (let i = 1; i <= times; i++) {
      for (let j = 0; j < this.items.length; j++) {
        let node = this.items[j].cloneNode(true);
        this.track.appendChild(node);
      }
    }
  }
  animated() {
    this.posX += this.steps * this.direction;
    // console.log(Math.floor(Math.abs(this.posX)),Math.floor(this.width));
    this.track.style.transform = `translate3d(${this.posX}px,0,0)`;
    if (
      parseFloat(Math.floor(Math.abs(this.posX))) >=
      parseFloat(Math.floor(this.width))
    ) {
      this.posX = 0;
    }
    window.requestAnimationFrame(this.animated.bind(this));
  }
  paused() {
    this.tempSteps = this.steps;
    return (this.steps = 0);
  }
  resumed() {
    return (this.steps = this.tempSteps);
  }
  registerEvents() {
    this.track.addEventListener("mouseenter", () => this.paused());
    this.track.addEventListener("mouseleave", () => this.resumed());
    window.addEventListener("resize", () => this.debounce(this.clone(), 300));
  }
  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
customElements.define("infinite-loop", infiniteLoop);
// 2. HEADER
// class customHeader extends HTMLElement {
//   constructor() {
//     super();
//     this.config = JSON.parse(this.getAttribute("config"));
//     this.html = document.querySelector("html");
//     this.topbar_h = document.querySelector("#topbar");
//     this.height = parseInt(this.config.height);
//     this.stickyOnScroll();
//   }
//   connectedCallback() {
//     if (window.innerWidth < 767) {
//       document
//         .querySelector("html")
//         .style.setProperty("--header-height", `${(this.height / 3) * 2}px`);
//     } else {
//       document
//         .querySelector("html")
//         .style.setProperty("--header-height", `${this.height}px`);
//     }
//     if (this.config.is_transparent) {
//       this.html.classList.add("is-transparent");
//     }
//     if (this.config.is_sticky) {
//       this.html.classList.add("is-sticky");
//     }
//     if(this.config.is_glasses){
//       this.html.classList.add('is-glasses');
//     }
//   }
//   init() {}
//   stickyOnScroll() {
//     window.addEventListener("scroll", () => {
//       if (window.scrollY > this.height) {
//         this.html.classList.add("sticky-scroll");
//       } else {
//         this.html.classList.remove("sticky-scroll");
//       }
//     });
//   }
// }
// customElements.define("custom-header", customHeader);

// 3. DEMO LIST + LOAD MORE

class demoList extends HTMLElement {
  constructor() {
    super();
    this.btn_loadmore = this.querySelector('button[is="loadmore"]');
    this.root_content = this.querySelector("[data-replace-content]");
    this.current_item = 10;
    this.step = 15;
    this.debounce = 500;

    this.handleButtonLoadMore();
  }
  init() {}
  handleButtonLoadMore() {
    this.btn_loadmore.addEventListener("click", () => {
      // console.log(this.current_item + 9, dataDemos.length);
      if (parseInt(this.current_item + 9) >= parseInt(dataDemos.length)) {
        this.btn_loadmore.setAttribute("hidden", "");
      }
      this.btn_loadmore.setAttribute("loading", true);
      let client_h =
        this.root_content.clientHeight + this.root_content.offsetTop;

      setTimeout(() => {
        this.handleLoadMore();
        this.btn_loadmore.setAttribute("loading", false);
        window.scrollTo(0, client_h);
      }, this.debounce);
    });
  }

  handleLoadMore() {
    let next_item = parseInt(this.current_item) + parseInt(this.step);
    let htmls = renderDemo(this.current_item, next_item);
    this.current_item += parseInt(this.step);
    htmls.forEach((el) => {
      this.root_content.insertAdjacentHTML("beforeend", el);
    });
  }
}
customElements.define("demo-loader", demoList);

// 4. TABS

class tabsGroup extends HTMLElement {
  constructor() {
    super();
    this.btns = this.querySelectorAll("button");
    this.content_wrap = this.nextElementSibling;
    this.data_handle = this.dataset.handle;

    this.handleButton();
  }
  handleButton() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.querySelector("button.is-active").classList.remove("is-active");
        this.content_wrap
          .querySelector(".content-item.is-active")
          .classList.remove("is-active");
        this.content_wrap
          .querySelector(`${this.dataset.handle}-${btn.dataset.tabs}`)
          .classList.add("is-active");
        btn.classList.add("is-active");
      });
    });
  }
}
customElements.define("tabs-group", tabsGroup);

// 5. FAQs item
class faqItem extends HTMLElement{
  constructor(){
    super();
    this.content = this.querySelector('.content');
    this.is_f_open = this.getAttribute('is-first-open');    
    if(this.is_f_open){
      this.content.style.height = `${this.content.scrollHeight}px`
    }
    this.addEventListener('click',()=>{
      let is_active = this.classList.contains('is-active');
      is_active === true ? this.classList.remove('is-active') : this.classList.add('is-active');
      is_active === true ? this.content.style.height = 0 : this.content.style.height = `${this.content.scrollHeight}px`;
    })
  }
}
customElements.define('faq-item',faqItem);

// 6. Menu mobile
class menuMobile extends HTMLElement{
  constructor(){
    super();
    this.close_btn = this.querySelector('button.close');
    this.overlay = this.querySelector('.overlay');

    this.close_btn.addEventListener('click', this.close.bind(this));
    this.overlay.addEventListener('click',this.close.bind(this));
  }
  close(){
    this.classList.remove('open');
    document.querySelector('html').classList.remove('mtfp');
  }
}
customElements.define('menu-mobile',menuMobile);

document.querySelector('[menu_bar_action]')?.addEventListener('click',()=>{
  document.querySelector('menu-mobile').classList.add('open');
  document.querySelector('html').classList.add('mtfp');
})


// 7. Modals
class customModal extends HTMLElement{
  constructor(){
    super();
    this.html = document.querySelector('html');
    this.close_btn = this.querySelector('button.close');
    this.overlay = this.querySelector('.overlay');
    this.content = this.querySelector('.content');

    this.close_btn.addEventListener('click',()=> this.close());
    this.overlay.addEventListener('click',()=> this.close());
  }
  open(id){
    let html_content = data_modal.filter(item => item.id == id);
    
    this.content.innerHTML = html_content[0].body_html;
    this.classList.add('open');
    this.html.classList.add('mtfp');
  }
  close(){
    this.classList.remove('open');
    this.html.classList.remove('mtfp');
  }
}
customElements.define('custom-modal',customModal);

// open modal
class openModalButtons extends HTMLElement{
  constructor(){
    super();
    this.modal = document.querySelector('custom-modal');

    this.addEventListener('click',()=>
    {
      this.modal.open(this.dataset.handle);
    })
  }
}
customElements.define('open-modal',openModalButtons);

// 8. back to top
class backTop extends HTMLElement{
  constructor(){
    super();
    this.btn = this.querySelector('button');

    window.addEventListener('scroll', ()=>{
      if(window.scrollY > 800){
        this.classList.add('show');
      }else{
        this.classList.remove('show');
      }
    })
    this.btn.addEventListener('click',()=>{
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

  }
 
}
customElements.define('back-to-top',backTop);

// 9. sticky banner

class stickyBanner extends HTMLElement{
  constructor(){
    super();
    this.btn =this.querySelector('button.close');

    this.btn.addEventListener('click',()=>{
      this.querySelector('.banner-wrap').setAttribute('hide','')
      setTimeout(() => {
        this.setAttribute('hide','');
      }, 500);
    })
  }
}
customElements.define('sticky-banner',stickyBanner);

// set width scrollbar
function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

}

document.querySelector('html').style.setProperty('--scrollbar-w',`${getScrollbarWidth()}px`);