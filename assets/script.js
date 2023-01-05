// Making the different sections not display until needed
var endGameEl = document.getElementById("endGame")
endGameEl.style.display = "none";
var gameEl = document.getElementById("game");
gameEl.style.display = "none";
var scoreBoardEl = document.getElementById("scoreBoard")
scoreBoardEl.style.display = "none";
var startEl = document.getElementById("start");
startEl.style.display = "flex";

// 2. make question objects ✔
// - add question ✔
// - add right answer ✔
// - and an array off 4 answers (1 right speled exactly the same and 3 wrong) ✔
var questionEl = document.querySelector("#question");
var allBtns = document.getElementsByClassName("answers");

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
    // {
    //     "question": "What band is Brendon Urie the lead singer off?",
    //     "correctAnswer": "Panic! at the Disco",
    //     "choices": ["Fall Out Boy", "My Chemical Romance", "Green Day", "Panic! at the Disco"]
    // },
    // {
    //     "question": "Continue the lyrics: Oh, there ain't no rest for the wicked...",
    //     "correctAnswer": "Money don't grow on trees",
    //     "choices": ["I know I can't slow down", "Money don't grow on trees", "I got bills to pay", "Because I know we're all the same"]
    // },
    // {
    //     "question": "What german band is known for their song 'Stolen Dance'?",
    //     "correctAnswer": "Milky Chance",
    //     "choices": ["Milky Chance", "Die Ärzte", "Cinema Bizarre", "Tokio Hotel"]
    // },
    // {
    //     "question": "which one of the following titles IS a Twenty One Pilots song?",
    //     "correctAnswer": "Forest",
    //     "choices": ["Ocean", "Car", "Forest", "Headache"]
    // },
    // {
    //     "question": "What is Lady Gaga's birth name?",
    //     "correctAnswer": "Stefani Germanotta",
    //     "choices": ["Helena Germagnotti", "Stefani Germanotta", "Stella Germana", "Luana Magnotti"]
    // },
    // {
    //     "question": "Wich one of these is actually a Band?",
    //     "correctAnswer": "Arctic Monkeys",
    //     "choices": ["Hot Gorillas", "Atlantic Leopards", "Sad Foxes", "Arctic Monkeys"]
    // },
    // {
    //     "question": "which one of these song titles is not a Paramore song",
    //     "correctAnswer": "Karma",
    //     "choices": ["Now", "Decode", "Karma", "Decoy"]
    // },
    // {
    //     "question": "Continue the lyrics: Sometimes, all I think about is you...",
    //     "correctAnswer": "Late nights in the middle of June",
    //     "choices": ["Late nights in the middle of June", "I don't wanna be alone", "Can't make you happier now", "Heat waves been fakin' me out"]
    // },
]

var resultEl = document.querySelector("#result");
var scoreEl = document.getElementById("scoreCount");
var endScoreEl = document.getElementById("endScore");
var endMessageEl = document.getElementById("endMessage");
// To keep track of what question the user is at 
var questionNumber = 0;
var timeLeft = 120;

// 0. Start game when button is pressed

startBtn.addEventListener("click", startGame);

function startGame() {
    startEl.style.display = "none";
    gameEl.style.display ="flex";
    scoreEl.textContent = "Score: " + timeLeft;
    scoreCount();
    nextQuestion();
}

// 1. make timer ✔
// - have it show up on the page ✔
// - make it stop when all questions are answered ✔
// - subtract time if question answered wrong ✔
// - make stop when it hits 0 ✔
function scoreCount() {
    timerInterval = setInterval(function() {
        timeLeft--
        scoreEl.textContent = "Score: " + timeLeft;
        if(questionNumber >= questions.length) {
            setTimeout(endGame, 1000);
            endScoreEl.textContent = timeLeft;
            return clearInterval(timerInterval);
        } else if(timeLeft <= 0){
            setTimeout(endGame, 1000);
            return clearInterval(timerInterval);
        }
    }, 1000)
}

// 3. connect objects to buttons ✔
// - let user know if answer is correct ✔
// - let user know when wrong + correct answer shown ✔

for(var i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener("click", function(event) {
        var val = this.value;
        event.target.style.backgroundColor = "pink";
        event.target.style.color = "black";
        btnPress(val);
    })
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

// - go to next question only if more questions are available ✔
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

// 4. scores are kept
// - open a form for user to write name ✔
// - time remaining becomes score ✔
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
// - user is brought to score board when name is entered
// - button that leads to score board to left corner
var allScoresString = localStorage.getItem("allScores");
var allScores = JSON.parse(allScoresString) || [];


function saveNewScore() {
    // saving the new score to all scores
    allScores.push({
        userName: userNameInput.value,
        score: timeLeft,
      });
      allScores.sort((a, b) => (b.score - a.score));
    // saving the new list list of scores
      localStorage.setItem("allScores", JSON.stringify(allScores));
}

console.log(JSON.parse(localStorage.getItem("allScores")));
var listEl = document.getElementById("scoresList");

function renderScores() {
    for(var i = 0; i < allScores.length; i++) {
        var listItem = document.createElement("li")
        listItem.textContent = allScores[i].userName + ": " + allScores[i].score;
        listEl.appendChild(listItem);
        console.log(allScores[i].userName + ": " + allScores[i].score);
    }
}

function goToScores() {
    startEl.style.display = "none";
    gameEl.style.display = "none";
    endGameEl.style.display = "none";
    scoreBoardEl.style.display = "flex";
    document.getElementById("scoreBoardBtn").style.display = "none";
    renderScores();
}

var submitBtn = document.getElementById("submit");
var userNameInput = document.getElementById("uName");

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    saveNewScore();
    goToScores();
  });

  