/*global $, window, document */
$(document).ready(function() {
  'use strict';

  $(document).on('scroll', onScroll);

  $('a[href^="#"]').on('click', function(e) {
    var target = $(this.hash);

    if (!target.length) {
      return;
    }

    e.preventDefault();
    $(document).off('scroll');

    $('a').removeClass('active');
    $(this).addClass('active');

    if ($(window).width() < 992) {
      $('.nav-menu').slideUp();
    }

    $('html, body').stop().animate({
      scrollTop: target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.selector;
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

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll > 120) {
      $('#main-nav').slideDown(350);
    } else {
      $('#main-nav').slideUp(350);
    }
  });

  $('.responsive').on('click', function() {
    $('.nav-menu').slideToggle();
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

  $('#contact-form').on('submit', function(e) {
    e.preventDefault();

    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var company = $('#company').val().trim() || 'Not provided';
    var budget = $('#budget').val();
    var projectType = $('#projectType').val().trim() || 'Not specified';
    var message = $('#message').val().trim();
    var note = $('#form-note');

    if (!name || !email || !message) {
      note.text('Please fill out your name, email, and project details so we can create the draft.');
      return;
    }

    var subject = encodeURIComponent('New inquiry from ' + name + ' via Fig and Fern Software Studio');
    var body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Company: ' + company + '\n' +
      'Budget: ' + budget + '\n' +
      'Project type: ' + projectType + '\n\n' +
      'Project details:\n' + message
    );

    note.text('Your email draft is opening now.');
    window.location.href = 'mailto:hello@figandfern.studio?subject=' + subject + '&body=' + body;
  });
});
