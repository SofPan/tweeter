/* eslint-disable no-undef */
$(document).ready(() => {
  const escape = (str) => {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };
  /* ----- Create and Render Tweets ----- */

  /**
   * @function createTweetElement takes in a single tweet object and returns dynamically formatted HTML
   * @function renderTweets appends the formatted HTML to the tweet container found in index.html
   */
  const renderTweets = (tweets) => {
    // empty tweets container before re-render to prevent duplicates
    $('#tweets-container').empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $createdTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($createdTweet);
    }
  };

  const createTweetElement = (tweet) => {
    const user = tweet.user;
    const content = tweet.content;
    const date = timeago.format(tweet.created_at, 'en_US');

    return `<article class="tweet shadow border">
        <header class="flex">
          <div>
            <span class="tweet--user_image"><img src="${user.avatars}" alt="avatar for ${user.handle}" /> </span>
            <span class="tweet--user_name">${user.name}</span>
          </div>
          <div>
            <span class="tweet--user_handle">${user.handle}</span>
          </div>
        </header>
        <p>${escape(content.text)}</p>
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

  /* ----- Form submission POST and GET AJAX requests */
  /**
   * @function loadTweets takes an array of tweets and makes a GET request to render them on the page
   */
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" })
      .then(response => renderTweets(response));
  };

  loadTweets();
  $("#error").hide();

  $("form").on("submit", function (event) {
    event.preventDefault();
    $("#error").slideUp();
    const tweetText = $(this).find('textarea').val();
    if (tweetText.trim().length <= 0) {
      $("#error").find('p').text("Tweets must not be empty.");
      $("#error").slideDown();
    } else if (tweetText.length > 140) {
      $("#error").find('p').text("Tweets must be a maximum 140 characters.");
      $("#error").slideDown();
    } else {
      const serialized = $(this).serialize();
      $.ajax("/tweets", {
        data: serialized,
        method: "POST",
      })
        .then(() => {
          loadTweets();
        })
        .then(() => {
          // clear textarea on successful submission
          $(this).find('textarea').val("");
          // reset counter to 140
          $(this).find('.counter').text("140");
          // hide the form
          $(".new-tweet").slideUp();
        });
    }
  });
});

