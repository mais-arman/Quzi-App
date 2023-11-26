const questions = [
    {
        question: "What's the output?\n\
        +true;\n\
        !'Lydia';",
    
        answers: [
            { text: "A: false and NaN", correct: false },
            { text: "B: false and false", correct: false },
            { text: "C: 1 and false", correct: true },
            { text: "D: true and false", correct: false },
        ]
    },
    
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text: "A: The <body> section", correct: false },
            { text: "B: The <body> and <head> section both correct", correct: true },
            { text: "C: The <head> section", correct: false },
            { text: "D: No one of above", correct: false },
        ]
    },

    {
        question: "The external JavaScript file must contain the <script> tag.",
        answers: [
            { text: "A: False", correct: true},
            { text: "B: True", correct: false },
    
        ]
    },

    {
        question: "How can you add a comment in JavaScript?",
        answers: [
            { text: "A: 'This is comment'", correct: false },
            { text: "B: //This is comment", correct: true },
            { text: "C: !--This is a comment--", correct: false },
            { text: "D: No one of above", correct: false },
        ]
    },

    {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: [
        { text: "A: rnd(7.25)", correct: false },
        { text: "B: Math.rnd(7.25)", correct: false},
        { text: "C: round(7.25)", correct: false },
        { text: "D: Math.round(7.25)", correct: true },
    ]
},

];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}   


function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNumber=currentQuestionIndex+1;
    questionElement.innerHTML=questionNumber+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
}


function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();