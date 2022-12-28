function switchScreens() {
    document.getElementById("game").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("nameInputSection").style.display = "flex";
    if(timeLeft <= 0){
        document.getElementById("endMessage").textContent = "You ran out of time!"
    }
}
// 2. make question objects ✔
// - add question ✔
// - and an array off 4 answers (1 right speled exactly the same and 3 wrong) ✔
// - add right answer ✔
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
]

// 1. make timer ✔
// - have it show up on the page ✔
// - make it stop when all questions are answered ✔
// - subtract time if question answered wrong ✔
// - make stop when it hits 0 ✔
var resultEl = document.querySelector("#result");
var questionNumber = 0;
var scoreEl = document.getElementById("score");
var endScoreEl = document.getElementById("endScore");
var enMessageEl = document.getElementById("endMessage");
var startingScore = 120;
var timeLeft = startingScore;

scoreCount();
nextQuestion();
document.getElementById("nameInputSection").style.display = "none";

function scoreCount() {
    timerInterval = setInterval(function() {
        timeLeft--
        scoreEl.textContent = "Score: " + timeLeft;
        if(questionNumber >= questions.length) {
            setTimeout(switchScreens, 1000);
            endScoreEl.textContent = timeLeft;
            return clearInterval(timerInterval);
        } else if(timeLeft <= 0){
            setTimeout(switchScreens, 1000);
            return clearInterval(timerInterval);
        }
    }, 1000)
}

// 3. connect obects to buttons ✔
// - let user know if answer is correct ✔
// - let user know when wrong + correct answer shown ✔
// - substract time ✔
// - make the answers be in random order ~ ✔
// - go to next question ✔
function btnPress(val, p) {
    document.getElementById("result").style.display = "block";
    for(var i = 0; i < allBtns.length; i++){
        allBtns[i].disabled = true;
        allBtns[i].style.color = "grey";
        if(allBtns[i].value === questions[questionNumber].correctAnswer) {
            allBtns[i].style.backgroundColor = "rgb(124, 83, 111)";
            allBtns[i].style.color = "black";
        }
    };
    if(val === questions[questionNumber].correctAnswer) {
        allBtns[p].style.backgroundColor = "rgb(124, 83, 111)";
        resultEl.textContent = "Correct !";
        questionNumber++
        setTimeout(nextQuestion, 1000);
        return;
    } else {
        allBtns[p].style.backgroundColor = "rgb(116, 174, 179";
        allBtns[p].style.color = "black";
        resultEl.textContent = "Wrong !";
        timeLeft = timeLeft - 10;
        questionNumber++
        setTimeout(nextQuestion, 1000);
        return;
    };
};

function nextQuestion(){   
    if(questionNumber < questions.length) {
        questionEl.textContent = questionNumber+1+". " + questions
        [questionNumber].question;
        document.getElementById("result").style.display = "none";
    for(var i = 0; i < allBtns.length; i++) {
        allBtns[i].textContent = questions[questionNumber].choices[i];
        allBtns[i].value = questions[questionNumber].choices[i];
        allBtns[i].style.backgroundColor = "white";
        allBtns[i].disabled = false;
        allBtns[i].style.color = "black";
        }
    }
    };

// 4. scores are kept
// - open a form for user to write name ✔
// - time remaining becomes score ✔
// - user is brought to score board when name is entered
// - button that leads to score board to left corner