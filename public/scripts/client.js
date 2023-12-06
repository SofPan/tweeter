/* eslint-disable no-undef */
const escape = (str) => {
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(str));
  return span.innerHTML;
};

$(document).ready(() => {
  $('.new-tweet').hide();
  // Only show new tweet form on icon click
  $('nav .show-form').on("click", () => {
    $('.new-tweet').slideDown();
    $('.new-tweet').find('textarea').focus();
    // scroll to the top of the main element with 120px offset
    $('html, body').scrollTop($("main").offset().top - 120);
  });
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
    const date = timeago.format(tweet.created_at, 'en_US');

    return `<article id="${tweet.postID}" class="tweet shadow">
        <header class="flex">
          <div>
            <span class="tweet--user_image"><img src="${user.avatars}" alt="avatar for ${user.handle}" /> </span>
            <span class="tweet--user_name">${user.name}</span>
          </div>
          <span class="tweet--user_handle">${user.handle}</span>
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
  const tweetIDs = [];
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" })
      // filter for IDs that already appear on the page
      .then(data => {
        return data.filter((d) => {
          if (!tweetIDs.includes(d.postID)) {
            tweetIDs.push(d.postID);
            return d;
          }
        });
      })
      .then(tweets => {
        renderTweets(tweets);
      });

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

