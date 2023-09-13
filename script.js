// welcome screen, hidden when quiz starts
let questionObj = [
  {
    question: "Commonly included data types do NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts",
  },

  {
    question: "the condition in an if/else statement is enclosed with ______.",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correct: "curly brackets",
  },

  {
    question: "arrays in javascript can be used to store _____.",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: "all of the above",
  },

  {
    question:
      "string values must be enclosed within ______ when being assigned to letiables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes",
  },

  {
    question:
      "a very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["javascript", "terminal/bash", "for loops", "console.log"],
    correct: "console.log",
  },

  {
    question: "What can you get at the concession stand for $10, $10 or $13?",
    answers: [
      "Luke Wilson",
      "16:9 Anamorphic",
      "Hot, Hot Buttery Popcorn",
      "Battleship Potemkin",
    ],
    correct: "Hot, Hot Buttery Popcorn",
  },

  {
    question: "What Friends alum starred in films with Bruce Willis?",
    answers: ["Joey", "Phoebe", "Ugly Naked Guy", "MATTHEW PERRY"],
    correct: "MATTHEW PERRY",
  },
];

let quizBody = document.getElementById("quiz-body");
let startBtn = document.getElementById("start-button");
let welcome = document.getElementById("welcome");
let timer = document.getElementById("timer");
let highScoreBtn = document.getElementById("high-scores");
let rightWrong = document.getElementById("right-wrong");

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
  let setTimer = setInterval(function () {
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
}

function nextQuestion() {
  let questionEl = questionObj[currentQuestion].question;
  let answerEl = questionObj[currentQuestion].answers;

  let questionThing = document.createElement("p");
  questionThing.textContent = questionEl;
  questionThing.className = "quest";
  quizBody.appendChild(questionThing);

  for (let i = 0; i < answerEl.length; i++) {
    let answer = answerEl[i];
    let answerList = document.createElement("ul");
    let answerThing = document.createElement("li");
    answerThing.className = "ans";
    answerThing.innerText = answer;
    quizBody.appendChild(answerList);
    answerList.appendChild(answerThing);
    answerThing.addEventListener("click", checkAnswer);
  }
}

function checkAnswer(event) {
  event.preventDefault();

  let choice = event.target;
  let correctAnswer = questionObj[currentQuestion].correct;

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
}

//game over screen

function gameOver() {
  quizBody.innerHTML = "";
  rightWrong.textContent = "";
  let endMessage = document.createElement("p");

  if (secondsLeft < 0) {
    endMessage.textContent =
      "Your score was in the minus? How did you manage that?";
    quizBody.appendChild(endMessage);
  } else {
    endMessage.textContent =
      "Well done! Your score is " +
      secondsLeft +
      "! You're ready for computer school.";
    quizBody.appendChild(endMessage);
  }
  let entryBtn = document.createElement("button");
  entryBtn.textContent = "Enter High Score";
  quizBody.appendChild(entryBtn);
  entryBtn.addEventListener("click", highScoreEntry);

  playAgain();
}

function playAgain() {
  playBtn = document.createElement("button");
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

  let scoreMessage = document.createElement("p");
  scoreMessage.textContent = "Enter your initials";
  quizBody.appendChild(scoreMessage);

  let highScoreForm = document.createElement("input");
  highScoreForm.setAttribute("type", "text");
  // highScoreForm.textContent = "";
  quizBody.appendChild(highScoreForm);

  let submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";
  quizBody.appendChild(submitBtn);
  submitBtn.addEventListener("click", function () {
    let initialInput = highScoreForm.value;

    let scoreObj = {
      initial: initialInput,
      score: secondsLeft,
    };

    highScoreArr.push(scoreObj);
    console.log(scoreObj);
    localStorage.setItem("scoreStorage", JSON.stringify(highScoreArr));

    highScoreList();
  });
}

//high score page

function highScoreList() {
  quizBody.innerHTML = "";

  let scoreList = document.createElement("ol");
  quizBody.appendChild(scoreList);

  playAgain();

  let storedScores = JSON.parse(localStorage.getItem("scoreStorage"));

  if (storedScores != null && storedScores.length < 1) {
    console.log("error");
  } else {
    // scoreList.innerHTML="";

    for (let i = 0; i < storedScores.length; i++) {
      let usrInitial = storedScores[i].initial;

      let usrScore = storedScores[i].score;

      let scoreLi = document.createElement("li");

      scoreLi.textContent = usrInitial + ": " + usrScore;

      scoreList.appendChild(scoreLi);
    }
  }
}

//TO DO:
// fix high score overwriting in local storage

// alerts for right/wrong answers

//CSS!!!!
