document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const modal = document.getElementById('modal');
    const closeModalButton = document.querySelector('.close');
    const modalContent = {
        name: document.getElementById('modal-element-name'),
        symbol: document.getElementById('modal-element-symbol'),
        number: document.getElementById('modal-element-number'),
        mass: document.getElementById('modal-element-mass'),
        category: document.getElementById('modal-element-category')
    };
    const scoreElement = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const timerElement = document.getElementById('timer');
    const leaderboardList = document.getElementById('leaderboard-list');
    const playerNameInput = document.getElementById('player-name');
    const saveScoreButton = document.getElementById('save-score');
    let score = 0;
    let quizElement = null;
    let timeLeft = 30;
    let timerInterval;
});

    let quizElement = null;
    let timeLeft = 30; 
    let timerInterval;

    const correctSound = new Audio('correct.mp3');
    const incorrectSound = new Audio('incorrect.mp3');

   
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
        draggedElement = event.target;
        event.target.classList.add('dragging');
    }

    function handleDragEnd(event) {
        event.target.classList.remove('dragging');
        draggedElement = null;
    }

    document.querySelectorAll('.element').forEach(el => {
        el.addEventListener('dragover', handleDragOver);
        el.addEventListener('drop', handleDrop);
    });

    function handleDragOver(event) {
        event.preventDefault();
        event.target.classList.add('over');
    }

    function handleDrop(event) {
        event.preventDefault();
        event.target.classList.remove('over');
        if (draggedElement) {
            swapElementPositions(draggedElement, event.target);
        }
    }

    function swapElementPositions(el1, el2) {
        const tempColumn = el1.style.gridColumn;
        const tempRow = el1.style.gridRow;

        el1.style.gridColumn = el2.style.gridColumn;
        el1.style.gridRow = el2.style.gridRow;

        el2.style.gridColumn = tempColumn;
        el2.style.gridRow = tempRow;
    }
    function checkAnswer(selectedElement) {
        stopTimer();
        if (selectedElement === quizElement) {
            correctSound.play();
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            document.querySelectorAll('.quiz-option').forEach(option => {
                if (option.textContent === quizElement.name) {
                    option.classList.add('correct');
                }
            });
            setTimeout(() => nextQuiz(), 1000);
        } else {
            incorrectSound.play();
            document.querySelectorAll('.quiz-option').forEach(option => {
                if (option.textContent === quizElement.name) {
                    option.classList.add('correct');
                } else {
                    option.classList.add('incorrect');
                }
            });
            setTimeout(() => nextQuiz(), 1000);
        }
    }

    function nextQuiz() {
        quizOptions.innerHTML = '';
        startQuiz(elements);
    }

    function resetTimer() {
        timeLeft = 30;
        timerElement.textContent = `Time Left: ${timeLeft} seconds`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft -= 1;
            timerElement.textContent = `Time Left: ${timeLeft} seconds`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timeIsUp();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function timeIsUp() {
        incorrectSound.play();
        document.querySelectorAll('.quiz-option').forEach(option => {
            if (option.textContent === quizElement.name) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
            }
        });
        setTimeout(() => nextQuiz(), 1000);
    }


function startQuiz(elements) {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    quizElement = randomElement;

    quizQuestion.textContent = `Which element has the atomic number ${randomElement.number}?`;

    const shuffledElements = elements.sort(() => 0.5 - Math.random());
    shuffledElements.slice(0, 4).forEach(element => {
        const option = document.createElement('div');
        option.className = 'quiz-option';
        option.textContent = element.name;
        option.addEventListener('click', () => checkAnswer(element));
        quizOptions.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const scoreElement = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');
    let score = 0;

    fetch('elements.json')
        .then(response => response.json())
        .then(elements => {
            elements.forEach(element => {
                const elementDiv = document.createElement('div');
                elementDiv.className = `element ${element.category} draggable element-group`;
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

                elementDiv.addEventListener('mouseover', () => highlightGroup(element.category));
                elementDiv.addEventListener('mouseout', () => removeGroupHighlight(element.category));

                periodicTable.appendChild(elementDiv);
            });
        });

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
            draggedElement = event.target;
            event.target.classList.add('dragging');
        }
    
        function handleDragEnd(event) {
            event.target.classList.remove('dragging');
            draggedElement = null;
        }
    

    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        document.querySelectorAll('.element').forEach(element => {
            element.style.gridColumn = element.dataset.originalColumn;
            element.style.gridRow = element.dataset.originalRow;
        });
    }
});

