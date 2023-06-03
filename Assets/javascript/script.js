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
       getUserInput(idVal);
      } else if (idVal < currentHour){
        hourEl.setAttribute("class", "row time-block past");
        getUserInput(idVal);
      }else{
        hourEl.setAttribute("class", "row time-block future");
        getUserInput(idVal);
      }
    });
  }
  //calls the function
  checkTime();

  function saveUserInput(event){
    //takes each hour elements' id then adds that value after "input-" so that it can grab each input
    event.preventDefault();
    hourArray.forEach((hourEl) => {
      idVal = hourEl.id;
      console.log(idVal);
      //adds the id "input-" to every id value
      inputEl = '#input-' + idVal;
      console.log(inputEl);
      //stores the input from the user to a variable
      input= $(inputEl).val();
      //stores the id as the key and the input as the value to local storage
      localStorage.setItem(idVal, input);
    });
  }
  function getUserInput(hour){
    // gets the user input from local storage
    var userValue = localStorage.getItem(hour);
    // adds the id "input-" to every id value
    var inputEl = "#input-" + hour;
    // appends the user value to the corresponding input element
    $(inputEl).append(userValue);
  
  }


  //displays the current date in the header of the page.
  function showTime(){

    var timeInterval = setInterval(function() {
      $('#currentDay').text(dayjs().format('dddd, MMMM DD hh:mm:ss'));
    }, 1000);
  }
  showTime();
  

  saveBtnEl.on("click", saveUserInput);
});
