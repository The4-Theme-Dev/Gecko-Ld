// ==================================================
// Project Name  :  ZiX - Creative Agency Template
// File          :  JS Base
// Version       :  1.0.0
// Last change   :  22 January 2020
// Author        :  DroitLab
// Developer:    :  Rakibul Islam Dewan
// ==================================================




(function($) {
  "use strict";



  // back to top - start
  // --------------------------------------------------
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('#backtotop:hidden').stop(true, true).fadeIn();
    } else {
      $('#backtotop').stop(true, true).fadeOut();
    }
  });
  $(function() {
    $("#scroll").on('click', function() {
      $("html,body").animate({
        scrollTop: $("#thetop").offset().top
      }, "slow");
      return false
    })
  });
  // back to top - end
  // --------------------------------------------------



  // preloader - start
  // --------------------------------------------------
  // $(window).on('load', function(){
  //   $('#preloader').fadeOut('slow',function(){$(this).remove();});
  // });
  // preloader - end
  // --------------------------------------------------



  // background image - start
  // --------------------------------------------------
  $('[data-background]').each(function() {
    $(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
  });
  // background image - end
  // --------------------------------------------------



  // counter up - start
  // --------------------------------------------------
  $('.counter-text').counterUp({
    delay: 10,
    time: 1500
  });
  // counter up - end
  // --------------------------------------------------



  // menu button - start
  // --------------------------------------------------
  $(document).ready(function () {
    $('.close-btn, .overlay').on('click', function () {
      $('#sidebar-menu').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('.menu-list ul .nav-link').on('click', function () {
      $('#sidebar-menu').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('#sidebar-collapse').on('click', function () {
      $('#sidebar-menu').addClass('active');
      $('.overlay').addClass('active');
    });
  });
  // menu button - end
  // --------------------------------------------------



  // new sticky header - start
  // --------------------------------------------------
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('.sticky-header').addClass("stuck")
      // $(".navbar img").attr("src", "img/logo.png");
    } else {
      $('.sticky-header').removeClass("stuck")
      // $(".navbar img").attr("src", "img/logo-white.png");
    }
  });
  // new sticky header - end
  // --------------------------------------------------



  // product carousel - start
  // --------------------------------------------------
  $('#product-carousel').owlCarousel({
    nav:true,
    loop:true,
    margin:0,
    dots:false,
    center:true,
    autoplay:false,
    smartSpeed:1000,
    autoplayTimeout:15000,
    autoplayHoverPause:true,
    responsive:{
      0:{
        items:1
      },
      680:{
        items:1
      },
      767:{
        items:1
      },
      1000:{
        items:1
      },
      1920:{
        items:1
      }
    }
  });
  // product carousel - end
  // --------------------------------------------------

// product carousel - start
  // --------------------------------------------------
  $('#store-carousel').owlCarousel({
    nav:true,
    loop:true,
    margin:0,
    dots:false,
    center:true,
    autoplay:true,
    smartSpeed:1000,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive:{
      0:{
        items:1
      },
      680:{
        items:2
      },
      767:{
        items:2
      },
      1000:{
        items:3
      },
      1920:{
        items:4
      }
    }
  });
  // product carousel - end
  // --------------------------------------------------

  // masoney grid layout - start
  // --------------------------------------------------
  var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    }); 
  });
  // masoney grid layout - end
  // --------------------------------------------------



  // scroll animation - start
  // --------------------------------------------------
  AOS.init({
    // disable: function() {
    //   var maxWidth = 769;
    //   return window.innerWidth < maxWidth;
    // }
    once: true,
  });
  // scroll animation - end
  // --------------------------------------------------

})(jQuery);