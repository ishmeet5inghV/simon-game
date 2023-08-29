//variables

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// keydown 

$(document).keydown(function(){
    if(!started){
    $("#level-title").text("level "+ level);
    nextSequence();
    started = true;
    }
});

// btn click

$('.btn').click(function(){
    var userChosenColour  = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

// check Answer function

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong")

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }      
}

// main function

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumner = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColours[randomNumner]
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//play sound

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

// animation on click

function animatePress(currentColour){
    $("#"+currentColour).addClass('pressed');
    setTimeout(() => {
        $("#"+currentColour).removeClass('pressed');
    }, 100);
}

//start over

function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}




