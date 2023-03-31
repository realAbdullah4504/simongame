let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userChosenColour = null;
let userClickPattern = [];
let level = 0;
let started = false;

$(document).on("keydown", function (event) {
    if (event.key === 'a' && started === false) {
        nextSequence();
        started = true;
    }
}
);


$(".btn").click(function () {
    userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    checkAnswer(userClickPattern.length);
    animatePress();
    playSound(userChosenColour);
    //console.log(userChosenColour);
});

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
        if (gamePattern.length === userClickPattern.length) {
            userClickPattern = [];
            setTimeout(nextSequence, 1000);

        }
    }
    else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function startOver() {
    level=0;
    started=false;
    gamePattern=[];
}

function playSound(name) {
    let audio1 = new Audio(`sounds/${name}.mp3`);
    audio1.play();
}

function nextSequence() {
    level++;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColours = buttonColours[randomNumber];
    $(`#${randomChosenColours}`).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColours);
    playSound(randomChosenColours);
    $("#level-title").text(`Level ${level}`);

}
function animatePress() {
    $(`#${userChosenColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${userChosenColour}`).removeClass("pressed");
    }, 100);
}