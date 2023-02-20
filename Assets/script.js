$(document).ready(function () {
  var currentHour = dayjs().hour();
  console.log(currentHour);

  $('.hour').each(function () {
    var hour = $(this).data('hour');
    console.log(hour);

    if (hour < currentHour) {
      $(this).addClass('past');
    }

    if (hour == currentHour) {
      $(this).addClass('now');
    }
  });
  const currentDay = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDay);


  $('.entry').hover(function () {
    $(this).prop('contenteditable', true);
  }, function () {
    $(this).prop('contenteditable', false);

    // Save the text to local storage
    var text = $(this).text();
    var hour = $(this).data('hour');
    localStorage.setItem(hour, text);
  });

  // Load the text from local storage
  $('.hour').each(function () {
    var hour = $(this).data('hour');
    var text = localStorage.getItem(hour);
    if (text) {
      $(this).text(text);
    }
  });
});