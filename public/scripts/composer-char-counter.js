$(document).ready(function () {

  //counts the characters within the tweet composer textbox, counter will turn red if string exceeds 140 characters.

  const textArea = $("#tweet-str");  

  textArea.on('input', function (event) {  
    const textLength = $(this).val().length;
    const charCounter = $(this).parent().find('.counter');

    const count = (140 - textLength);
    charCounter.text(count);

    count < 0 ? charCounter.css("color", "red") : charCounter.css("color", "#545149");
  });

  //scrolls window back to top if clicked

  $('.scroll-up').on('click', (evt) => {
    window.scrollTo(0, 0);
  })

});
