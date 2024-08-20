document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const search = document.getElementById('search');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalElementName = document.getElementById('modal-element-name');
    const modalElementSymbol = document.getElementById('modal-element-symbol');
    const modalElementNumber = document.getElementById('modal-element-number');
    const modalElementMass = document.getElementById('modal-element-mass');
    const modalElementCategory = document.getElementById('modal-element-category');

    fetch('elements.json')
        .then(response => response.json())
        .then(elements => {
            elements.forEach(element => {
                const elementDiv = document.createElement('div');
                elementDiv.className = `element ${element.category}`;
                elementDiv.style.gridColumn = element.column;
                elementDiv.style.gridRow = element.row;
                elementDiv.innerHTML = `
                    <span class="symbol">${element.symbol}</span>
                    <span class="number">${element.number}</span>
                `;
                elementDiv.title = `${element.name} (${element.number})`;

                elementDiv.addEventListener('click', () => showElementInfo(element));
                elementDiv.addEventListener('mouseover', () => highlightGroup(element.category));
                elementDiv.addEventListener('mouseout', () => removeHighlightGroup(element.category));

                periodicTable.appendChild(elementDiv);
            });
        });

    search.addEventListener('input', () => {
        const query = search.value.toLowerCase();
        document.querySelectorAll('.element').forEach(el => {
            const name = el.querySelector('.symbol').textContent.toLowerCase();
            const number = el.querySelector('.number').textContent;
            const mass = el.title.toLowerCase(); 
            const category = el.classList[1].toLowerCase();
            el.style.display = name.includes(query) || number.includes(query) || mass.includes(query) || category.includes(query) ? 'flex' : 'none';
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

    function highlightGroup(category) {
        document.querySelectorAll(`.${category}`).forEach(el => {
            el.classList.add('element-group-hover');
        });
    }

    function removeHighlightGroup(category) {
        document.querySelectorAll(`.${category}`).forEach(el => {
            el.classList.remove('element-group-hover');
        });
    }
});