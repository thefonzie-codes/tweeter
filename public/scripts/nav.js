$(document).ready(function() {

  $('.compose').on("click", () => {
    $('#new-tweet-form').slideToggle(800, () => {
      $('#tweet-str').focus();
    });
  });

});
