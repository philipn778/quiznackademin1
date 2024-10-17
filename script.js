const javascriptQuestions = [
    {
        question: "Vad betyder WFO?",
        options: ["Wide Fucking Off", "Wide Freaking On", "Wide Fucking Open", "Alla ovanstående"],
        correct: 2
    },
    {
        question: "Vilket är slang för att gasa?",
        options: ["BRAAP", "FLIPPIN", "PINNING", "WIDING"],
        correct: 0
    },
    {
        question: "Vad är en KTM",
        options: ["En hjälm", "En cross", "Ett styre", "Däckmodell"],
        correct: 1
    },
    {
        question: "Vilken är världens bästa MX akademi?",
        options: ["The MOTO Academy", "KGMX TEAM", "BAKERS FACTORY", "NORBERG RACING ACADEMY"],
        correct: 3
    },
    {
        question: "Vad är en holeshot?",
        options: ["När man tar starten", "När man hoppar ett stort hopp", "När man crashar", "Ingen av ovanstående"],
        correct: 0
    }
];

const htmlQuestions = [
    {
        question: "Vad är min favoriträtt",
        options: ["Tacos", "Biff Rydberg", "Ankleverterrine", "Fläskaladåb"],
        correct: 1
    },
    {
        question: "Vad är består kroppkakor av?",
        options: ["Deg & fläsk", "Deg & lamm", "Deg & nötkött", "Deg & sylt"],
        correct: 0
    },
    {
        question: "Vad äter jag till frukost?",
        options: ["Köttfärsås", "Gröt", "Kyckling & ris", "Kvarg"],
        correct: 0
    },
    {
        question: "Vad är Sous vide?",
        options: ["Ett tillagningssätt", "En sås", "En kokbok", "Ett köksredskap"],
        correct: 0
    },
    {
        question: "Vad är ett bläck?",
        options: ["En stål form", "Ett kvitto", "Slang för dricks", "Inget av alternativen"],
        correct: 0
    },
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');

document.querySelectorAll('.start-quiz').forEach(button => {
    button.addEventListener('click', startQuiz);
});

document.getElementById('next-question').addEventListener('click', nextQuestion);
document.getElementById('restart-quiz').addEventListener('click', restartQuiz);

function startQuiz(event) {
    const subject = event.target.getAttribute('data-subject');
    currentQuestions = subject === "JavaScript" ? shuffleArray(javascriptQuestions) : shuffleArray(htmlQuestions);
    currentQuestionIndex = 0;
    score = 0;
    startPage.classList.remove('active');
    quizPage.classList.add('active');
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionButton);
    });
}

function selectAnswer(index) {
    if (index === currentQuestions[currentQuestionIndex].correct) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizPage.classList.remove('active');
    resultPage.classList.add('active');
    scoreElement.textContent = `${score} av 5`;
}

function restartQuiz() {
    resultPage.classList.remove('active');
    startPage.classList.add('active');
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
