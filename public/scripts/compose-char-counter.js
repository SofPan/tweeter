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
});