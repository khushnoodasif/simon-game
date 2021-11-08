var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function() {
    if(!started) {
        started = true;
        $("#level-title").text("Level" + level);
        nextSequence();
    }
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(200).fadeIn(200);
    playSound(chosenColor);
}

function playSound(name) {
    var soundToPlay = new Audio("sounds/" + name + ".mp3");
    soundToPlay.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    window.setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(ind) {
    if(userClickedPattern[ind] === gamePattern[ind]) {
        if(userClickedPattern.length === gamePattern.length) {
            window.setTimeout(nextSequence, 1000);
        }
    }
   
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        window.setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);
        $("#level-title").text("Game Over! Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
