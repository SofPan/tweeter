/* eslint-disable no-undef */
$(document).ready(() => {
  const createTweetElement = () => {
    return `<article>Hello world!</article>`;
  };
  const $tweet = createTweetElement();
  $('#tweets-container').append($tweet);
});

