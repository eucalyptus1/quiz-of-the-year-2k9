// welcome screen, hidden when quiz starts
let questionObj = [
    {question: "What's 2 plus 2?",
    answers: ["4", "the force between any two charges is equal to the absolute value of the multiple of the charges divided by four pi times the vacuum permittivity times the distance squared between the two charges", "22", "ice cold refreshments"],
    correct: "4"
    },

    {question:"What is a placeholder?",
    answers: ["thing", "stuff", "i dunno", "go away"],
    correct: "stuff"
    },

    {question: "Why is the sky?",
    answers: ["ruh-roh", "zoinks! like, it's the creepy caretaker!", "jinkies", "donphan"],
    correct: "donphan"
    },

    {question: "When i was a young warthog",
    answers: ["when he was a young warthog", "very", "nice", "thanks"],
    correct : "when he was a young warthog"
    },

    {question: "so i says to mabel i says",
    answers: ["purple drapes", "milpool", "junji ito", "enrico matassa"],
    correct: "milpool"
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
highScoreBtn.addEventListener("click", highScoreList);



//quiz questions cycle to next when answered

function startTimer() {
var setTimer = setInterval(function() {
    timer.textContent = secondsLeft;
    secondsLeft-=1;

    if (secondsLeft <= 0 || currentQuestion === questionObj.length)
    {
       clearInterval(setTimer);
       gameOver();
    }
  }, 1000);
}

function startQuiz() {
    
    welcome.style.display = "none";
    startBtn.style.display = "none";

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
        secondsLeft -=10;
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

    //add play again button!
    var playAgain = document.createElement('button');
    playAgain.textContent = "Play Again";
    quizBody.appendChild(playAgain);
    playAgain.addEventListener("click", function() {

        currentQuestion = 0;
        secondsLeft = 60;
        quizBody.innerHTML = "";
        
        startQuiz();

    });

    // if (playAgain) {
    //     clearInterval(setTimer);
    //     quizBody.innerHTML = "";
        
    //     startQuiz();
    // }

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
    submitBtn.addEventListener("click", function() {

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

    var storedScores = JSON.parse(localStorage.getItem('scoreStorage'));

    if (storedScores != null && storedScores.length < 1) {

        console.log("error");
    } else {
        // scoreList.innerHTML="";

    for (var i = 0; i < storedScores.length; i++) {
        
        var usrInitial =  (storedScores[i].initial);

        var usrScore = (storedScores[i].score);

        var scoreLi = document.createElement("li");

        scoreLi.textContent = usrInitial + ": " + usrScore;

        scoreList.appendChild(scoreLi);
       
    }

    }

};