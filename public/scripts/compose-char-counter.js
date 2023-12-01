/* eslint-disable no-undef */
$(document).ready(() => {
  $("#tweet-text").keypress(function (e) {
    const charactersTyped = $(this).val();
    const counter = $(this).parent().find('.counter');
    counter.text(`${140 - (charactersTyped.length + 1)}`);
  });
});