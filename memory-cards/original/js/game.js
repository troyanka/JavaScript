// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 3;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');


var isGameStarted = false;
var timeInSeconds = 0;
var intervalId = 0;

var startTimestamp = 0;
var endTimestamp = 0;


//
var username = null;
if( localStorage.getItem('user_name') ) {
    username = localStorage.getItem('user_name');
}

console.log( Date.now() );

if( username !== null ){
    document.getElementById('username').innerHTML = "Hello " + username + " and welcome back";
} else {
    saveUserName();
}

function saveUserName() {
    username = prompt("Please enter your name");
    localStorage.setItem('user_name', username );
    document.getElementById('username').innerHTML = "Hello " + username;
}

if( localStorage.getItem('best_time') ){
    document.getElementById('best_time').innerHTML = "Your best time is: " + localStorage.getItem('best_time') + "ms";
}


function startNewGame() {
    elPreviousCard = null;
    flippedCouplesCount = 0;
    isGameStarted = false;
    timeInSeconds = 0;
    intervalId = 0;
    startTimestamp = 0;
    endTimestamp = 0;
    document.querySelector(".time span").innerHTML = "";
    // get all elements with the flipped class
    var cards = document.querySelectorAll('.flipped');
    // remove this class from all elements
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('flipped');
    }
    document.getElementById('startToPlay').disabled = true;
}

function startTime() {
    intervalId = setInterval( function(){
        timeInSeconds++;
        document.querySelector(".time span").innerHTML = timeInSeconds;
    }, 1000 );
}
// This function is called whenever the user click a card
function cardClicked(elCard ) {
   
     //If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }
    if( isGameStarted === false ){
        startTime();
        isGameStarted = true;
        startTimestamp = Date.now();
    }
    // Flip it
    elCard.classList.add('flipped');
    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');

        // No match, schedule to flip them back in 1 second
        if (card1 !== card2) {
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
            }, 1000)

        } else {
            // Yes! a match!
            flippedCouplesCount++;
            elPreviousCard = null;

            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                clearInterval( intervalId );
                audioWin.play();
                document.getElementById('startToPlay').disabled = false;
                endTimestamp = Date.now();
                var timeInMilliSeconds = endTimestamp - startTimestamp;
                if( localStorage.getItem('best_time') ) {
                    var bestTime = parseInt( localStorage.getItem('best_time') );
                    if( timeInMilliSeconds < bestTime ) {
                        localStorage.setItem('best_time', timeInMilliSeconds);
                    }
                } else {
                    localStorage.setItem('best_time', timeInMilliSeconds);
                }
            }
        }
    }
}

function logout() {
    localStorage.clear();
    window.location.reload();
}
