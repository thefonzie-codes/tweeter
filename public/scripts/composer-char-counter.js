$(document).ready(function () {

  const textArea = $("#tweet-str");

  textArea.on('focus', function (event) {
    $(this).text("");
  });

  textArea.on('blur', function (event) {
    
  });

  textArea.on('input', function (event) {
    const textLength = $(this).val().length;
    const charCounter = $(this).parent().find('.counter');

    const count = (140 - textLength);
    charCounter.text(count);

    count < 0 ? charCounter.css("color", "red") : charCounter.css("color", "#545149");
  });

});
