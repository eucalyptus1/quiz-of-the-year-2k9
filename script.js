// welcome screen, hidden when quiz starts
var questionObj = 
    {question: "What's 2 plus 2?",
    answers: ["4", "the force between any two charges is equal to the absolute value of the multiple of the charges divided by four pi times the vacuum permittivity times the distance squared between the two charges", "22", "ice cold refreshments"],
    correct: "4"
    };



var quizBody = document.getElementById("quiz-body");
var startBtn = document.getElementById("start-button");
var welcome = document.getElementById("welcome");


startBtn.addEventListener("click", startQuiz);


//quiz questions cycle to next when answered

function startQuiz() {
    
    welcome.style.display = "none";
    startBtn.style.display = "none";

    var questionEl = questionObj.question;

   var questionThing = document.createElement("p");
    questionThing.textContent = questionEl;
    quizBody.appendChild(questionThing);

    var answer = questionObj.answers;


    for (var i = 0; i < answer.length; i++) {
        var answerEl = answer[i];
        var answerThing = document.createElement("button");
        answerThing.innerText = answerEl;
        quizBody.appendChild(answerThing);
        
    }


    // var answerThing = document.createElement("button");
    // answerThing.innerHTML = questionObj.answers[0];
    // quizBody.appendChild(answerThing);

}



//game over screen

//high score initial entry form

//high score page