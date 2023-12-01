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
});