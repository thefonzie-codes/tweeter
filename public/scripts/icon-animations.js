$(document).ready(function() {

  // Forces textbox in the tweet composer to resize according to entry

  $("textarea").each(function() {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
  }).on("input", function() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  });

  // adds classes that contain bounce animations for respective icons

  $('.scroll-up').hover(function() {
    $('.scroll-up').toggleClass('fa-bounce');
  });

  $('.compose').hover(function() {
    $('.compose').toggleClass('fa-bounce');
  });

});