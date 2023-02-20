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


  // $('.entry').focus(function () {
  //   $(this).prop('contenteditable', true);
  // }, function () {
  //   $(this).prop('contenteditable', false);

  //   // Save the text to local storage
  //   var text = $(this).text();
  //   var hour = $(this).data('entry');
  //   localStorage.setItem(hour, text);
});

// Load the text from local storage
// $('.entry').each(function () {
//   var hour = $(this).data('entry');
//   var text = localStorage.getItem(hour);
//   if (text) {
//     $(this).text(text);
//   }
// });

// Get all the div elements with the "editable" class
const editableDivs = document.querySelectorAll('.entry');

// Loop through each editable div and attach a click event listener
editableDivs.forEach(div => {
  // Add the placeholder text to the div
  div.textContent = div.getAttribute('data-placeholder');

  div.addEventListener('click', () => {
    // if the div already has stored value remove it when clicked
    const storedValue = localStorage.getItem(div.id);
    if (storedValue) {
      div.textContent = '';
    }
    // If the div has the placeholder text, clear it
    if (div.textContent === div.getAttribute('data-placeholder')) {
      div.textContent = '';
    }

    // Check if an input element already exists in the div
    let input = div.querySelector('input');

    if (!input) {
      // If an input element does not exist, create one and append it to the clicked div
      input = document.createElement('input');
      div.appendChild(input);
    }

    // Set the value of the input element to the current text in the div
    input.value = div.textContent;

    // Focus on the input element to allow the user to enter text
    input.focus();

    // Add a submit event listener to the input element
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // Get the text entered by the user
        const text = input.value;

        // Store the text in local storage
        localStorage.setItem(div.id, text);

        // Update the div element with the new text
        div.textContent = text;

        // If the div has no content, show the placeholder text
        if (div.textContent.trim() === '') {
          div.textContent = div.getAttribute('data-placeholder');
        }
      }
    });    
  });

  // Check if there is stored text in local storage for the div element
  const storedText = localStorage.getItem(div.id);
  if (storedText) {
    // Update the div element with the stored text
    div.textContent = storedText;
  }
});