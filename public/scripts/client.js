/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = (newTweetData) => { //Creates the tweet DOM

    const timeSince = timeago.format(newTweetData.created_at);
  
    //ensures that site is safe from XSS attacks
    //@param str is an input string which will be the new tweet data's content
  
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
  
    const safeHTML = `<p>${escape(newTweetData.content.text)}</p>`;
  
    const layout = `
    <article>
    <section class="tweet-header">
      <h4>
      <img src="${newTweetData.user.avatars}">
      ${newTweetData.user.name}</h4>
      <h5>${newTweetData.user.handle}</h5>
    </section>
    ${safeHTML}
    <footer>
      ${timeSince}
      <section class="tweet-buttons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </section>
    </footer>
  </article>
  `;
  
    $('.existing-tweets').append(layout);
  };
  
  // adds tweet DOM to container
  // @param (allTweets) should be an array of tweet data
  
  const renderTweets = (allTweets) => {
  
    const tweetsReverseChronological = allTweets.reverse();
  
    tweetsReverseChronological.forEach((element) => {
      createTweetElement(element);
    });
  };

  // function  to load tweets

  const loadTweets = () => {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  $("#new-tweet-form").on('submit', (evt) => {

    evt.preventDefault();

    const input = $("#tweet-str").val();
    const data = $("#new-tweet-form").serialize();

    // the code below will automatically display errors in red if tweet is 0 charachters or over 140.

    if (input.length > 140) {
      $(".too-long").slideDown();
      return false;
    }

    if (input.length <= 0) {
      $(".no-text").slideDown();
      return false;
    }

    $.post("/tweets", data);
    $(".existing-tweets").empty();
    $("#tweet-str").val("");
    $("#tweet-str").parent().find('.counter').val(140)
    loadTweets();
  });

  // the code below hides the error message upon clicking the tweet composer text box

  $("#new-tweet-form").on('click', (evt) => {
    $("h3").slideUp();
  });

  // loads existing tweets upon site load

  loadTweets();
});