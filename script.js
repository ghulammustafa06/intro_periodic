document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const modal = document.getElementById('modal');
    const modalContent = {
        name: document.getElementById('element-name'),
        symbol: document.getElementById('element-symbol'),
        number: document.getElementById('element-number'),
        mass: document.getElementById('element-mass'),
        category: document.getElementById('element-category')
    };
    const closeModalButton = document.getElementById('close-modal');
    const quizSection = document.getElementById('quiz-section');
    const quizQuestion = document.getElementById('quiz-question');
    const quizAnswer = document.getElementById('quiz-answer');
    const quizFeedback = document.getElementById('quiz-feedback');
    const scoreElement = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');
    const filterSelect = document.getElementById('filter-category');
    const searchInput = document.getElementById('search-element');

    const quizIcon = document.getElementById('quiz-icon');
    const quizOptions = document.getElementById('quiz-options');
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const nextQuestionButton = document.getElementById('next-question');

    const quizQuestions = [
        { question: 'What is the atomic number of Hydrogen?', choices: ['1', '2', '3', '4'], correctAnswer: '1' },
        { question: 'Which element is a noble gas?', choices: ['Oxygen', 'Nitrogen', 'Helium', 'Carbon'], correctAnswer: 'Helium' }
    ];

    let score = 0;
    let currentElement = null;
    let elements = [];
    let currentQuestionIndex = 0;

    quizIcon.addEventListener('click', () => {
        quizOptions.classList.toggle('hidden');
        showQuestion();
    });

    nextQuestionButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            alert('Quiz Completed!');
            quizOptions.classList.add('hidden');
            currentQuestionIndex = 0;
        }
    });

    function showQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        choicesElement.innerHTML = '';

        currentQuestion.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => checkAnswer(choice, currentQuestion.correctAnswer));
            choicesElement.appendChild(button);
        });

        nextQuestionButton.classList.add('hidden');
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }
        nextQuestionButton.classList.remove('hidden');
    }

    fetch('elements.json')
        .then(response => response.json())
        .then(data => {
            elements = data;
            elements.forEach(element => {
                const elementDiv = createElementDiv(element);
                periodicTable.appendChild(elementDiv);
            });
            generateQuiz(elements);
        });

    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    resetButton.addEventListener('click', resetQuiz);
    filterSelect.addEventListener('change', filterElementsByCategory);
    searchInput.addEventListener('input', highlightElementsBySearch);

    function createElementDiv(element) {
        const elementDiv = document.createElement('div');
        elementDiv.className = `element ${element.category} draggable`;
        elementDiv.draggable = true;
        elementDiv.style.gridColumn = element.column;
        elementDiv.style.gridRow = element.row;
        elementDiv.innerHTML = `
            <span class="symbol">${element.symbol}</span>
            <span class="number">${element.number}</span>
        `;
        elementDiv.title = `${element.name} (${element.number})`;

        elementDiv.addEventListener('click', () => showElementInfo(element));
        elementDiv.addEventListener('dragstart', handleDragStart);
        elementDiv.addEventListener('dragend', handleDragEnd);

        return elementDiv;
    }

    function showElementInfo(element) {
        modalContent.name.textContent = element.name;
        modalContent.symbol.textContent = `Symbol: ${element.symbol}`;
        modalContent.number.textContent = `Atomic Number: ${element.number}`;
        modalContent.mass.textContent = `Atomic Mass: ${element.mass}`;
        modalContent.category.textContent = `Category: ${element.category.replace('-', ' ')}`;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function handleDragStart(event) {
        const draggedElement = event.target;
        event.target.classList.add('dragging');
    }

    function handleDragEnd(event) {
        event.target.classList.remove('dragging');
    }

    function generateQuiz(elements) {
        const randomIndex = Math.floor(Math.random() * elements.length);
        currentElement = elements[randomIndex];
        quizQuestion.textContent = `What is the symbol of ${currentElement.name}?`;
    }

    function resetQuiz() {
        score = 0;
        scoreElement.textContent = score;
        generateQuiz(elements);
        quizAnswer.value = '';
        quizFeedback.textContent = '';
    }

    document.getElementById('submit-answer').addEventListener('click', () => {
        const answer = quizAnswer.value.trim();
        if (answer.toLowerCase() === currentElement.symbol.toLowerCase()) {
            quizFeedback.textContent = 'Correct!';
            score++;
        } else {
            quizFeedback.textContent = `Incorrect! The correct answer is ${currentElement.symbol}.`;
        }
        scoreElement.textContent = score;
        generateQuiz(elements);
        quizAnswer.value = '';
    });

    function filterElementsByCategory() {
        const category = filterSelect.value;
        const elementDivs = periodicTable.getElementsByClassName('element');
        Array.from(elementDivs).forEach(div => {
            if (category === 'all' || div.classList.contains(category)) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });
    }

    function highlightElementsBySearch() {
        const query = searchInput.value.toLowerCase();
        const elementDivs = periodicTable.getElementsByClassName('element');
        
        Array.from(elementDivs).forEach(div => {
            const name = div.title.toLowerCase();
            if (name.includes(query)) {
                div.classList.add('highlight');
            } else {
                div.classList.remove('highlight');
            }
        });
    }

    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => {
            const isCorrect = option.dataset.correct === 'true';
            checkAnswer(option, isCorrect);
        });
    });

    document.querySelectorAll('.element').forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', `Element ${element.querySelector('.symbol').textContent}`);
        
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                element.click();
            }
        });
    });

    function checkAnswer(element, correct) {
        if (correct) {
            element.classList.add('correct-answer');
        } else {
            element.classList.add('wrong-answer');
        }
        setTimeout(() => {
            element.classList.remove('correct-answer', 'wrong-answer');
        }, 1000);
    }
});
