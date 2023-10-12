/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (newTweetData) => { //Creates the tweet DOM

  const timeSince = timeago.format(newTweetData.created_at)

  const escape = function (str) {
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

const renderTweets = (allTweets) => { //Adds tweet DOM to container

  const tweetsReverseChronological = allTweets.reverse();

  tweetsReverseChronological.forEach((element) => {
    createTweetElement(element);
  });
};

$(document).ready(function () {

  const loadTweets = () => {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  $("#new-tweet-form").on('submit', (evt) => {

    evt.preventDefault();

    const input = $("#tweet-str").val();
    const data = $("#new-tweet-form").serialize();

    if (input.length > 140){
      $(".too-long").slideDown();
      evt.stopPropagation();
    };

    if (input.length <= 0){
      $(".no-text").slideDown();
      evt.stopPropagation();
    };

    $.post("/tweets", data);
    $(".existing-tweets").empty();
    $("#tweet-str").val("");
    loadTweets();
  });

  $("#new-tweet-form").on('click', (evt) => {
    $("h3").slideUp();
    evt.stopPropagation();
  });

  loadTweets();
});