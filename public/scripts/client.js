/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (newTweetData) => { //Creates the tweet DOM

  const timeSince = timeago.format(newTweetData.created_at)

  const layout = `
  <article>
  <section class="tweet-header">
    <h4>
    <img src="${newTweetData.user.avatars}">
    ${newTweetData.user.name}</h4>
    <h5>${newTweetData.user.handle}</h5>
  </section>
  <p>${newTweetData.content.text}</p>
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

  $('.container').append(layout);
};

const renderTweets = (allTweets) => { //Adds tweet DOM to container
  allTweets.forEach((element) => {
    createTweetElement(element);
  });
};

$(document).ready(function () {

  const loadTweets = () => {
    $.get("http://localhost:8080/tweets", (data) => {
      renderTweets(data);
    });
  };

  $("#new-tweet-form").on('submit', (evt) => {
    evt.preventDefault();
    const data = $("#new-tweet-form").serialize();

    $.post("/tweets", data);

    $('.container').empty();

    loadTweets();
  });

});