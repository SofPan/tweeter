/* eslint-disable no-undef */
$(document).ready(() => {
  $("#tweet-text").on("input", function (e) {
    const counter = $(this).parent().find('.counter');
    const charactersRemaining = 140 - (this.value.length + 1);
    counter.text(charactersRemaining);
    if (charactersRemaining <= 0) {
      counter.addClass('text-alert');
    } else {
      counter.removeClass('text-alert');
    }
  });

  $('#return-to-top').hide();
  const tweetContainerTop = $("#tweets-container").offset().top;
  $(window).on("scroll", () => {
    if ($('nav').offset().top >= tweetContainerTop) {
      $('#return-to-top').fadeIn();
    } else {
      $('#return-to-top').fadeOut();
    }
  });

  $('#return-to-top').on("click", function (event) {
    event.preventDefault();
    $('.new-tweet').slideDown();
    $('.new-tweet').find('textarea').focus();
    // scroll to the top of the main element with 120px offset
    $('html, body').scrollTop($("main").offset().top - 120);
  });
});