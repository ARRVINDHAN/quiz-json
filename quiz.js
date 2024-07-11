const questions = [
    {
        "question": "Which company is the world's largest by market capitalization?",
        "type": "radio",
        "options": ["Apple", "Amazon", "Microsoft", "Alphabet"],
        "answer": "Apple"
    },
    {
        "question": "Which of these CEOs is known for leading Tesla?",
        "type": "checkbox",
        "options": ["Jeff Bezos", "Elon Musk", "Satya Nadella", "Tim Cook"],
        "answer": ["Elon Musk"]
    },
    {
        "question": "Which business magnate is famous for founding Microsoft?",
        "type": "dropdown",
        "options": ["Jeff Bezos", "Elon Musk", "Bill Gates", "Warren Buffett"],
        "answer": "Bill Gates"
    },
    {
        "question": "Who is the current CEO of Amazon?",
        "type": "text",
        "answer": "Andy Jassy"
    },
    {
        "question": "Which tech company recently acquired LinkedIn?",
        "type": "radio",
        "options": ["Apple", "Microsoft", "Google", "Facebook"],
        "answer": "Microsoft"
    },
    {
        "question": "Which of these companies is known for its search engine?",
        "type": "checkbox",
        "options": ["Amazon", "Google", "Facebook", "Alphabet"],
        "answer": ["Google", "Alphabet"]
    },
    {
        "question": "Who is the CEO of Facebook (Meta)?",
        "type": "dropdown",
        "options": ["Mark Zuckerberg", "Satya Nadella", "Tim Cook", "Sundar Pichai"],
        "answer": "Mark Zuckerberg"
    },
    {
        "question": "Which company is famous for its cloud computing platform, AWS?",
        "type": "text",
        "answer": "Amazon"
    },
    {
        "question": "Which company recently became the first trillion-dollar company by market cap?",
        "type": "radio",
        "options": ["Amazon", "Microsoft", "Apple", "Google"],
        "answer": "Apple"
    },
    {
        "question": "Which of these CEOs is associated with Google's parent company, Alphabet?",
        "type": "checkbox",
        "options": ["Tim Cook", "Sundar Pichai", "Larry Page", "Jeff Bezos"],
        "answer": ["Sundar Pichai", "Larry Page"]
    },
    {
        "question": "Who is the current CEO of Tesla?",
        "type": "dropdown",
        "options": ["Elon Musk", "Tim Cook", "Satya Nadella", "Mark Zuckerberg"],
        "answer": "Elon Musk"
    },
    {
        "question": "Which company is known for its online retail platform and AWS?",
        "type": "text",
        "answer": "Amazon"
    },
    {
        "question": "Which tech company is famous for its iPhone and Mac products?",
        "type": "radio",
        "options": ["Microsoft", "Apple", "Google", "Facebook"],
        "answer": "Apple"
    },
    {
        "question": "Which CEO famously transformed Microsoft's business model towards cloud computing?",
        "type": "dropdown",
        "options": ["Elon Musk", "Tim Cook", "Satya Nadella", "Mark Zuckerberg"],
        "answer": "Satya Nadella"
    },
    {
        "question": "Which company is known for its Android operating system?",
        "type": "text",
        "answer": "Google"
    },
    {
        "question": "Who founded SpaceX, the private aerospace manufacturer and space transport services company?",
        "type": "checkbox",
        "options": ["Jeff Bezos", "Elon Musk", "Richard Branson", "Mark Zuckerberg"],
        "answer": ["Elon Musk"]
    },
    {
        "question": "Which company's headquarters is famously located at 1 Infinite Loop, Cupertino, California?",
        "type": "dropdown",
        "options": ["Apple", "Amazon", "Microsoft", "Google"],
        "answer": "Apple"
    }
];

let currentPage = 1;
const questionsPerPage = 5;
let userAnswers = {};

function renderQuestions() {
    const start = (currentPage - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    const questionsToDisplay = questions.slice(start, end);

    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    questionsToDisplay.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionLabel = document.createElement('label');
        questionLabel.innerText = q.question;
        questionDiv.appendChild(questionLabel);

        const answerContainer = document.createElement('div');
        answerContainer.className = 'answer-container';

        if (q.type === 'radio') {
            q.options.forEach(option => {
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question-${start + index}`;
                radioInput.value = option;

                const optionLabel = document.createElement('label');
                optionLabel.innerText = option;
                optionLabel.style.marginLeft = '5px';

                if (userAnswers[`question-${start + index}`] === option) {
                    radioInput.checked = true;
                }

                const answerDiv = document.createElement('div');
                answerDiv.appendChild(radioInput);
                answerDiv.appendChild(optionLabel);
                answerContainer.appendChild(answerDiv);
            });
        } else if (q.type === 'checkbox') {
            q.options.forEach(option => {
                const checkboxInput = document.createElement('input');
                checkboxInput.type = 'checkbox';
                checkboxInput.name = `question-${start + index}`;
                checkboxInput.value = option;

                const optionLabel = document.createElement('label');
                optionLabel.innerText = option;
                optionLabel.style.marginLeft = '5px';

                if (userAnswers[`question-${start + index}`]?.includes(option)) {
                    checkboxInput.checked = true;
                }

                const answerDiv = document.createElement('div');
                answerDiv.appendChild(checkboxInput);
                answerDiv.appendChild(optionLabel);
                answerContainer.appendChild(answerDiv);
            });
        } else if (q.type === 'dropdown') {
            const selectInput = document.createElement('select');
            selectInput.name = `question-${start + index}`;

            q.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.innerText = option;

                if (userAnswers[`question-${start + index}`] === option) {
                    optionElement.selected = true;
                }

                selectInput.appendChild(optionElement);
            });

            answerContainer.appendChild(selectInput);
        } else if (q.type === 'text') {
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.name = `question-${start + index}`;
            textInput.value = userAnswers[`question-${start + index}`] || '';

            answerContainer.appendChild(textInput);
        }

        questionDiv.appendChild(answerContainer);
        questionsContainer.appendChild(questionDiv);
    });

    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (currentPage === 1) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (currentPage === Math.ceil(questions.length / questionsPerPage)) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderQuestions();
    }
}

function nextPage() {
    if (currentPage < Math.ceil(questions.length / questionsPerPage)) {
        currentPage++;
        renderQuestions();
    }
}

function saveAnswers() {
    const start = (currentPage - 1) * questionsPerPage;
    const questionsToDisplay = questions.slice(start, start + questionsPerPage);

    questionsToDisplay.forEach((q, index) => {
        if (q.type === 'radio') {
            const selectedOption = document.querySelector(`input[name="question-${start + index}"]:checked`);
            if (selectedOption) {
                userAnswers[`question-${start + index}`] = selectedOption.value;
            }
        } else if (q.type === 'checkbox') {
            const selectedOptions = Array.from(document.querySelectorAll(`input[name="question-${start + index}"]:checked`)).map(input => input.value);
            userAnswers[`question-${start + index}`] = selectedOptions;
        } else if (q.type === 'dropdown') {
            const selectedOption = document.querySelector(`select[name="question-${start + index}"]`).value;
            userAnswers[`question-${start + index}`] = selectedOption;
        } else if (q.type === 'text') {
            const textInput = document.querySelector(`input[name="question-${start + index}"]`).value.trim();
            userAnswers[`question-${start + index}`] = textInput;
        }
    });
}

document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    saveAnswers();

    let score = 0;

    questions.forEach((q, index) => {
        if (q.type === 'radio') {
            if (userAnswers[`question-${index}`] === q.answer) {
                score++;
            }
        } else if (q.type === 'checkbox') {
            const userAnswer = userAnswers[`question-${index}`] || [];
            if (JSON.stringify(userAnswer.sort()) === JSON.stringify(q.answer.sort())) {
                score++;
            }
        } else if (q.type === 'dropdown') {
            if (userAnswers[`question-${index}`] === q.answer) {
                score++;
            }
        } else if (q.type === 'text') {
            if ((userAnswers[`question-${index}`] || '').trim().toLowerCase() === q.answer.toLowerCase()) {
                score++;
            }
        }
    });

    alert(`Your score is ${score} out of ${questions.length}`);
});

let timerDuration = 300;

function startTimer() {
    const timerElement = document.getElementById('timer');

    const interval = setInterval(() => {
        if (timerDuration <= 0) {
            clearInterval(interval);
            document.getElementById('quiz-form').submit();
        } else {
            const minutes = Math.floor(timerDuration / 60);
            const seconds = timerDuration % 60;
            timerElement.innerText = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timerDuration--;
        }
    }, 1000);
}

window.onload = () => {
    startTimer();
    renderQuestions();
};
