/* eslint-disable no-undef */
$(document).ready(() => {
  $("#tweet-text").keypress(function (e) {
    const charactersTyped = $(this).val();
    const counter = $(this).parent().find('.counter');
    const charactersRemaining = 140 - (charactersTyped.length + 1);
    counter.text(charactersRemaining);
    if (charactersRemaining <= 0) {
      counter.addClass('text-alert');
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