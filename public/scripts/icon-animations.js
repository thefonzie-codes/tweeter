$(document).ready(function () {

  const tweetArea = $("article");
  const icon = $(".tweet-buttons").children();
  const button = $("button");

  tweetArea.on('mouseover', function (event) {
    $(this).css("box-shadow", "2px 2px #4056A1");
  });

  tweetArea.on('mouseleave', function (event) {
    $(this).css("box-shadow", "0px 0px 0px");
  });

  icon.on('mouseover', function (event) {
    $(this).css("color", "#c29f55");
    $(this).css("font-size", "small");
  });

  icon.on('mouseleave', function (event) {
    $(this).css("color", "#4056A1");
    $(this).css("font-size", "x-small");
  });

  button.on('mouseover', function (event) {
    $(this).css("box-shadow", "2px 2px #4056A1");
  });

  button.on('mouseleave', function (event) {
    $(this).css("box-shadow", "0px 0px 0px");
  });

  $("textarea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
  }).on("input", function () {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  });

});