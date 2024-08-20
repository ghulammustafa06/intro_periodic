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

    const elements = [
        {symbol: 'H', name: 'Hydrogen', number: 1, mass: 1.008, category: 'nonmetal', column: 1, row: 1},
        {symbol: 'He', name: 'Helium', number: 2, mass: 4.003, category: 'noble-gas', column: 18, row: 1},
        {symbol: 'Li', name: 'Lithium', number: 3, mass: 6.941, category: 'alkali-metal', column: 1, row: 2},
        {symbol: 'Be', name: 'Beryllium', number: 4, mass: 9.012, category: 'alkaline-earth-metal', column: 2, row: 2},
        {symbol: 'B', name: 'Boron', number: 5, mass: 10.811, category: 'metalloid', column: 13, row: 2},
        {symbol: 'C', name: 'Carbon', number: 6, mass: 12.011, category: 'nonmetal', column: 14, row: 2},
        {symbol: 'N', name: 'Nitrogen', number: 7, mass: 14.007, category: 'nonmetal', column: 15, row: 2},
        {symbol: 'O', name: 'Oxygen', number: 8, mass: 15.999, category: 'nonmetal', column: 16, row: 2},
        {symbol: 'F', name: 'Fluorine', number: 9, mass: 18.998, category: 'halogen', column: 17, row: 2},
        {symbol: 'Ne', name: 'Neon', number: 10, mass: 20.180, category: 'noble-gas', column: 18, row: 2},
    ];

    elements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.className = `element ${element.category}`;
        elementDiv.style.gridColumn = element.column;
        elementDiv.style.gridRow = element.row;
        elementDiv.innerHTML = `
            <span class="symbol">${element.symbol}</span>
            <span class="number">${element.number}</span>
        `;

        elementDiv.addEventListener('click', () => showElementInfo(element));
        elementDiv.addEventListener('mouseover', () => highlightGroup(element.category));
        elementDiv.addEventListener('mouseout', () => removeHighlightGroup(element.category));

        periodicTable.appendChild(elementDiv);
    });

    search.addEventListener('input', () => {
        const query = search.value.toLowerCase();
        document.querySelectorAll('.element').forEach(el => {
            const name = el.querySelector('.symbol').textContent.toLowerCase();
            const number = el.querySelector('.number').textContent;
            const category = el.classList[1].toLowerCase();
            el.style.display = name.includes(query) || number.includes(query) || category.includes(query) ? 'flex' : 'none';
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
