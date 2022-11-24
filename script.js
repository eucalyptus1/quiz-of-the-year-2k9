// welcome screen, hidden when quiz starts
let questionObj = [

    {
        question: "Commonly included data types do NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts"
    },

    {
        question: "the condition in an if/else statement is enclosed with ______.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correct: "curly brackets"
    },

    {
        question: "arrays in javascript can be used to store _____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above"
    },

    {
        question: "string values must be enclosed within ______ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correct: "quotes"
    },

    {
        question: "a very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["javascript", "terminal/bash", "for loops", "console.log"],
        correct: "console.log"
    },

    {
        question: "What can you get at the concession stand for $10, $10 or $13?",
        answers: ["Luke Wilson", "16:9 Anamorphic", "Hot, Hot Buttery Popcorn", "Battleship Potemkin"],
        correct: "Hot, Hot Buttery Popcorn"
    },

    {
        question: "What Friends alum starred in films with Bruce Willis?",
        answers: ["Joey", "Phoebe", "Ugly Naked Guy", "MATTHEW PERRY"],
        correct: "MATTHEW PERRY"
    }
];



var quizBody = document.getElementById("quiz-body");
var startBtn = document.getElementById("start-button");
var welcome = document.getElementById("welcome");
var timer = document.getElementById("timer");
var highScoreBtn = document.getElementById("high-scores");

currentQuestion = 0;
secondsLeft = 60;
highScoreArr = [];



startBtn.addEventListener("click", startQuiz);

highScoreBtn.addEventListener("click", function () {

    welcome.style.display = "none";
    startBtn.style.display = "none";
    highScoreBtn.style.display = "none";

    highScoreList();
});



//quiz questions cycle to next when answered

function startTimer() {
    var setTimer = setInterval(function () {
        timer.textContent = secondsLeft;
        secondsLeft -= 1;

        if (secondsLeft <= 0 || currentQuestion === questionObj.length) {
            clearInterval(setTimer);
            gameOver();
        }
    }, 1000);
}

function startQuiz() {

    welcome.style.display = "none";
    startBtn.style.display = "none";
    highScoreBtn.style.display = "none";

    startTimer();
    nextQuestion();
};

function nextQuestion() {

    var questionEl = questionObj[currentQuestion].question;
    var answerEl = questionObj[currentQuestion].answers;

    var questionThing = document.createElement("p");
    questionThing.textContent = (questionEl);
    quizBody.appendChild(questionThing);

    for (var i = 0; i < answerEl.length; i++) {
        var answer = answerEl[i];
        var answerThing = document.createElement("button");
        answerThing.innerText = answer;
        quizBody.appendChild(answerThing);
        answerThing.addEventListener("click", checkAnswer);

    }

}

function checkAnswer(event) {

    event.preventDefault();

    var choice = event.target;
    var correctAnswer = questionObj[currentQuestion].correct;

    var rightWrong = document.createElement("p");
    quizBody.appendChild(rightWrong);


    if (choice.textContent === correctAnswer) {
        rightWrong.textContent = "Correcto-mundo!";

    } else {
        secondsLeft -= 10;
        rightWrong.textContent = "Incorrect!";
    }

    if (currentQuestion < questionObj.length) {
        quizBody.innerHTML = "";
        currentQuestion++;
        nextQuestion();

    } else {
        gameOver();
    }

};

//game over screen

function gameOver() {
    quizBody.innerHTML = "";

    var endMessage = document.createElement("p");
    endMessage.textContent = "Well done! Your score is " + secondsLeft + "!";
    quizBody.appendChild(endMessage);

    var entryBtn = document.createElement("button");
    entryBtn.textContent = "Enter High Score";
    quizBody.appendChild(entryBtn);
    entryBtn.addEventListener("click", highScoreEntry);

    playAgain();

}

function playAgain() {

    playBtn = document.createElement('button');
    playBtn.textContent = "Play Again";
    quizBody.appendChild(playBtn);
    playBtn.addEventListener("click", function () {

        currentQuestion = 0;
        secondsLeft = 60;
        quizBody.innerHTML = "";

        startQuiz();

    });

}


//high score initial entry form



function highScoreEntry() {




    quizBody.innerHTML = "";

    var scoreMessage = document.createElement("p");
    scoreMessage.textContent = "Enter your initials";
    quizBody.appendChild(scoreMessage);

    var highScoreForm = document.createElement("input");
    highScoreForm.setAttribute("type", "text");
    // highScoreForm.textContent = "";
    quizBody.appendChild(highScoreForm);

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Submit";
    quizBody.appendChild(submitBtn);
    submitBtn.addEventListener("click", function () {

        var initialInput = highScoreForm.value;

        var scoreObj = {
            initial: initialInput,
            score: secondsLeft
        }

        highScoreArr.push(scoreObj);
        console.log(scoreObj);
        localStorage.setItem('scoreStorage', JSON.stringify(highScoreArr));

        highScoreList();
    });


}

//high score page

function highScoreList() {

    quizBody.innerHTML = "";

    var scoreList = document.createElement("ol");
    quizBody.appendChild(scoreList);

    playAgain();

    var storedScores = JSON.parse(localStorage.getItem('scoreStorage'));

    if (storedScores != null && storedScores.length < 1) {

        console.log("error");
    } else {
        // scoreList.innerHTML="";

        for (var i = 0; i < storedScores.length; i++) {

            var usrInitial = (storedScores[i].initial);

            var usrScore = (storedScores[i].score);

            var scoreLi = document.createElement("li");

            scoreLi.textContent = usrInitial + ": " + usrScore;

            scoreList.appendChild(scoreLi);

        }

    }

};