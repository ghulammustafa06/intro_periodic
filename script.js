document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalElementName = document.getElementById('modal-element-name');
    const modalElementSymbol = document.getElementById('modal-element-symbol');
    const modalElementNumber = document.getElementById('modal-element-number');
    const modalElementMass = document.getElementById('modal-element-mass');
    const modalElementCategory = document.getElementById('modal-element-category');
    let draggedElement = null;

    fetch('elements.json')
        .then(response => response.json())
        .then(elements => {
            elements.forEach(element => {
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

                periodicTable.appendChild(elementDiv);
            });
        });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function showElementInfo(element) {
        modalElementName.textContent = element.name;
        modalElementSymbol.textContent = `Symbol: ${element.symbol}`;
        modalElementNumber.textContent = `Atomic Number: ${element.number}`;
        modalElementMass.textContent = `Atomic Mass: ${element.mass}`;
        modalElementCategory.textContent = `Category: ${element.category.replace('-', ' ')}`;

        modal.style.display = 'block';
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
            const tempColumn = draggedElement.style.gridColumn;
            const tempRow = draggedElement.style.gridRow;

            draggedElement.style.gridColumn = event.target.style.gridColumn;
            draggedElement.style.gridRow = event.target.style.gridRow;

            event.target.style.gridColumn = tempColumn;
            event.target.style.gridRow = tempRow;
        }
    }
});
