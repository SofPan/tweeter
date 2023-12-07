/* eslint-disable no-undef */
$(document).ready(() => {
  $('.tweet-new').hide();
  $('#return-to-top').hide();

  // depending on window scroll height, show or hide return-to-top button
  const tweetContainerTop = $("#tweets-container").offset().top;
  $(window).on("scroll", () => {
    if ($('nav').offset().top >= tweetContainerTop) {
      $('#return-to-top').fadeIn();
    } else {
      $('#return-to-top').fadeOut();
    }
  });

  // show tweet form and scroll into view on button click
  const showTweetForm = (event) => {
    event.preventDefault();
    $('.tweet-new').slideDown();
    $('.tweet-new').find('textarea').focus();
    // scroll to the top of the main element with 120px offset
    $('html, body').scrollTop($("main").offset().top - 120);
  };

  $('nav .show-form').on("click", showTweetForm);
  $('#return-to-top').on("click", showTweetForm);
});