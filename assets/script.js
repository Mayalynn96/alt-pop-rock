// getting the different sections of the page
var startEl = document.getElementById("start");
var gameEl = document.getElementById("game");
var endGameEl = document.getElementById("endGame")
var scoreBoardEl = document.getElementById("scoreBoard")
var reBtns = document.getElementById("reBtns");

//Starts game when start button is pressed
startBtn.addEventListener("click", startGame);

function startGame() {
    startEl.style.display = "none";
    gameEl.style.display ="flex";
    scoreEl.textContent = "Score: " + timeLeft;
    scoreCount();
    nextQuestion();
}

// getting elements from the game section
// Questions elements from html
var questionEl = document.querySelector("#question");
// Answer choice buttons
var allBtns = document.getElementsByClassName("answers");
// part that tells the user if the answer they chose is correct or wrong
var resultEl = document.querySelector("#result");
// score countdown ellement
var scoreEl = document.getElementById("scoreCount");

// To keep track of what question the user is at 
var questionNumber = 0;
var timeLeft = 120;

// Pool of Questions
let questions = [
    {
        "question": "What band is known for the disturbing song 'Pumped Up Kicks'?",
        "correctAnswer": "Foster The People",
        "choices": ["Foster The People", "The Lumineers", "Twenty One Pilots", "Talking Heads"]
    },
    {
        "question": "which one of these song titles is not an AJR song",
        "correctAnswer": "Hands in the Air",
        "choices": ["Bummerland", "Hands in the Air", "Burn the House Down", "Karma"]
    },
    {
        "question": "What band is Brendon Urie the lead singer off?",
        "correctAnswer": "Panic! at the Disco",
        "choices": ["Fall Out Boy", "My Chemical Romance", "Green Day", "Panic! at the Disco"]
    },
    {
        "question": "Continue the lyrics: Oh, there ain't no rest for the wicked...",
        "correctAnswer": "Money don't grow on trees",
        "choices": ["I know I can't slow down", "Money don't grow on trees", "I got bills to pay", "Because I know we're all the same"]
    },
    {
        "question": "What german band is known for their song 'Stolen Dance'?",
        "correctAnswer": "Milky Chance",
        "choices": ["Milky Chance", "Die Ärzte", "Cinema Bizarre", "Tokio Hotel"]
    },
    {
        "question": "which one of the following titles IS a Twenty One Pilots song?",
        "correctAnswer": "Forest",
        "choices": ["Ocean", "Car", "Forest", "Headache"]
    },
    {
        "question": "What is Lady Gaga's birth name?",
        "correctAnswer": "Stefani Germanotta",
        "choices": ["Helena Germagnotti", "Stefani Germanotta", "Stella Germana", "Luana Magnotti"]
    },
    {
        "question": "Wich one of these is actually a Band?",
        "correctAnswer": "Arctic Monkeys",
        "choices": ["Hot Gorillas", "Atlantic Leopards", "Sad Foxes", "Arctic Monkeys"]
    },
    {
        "question": "which one of these song titles is not a Paramore song",
        "correctAnswer": "Karma",
        "choices": ["Now", "Decode", "Karma", "Decoy"]
    },
    {
        "question": "Continue the lyrics: Sometimes, all I think about is you...",
        "correctAnswer": "Late nights in the middle of June",
        "choices": ["Late nights in the middle of June", "I don't wanna be alone", "Can't make you happier now", "Heat waves been fakin' me out"]
    },
]

// Score counter
function scoreCount() {
    timerInterval = setInterval(function() {
        timeLeft--
        // Makes the score apear on page
        scoreEl.textContent = "Score: " + timeLeft;
        // Makes counter stop when there is no more questions to answer
        if(questionNumber >= questions.length) {
            setTimeout(endGame, 1000);
            endScoreEl.textContent = timeLeft;
            return clearInterval(timerInterval);
        // Stops counter if it hits 0
        } else if(timeLeft <= 0){
            setTimeout(endGame, 1000);
            return clearInterval(timerInterval);
        }
    }, 1000)
}


function btnPress(val) {
    // Makes the result appear
    resultEl.style.display = "block";
    // disables the buttons so the user can't select multiple
    for(var i = 0; i < allBtns.length; i++){
        allBtns[i].disabled = true;
        // Lights up the correct answer in a different color
        if(allBtns[i].value === questions[questionNumber].correctAnswer) {
            allBtns[i].style.backgroundColor = "rgb(124, 83, 111)";
            allBtns[i].style.color = "black";
        }
    };
    // if they answer correctly
    if(val === questions[questionNumber].correctAnswer) {
        resultEl.textContent = "Correct !";
        questionNumber++
        setTimeout(nextQuestion, 1000);
        return;
    } else {
        // if their answer is wrong it substracts 10 seconds from the timer/score
        resultEl.textContent = "Wrong !";
        timeLeft = timeLeft - 10;
        questionNumber++
        setTimeout(nextQuestion, 1000);
        return;
    };
};

//Adds the click event on each button
for(var i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener("click", function(event) {
        var val = this.value;
        // turns the answer selected into a different color
        event.target.style.backgroundColor = "pink";
        event.target.style.color = "black";
        btnPress(val);
    })
}

//goes to next question only if more questions are available
function nextQuestion(){   
    if(questionNumber < questions.length) {
        questionEl.textContent = questionNumber+1+". " + questions
        [questionNumber].question;
        // makes the answer from the previous question disapear
        resultEl.style.display = "none";
    for(var i = 0; i < allBtns.length; i++) {
        allBtns[i].textContent = questions[questionNumber].choices[i];
        allBtns[i].value = questions[questionNumber].choices[i];
        allBtns[i].style.backgroundColor = "white";
        // Makes the buttons clickable again
        allBtns[i].disabled = false;
        allBtns[i].style.color = "black";
        }
    }
    };

// End game section elements
var endScoreEl = document.getElementById("endScore");
var endMessageEl = document.getElementById("endMessage");

function endGame() {
    // makes the game and score disapear and the end game message + name input visible
    gameEl.style.display = "none";
    scoreEl.style.display = "none";
    endGameEl.style.display = "flex";
    if(timeLeft <= 0){
        // Changes the end game message if the player ran out of time before finishing
        endMessageEl.textContent = "You ran out of time!"
    }
}

// End game section elements
var submitBtn = document.getElementById("submit");
var userNameInput = document.getElementById("uName");

//user is brought to score board when name is entered
submitBtn.addEventListener("click", function(event) {
    if(userNameInput.value === "") {
        return;
    } else {
        event.preventDefault();
        saveNewScore();
        goToScores();
    }
});

// score tracking elements
var allScoresString = localStorage.getItem("allScores");
// turns scores back into object array
var allScores = JSON.parse(allScoresString) || [];

// Saves new score to all scores
function saveNewScore() {
    // saving the new score to all scores
    allScores.push({
        userName: userNameInput.value,
        score: timeLeft,
      });
    //sorts all scores
      allScores.sort((a, b) => (b.score - a.score));
    // saving the new list list of scores
      localStorage.setItem("allScores", JSON.stringify(allScores));
}

// List of scores on score board elements
var listEl = document.getElementById("scoresList");

function renderScores() {
    for(var i = 0; i < allScores.length; i++) {
        // Creates an list item for every score
        var listItem = document.createElement("li")
        listItem.textContent = allScores[i].score + " " + allScores[i].userName;
        listEl.appendChild(listItem);
    }
}

// Function to go to score board
function goToScores() {
    startEl.style.display = "none";
    gameEl.style.display = "none";
    endGameEl.style.display = "none";
    scoreBoardEl.style.display = "flex";
    scoreBoardBtn.style.display = "none";
    scoreEl.style.display = "none";
    reBtns.style.display = "flex";
    renderScores();
}

//button that leads to score board to left corner
var scoreBoardBtn = document.getElementById("scoreBoardBtn");
scoreBoardBtn.addEventListener("click", function() {
    goToScores();
})

// reset and replay buttons elements
var replayBtn = document.getElementById("replayBtn");
var resetBtn = document.getElementById("resetBtn");

// Reloads the page if they want to play again
replayBtn.addEventListener("click", function() {
    location.reload();
})

// deletes all scores from local storage and hides the score list
resetBtn.addEventListener("click", function() {
    localStorage.clear();
    listEl.style.display = "none";
})