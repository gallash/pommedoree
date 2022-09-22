// Make these sounds come out when the counter comes to zero
// https://freesound.org/search/?q=notification+&f=&w=&s=Automatic+by+relevance&advanced=0&g=1
// https://freesound.org/people/FoolBoyMedia/sounds/352652/
// https://www.codehim.com/date-time/javascript-alarm-clock-with-sound/
//
// This is a page that gives me inspiration for the project
// https://pomofocus.io/
//
// AJAX sending data from JS to Django
// https://www.youtube.com/watch?v=eVKRRTPCCnc

$(document).ready(function(){
    // $("#settings-popup-window").hide();

    showIdleButtons();
    setTimerSettings(sessionMinutes);
});


// System variables
let repetitions = 3;
let breakMinutes = 10;
const minuteToSeconds = 60; // Used as a constant
var sessionMinutes = 1;
let sessionTime = sessionMinutes*minuteToSeconds;
let actionsList = []; // e.g., {1:{'short_break:10', 'session_minutes':15}}, ...
var minutes = 0;
var seconds = 0;
var pauseSessionTime = 0; // Used when Pause is clicked




$("#button-play").on("click", function(){
    showPlayButtons();
    manageTimer(sessionTime);
});

$("#button-settings").on("click", function(){
    // Blur the background
    $("#main-div").addClass("main-page-panel-blur");

    // Call the settings popup
    // $("#settings-popup-window").show();
    $("#settings-popup-window").removeClass("hide-settings-popup")
});

$("#button-ok").on("click", function(){
    // Check whether the data input is valid
    // Constraints: session time [up to 60min, integer], sessions number [up to 8, integer]

    // Apply the changes to the variables if data is valid
    
    closeSettingsPopup();
});

$("#button-cancel").on("click", function(){
    closeSettingsPopup();
});


function showIdleButtons(){
    $("#button-play").show();
    $("#button-settings").show();
    $("#button-stop").hide();
    $("#button-skip").hide();
    $("#button-pause").hide();
};

function showPlayButtons(){
    $("#button-play").hide();
    $("#button-settings").hide();
    $("#button-stop").show();
    $("#button-skip").show();
    $("#button-pause").show();
}

function closeSettingsPopup(){
    // Close the window
    // $("#settings-popup-window").hide();
    $("#settings-popup-window").addClass("hide-settings-popup");
    
    // Remove blur
    $("#main-div").removeClass("main-page-panel-blur");
}

function setCustomSettings(){

}

function setTimerSettings(sessionMinutes){
   // Called each time a new timer is started
    minutes = sessionMinutes;
    seconds = 0;

    $('#counter-minutes').text(minutes);
    $('#counter-seconds').text(seconds);
}

function manageTimer(sessionTime){
    if (pauseSessionTime !== 0){
        // This would mean that the pause button was clicked
        sessionTime = pauseSessionTime;
    }

    let timerId = setInterval(function(){
        $("#button-stop").on("click", function(){
            showIdleButtons();
            setTimerSettings(sessionMinutes);
            sessionTime = 0; // Inducing the code to finish counting
        });
        

        $("#button-pause").on("click", function(){
            // Hides Pause button and shows Play button
            $("#button-pause").hide();
            $("#button-play").show();

            // Stop the timer from counting
            pauseSessionTime = sessionTime;
            clearInterval(timerId);
        });


        // Normal flow of time
        if (sessionTime > 0){
            sessionTime--;
            
            minutes = Math.floor(sessionTime/minuteToSeconds);
            seconds = sessionTime - minutes*minuteToSeconds;

            $('#counter-minutes').text(minutes);
            $('#counter-seconds').text(seconds);
            
        }else{
            // Rings the bell and skips to the next thing in line (actionsList)
            showIdleButtons();
            clearInterval(timerId);
            pauseSessionTime = 0; // For good measure
        }
    },1000);
}