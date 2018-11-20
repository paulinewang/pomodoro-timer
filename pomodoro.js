$(document).ready(function() {
  
    // global variables
    let sessionLength = 25; // setting default value
    let min = sessionLength;
    let sec = 0;
    let timer;
    let sessionOn = false;
    
    // function to adjust the formatting
    function formatTime(min, sec) {
      $('#time').html(((min < 10) ? "0" + min : min) + ":" + ((sec < 10) ? "0" + sec : sec));
    }
    
    // functions to adjust the session length
    // decrement session length
    $('#session-decrement').click(function() {
      if (sessionLength-1 >= 1) {
        sessionLength--;
        min = sessionLength;   // updates the value of minutes to countdown
        formatTime(sessionLength, 0);  // updates the display
      }
    });
    
    // increment session length
    $('#session-increment').click(function() {
      if (sessionLength+1 <= 60) { // not mandatory but indicates that one pomodor is max. 60 min
        sessionLength++;
        min = sessionLength;
        formatTime(sessionLength, 0);
      }
    });
    
    // function to start the timer
    function startTimer() {
      timer = setTimeout(startTimer, 1000);
      if (min === 0 && sec === 0) { // countdown is still running
        formatTime(min, sec);
        clearTimeout(timer);
        sessionOn = false;
      } else {
        if (min > 0 && sec === 0) {
          min--;
          sec = 59;
          formatTime(min, sec); // updates the display
        } else {
          sec--;
          formatTime(min, sec);
        }
      }
    }
    
    // function that triggers countdown using start button
    $('#start').click(function() {
      if (!sessionOn) {
        sessionOn = true;
        startTimer();
        settingsDisabled(true);
      }
    });
    
    // function that disables the start and session info buttons while startTime() is running.
    function settingsDisabled(boolean) {
          $('#session-increment').prop("disabled", boolean);
          $('#session-decrement').prop("disabled", boolean);
    }
    
    // reset pomodoro
    $('#reset').click(function() {
      clearTimeout(timer);
      min = 25;
      sec = 0;
      formatTime(min, sec);
      settingsDisabled(false);
    });
    
    // stop pomodoro
    $('#stop').click(function() {
      // insert a function to stop the timer
      if (sessionOn) {
        sessionOn = false; 
        clearTimeout(timer);
        settingsDisabled(true);
      }
    });
    
  }); // closing document.ready