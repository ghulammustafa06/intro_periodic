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
    let score = 0;
    let draggedElement = null;
});

    let quizElement = null;

    const correctSound = new Audio('correct.mp3');
    const incorrectSound = new Audio('incorrect.mp3');

    fetch('elements.json')
        .then(response => response.json())
        .then(elements => {
            elements.forEach(element => {
                const elementDiv = createElementDiv(element);
                periodicTable.appendChild(elementDiv);
            });
        });

    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

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

    function initializeTable(elements) {
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
                const elementDiv = createElementDiv(element);
                periodicTable.appendChild(elementDiv);
            });
        });

    function createElementDiv(element) {
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

        return elementDiv;
    }

    function highlightGroup(category) {
        document.querySelectorAll(`.${category}`).forEach(el => el.classList.add('highlight'));
    }

    function removeGroupHighlight(category) {
        document.querySelectorAll(`.${category}`).forEach(el => el.classList.remove('highlight'));
    }

    function handleDragEnd(event) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
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

    function highlightGroup(category) {
        document.querySelectorAll(`.${category}`).forEach(el => el.classList.add('highlight'));
    }

    function removeGroupHighlight(category) {
        document.querySelectorAll(`.${category}`).forEach(el => el.classList.remove('highlight'));
    }

    function handleDragEnd(event) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
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

