/* eslint-disable no-undef */
$(document).ready(() => {

  /* ----- Create and Render Tweets ----- */

  /**
   * @function createTweetElement takes in a single tweet object and returns dynamically formatted HTML
   * @function renderTweets appends the formatted HTML to the tweet container found in index.html
   */
  const renderTweets = (tweets) => {
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
    // Get day month & year from date string
    const date = new Date(tweet.created_at).toDateString().split(" ").slice(1).join(" ");

    return `<article class="tweet shadow">
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

  // renderTweets(data);


  /* ----- Form submission POST and GET AJAX requests */
  /**
   * @function loadTweets takes an array of tweets and makes a GET request to render them on the page
   */
  const loadTweets = (tweets) => {
    $.ajax(tweets, { method: "GET" })
      .then(renderTweets(tweets))
      .then(console.log("after tweets are rendered"));
  };

  // loadTweets(data);

  $("form").on("submit", function (event) {
    event.preventDefault();
    const serialized = $(this).serialize();
    $.ajax(serialized, { method: "POST" })
      .then(console.log("something happened?"));
  });


});

