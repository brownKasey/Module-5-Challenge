// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//gets the hour element
var hourEl = $('.time-block');

//gets current hour
var currentHour = dayjs().hour();

//turns all the divs into an array to be used later
var hourArray = Array.from(hourEl);
var saveBtnEl = $('.saveBtn');

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

 // 
  
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

// function that checks the time variable "currentHour" and compares that to the id of each hour
  function checkTime(){
    // a function that will run for each hour element to compare the id of the element to the current hour
    hourArray.forEach((hourEl) => {
      //turns the value of each id into an integer
      idVal = hourEl.id;

      console.log(currentHour);

      //compares id number to the time(formatted in 24 hrs)
      if (idVal == currentHour){
       hourEl.setAttribute("class", "row time-block present");
      } else if (idVal < currentHour){
        hourEl.setAttribute("class", "row time-block past");
      }else
      hourEl.setAttribute("class", "row time-block future");
    });
  }
  //calls the function
  checkTime();
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function saveUserInput(){
    //takes each hour elements' id then adds that value after "input-" so that it can grab each input
    hourArray.forEach((hourEl) => {
      idVal = hourEl.id;
      console.log(idVal);
      var inputEl = '#input-' + idVal;
      console.log(inputEl);
      var inputHour = $(inputEl).val();
      console.log(idVal, inputHour);
      localStorage.setItem(idVal, inputHour);
    });
  }



  //displays the current date in the header of the page.
  function showTime(){

    var timeInterval = setInterval(function() {
      $('#currentDay').text(dayjs().format('dddd, MMMM DD hh:mm:ss'));
    }, 1000);
  }
  showTime();
  

  saveBtnEl.addEventListener("click", saveUserInput);
});
