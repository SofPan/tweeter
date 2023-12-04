/* eslint-disable no-undef */

// Dummy data
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

$(document).ready(() => {

  const createTweetElement = (tweet) => {
    const user = tweet.user;
    const content = tweet.content;
    const date = new Date(tweet.created_at).toDateString().split(" ").slice(1).join(" ");

    return `<article class="tweet">
        <header class="flex">
          <div>
            <span class="tweet--user_image"><img src="${user.avatars}" alt="avatar for ${user.handle}" /> </span>
            <span class="tweet--user_name">${user.name}</span>
          </div>
          <span class="tweet--user_handle">${user.handle}</span>
        </header>
        <p>${content.text}</p>
        <footer class="flex">
          <span class="tweet--posted">${date}</span>
          <div class="tweet--icons">
            <i class="fa-solid fa-flag text-main"></i>
            <i class="fa-solid fa-retweet text-main"></i>
            <i class="fa-solid fa-heart text-main"></i>
          </div>
        </footer>
      </article>`;
  };

  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);
});

