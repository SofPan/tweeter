/* eslint-disable no-undef */
$(document).ready(() => {
  $("#tweet-text").keypress(function (e) {
    const charactersTyped = $(this).val();
    console.log(charactersTyped.length);
  });
});