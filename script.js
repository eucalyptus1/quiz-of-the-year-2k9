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



startBtn.addEventListener("click", startQuiz);
answerThing.addEventListener("click", nextQuestion);


//quiz questions cycle to next when answered

function startQuiz() {
    
    welcome.style.display = "none";
    startBtn.style.display = "none";

    

    nextQuestion()
};
function nextQuestion() {

    var questionEl = questionObj[0].question;
    var answerEl = questionObj[0].answers;

   var questionThing = document.createElement("p");
    questionThing.textContent = (questionEl);
    quizBody.appendChild(questionThing);



    for (var i = 0; i < answerEl.length; i++) {
        var answer = answerEl[i];
        var answerThing = document.createElement("button");
        answerThing.innerText = answer;
        quizBody.appendChild(answerThing);
        
    }

}



//game over screen

//high score initial entry form

//high score page