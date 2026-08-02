/*global $, window, document */
$(document).ready(function() {
  'use strict';

  $(document).on('scroll', onScroll);

  $('a[href^="#"]').on('click', function(e) {
    var hash = this.hash;
    var target = $(hash);

    if (!target.length) {
      return;
    }

    e.preventDefault();
    $(document).off('scroll');

    $('a').removeClass('active');
    $(this).addClass('active');

    if ($(window).width() < 992) {
      $('.nav-menu').hide();
    }

    $('html, body').stop().animate({
      scrollTop: target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = hash;
      $(document).on('scroll', onScroll);
    });
  });

  function onScroll() {
    var scrollPos = $(document).scrollTop() + 120;

    $('.nav-menu a').each(function() {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));

      if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
        $('.nav-menu a').removeClass('active');
        currLink.addClass('active');
      }
    });
  }

  $('.responsive').on('click', function() {
    $('.nav-menu').toggle();
  });

  if ($('.typed').length) {
    $('.typed').typed({
      strings: [
        'founders with bold ideas.',
        'teams tired of clunky tools.',
        'brands ready for a glow-up.',
        'businesses ready to grow.'
      ],
      typeSpeed: 55,
      backDelay: 1800,
      loop: true
    });
  }

});
