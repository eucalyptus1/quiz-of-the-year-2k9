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



startBtn.addEventListener("click", startQuiz);
highScoreBtn.addEventListener("click", highScoreList);



//quiz questions cycle to next when answered

function startQuiz() {
    
    welcome.style.display = "none";
    startBtn.style.display = "none";

    var setTimer = setInterval(function() {
        timer.textContent = secondsLeft;
        secondsLeft-=1;

        if (secondsLeft === 0 || currentQuestion === questionObj.length)
        {
           gameOver();
           clearInterval(setTimer);
           
        }
      }, 1000);

    nextQuestion()
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

    if (choice.textContent === correctAnswer) {
        console.log("correct");

    } else {
        console.log("incorrect");
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
    endMessage.textContent = "Well done.";
    quizBody.appendChild(endMessage);

    var entryBtn = document.createElement("button");
    entryBtn.textContent = "Enter High Score";
    quizBody.appendChild(entryBtn);
    entryBtn.addEventListener("click", highScoreEntry);

    console.log("game over");

}

//high score initial entry form

//high score page

function highScoreEntry() {
    quizBody.innerHTML = "";

    var scoreMessage = document.createElement("p");
    scoreMessage.textContent = "Enter your initials";
    quizBody.appendChild(scoreMessage);

    var highScoreForm = document.createElement("input");
    highScoreBtn.textContent = "Enter High Score";
    quizBody.appendChild(highScoreForm);

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Submit";
    quizBody.appendChild(submitBtn);
    submitBtn.addEventListener("click", scoreSubmit);

}

function scoreSubmit() {


}

function highScoreList() {

}