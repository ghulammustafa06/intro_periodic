
document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const elementInfo = document.getElementById('element-info');
    const elementName = document.getElementById('element-name');
    const elementSymbol = document.getElementById('element-symbol');
    const elementNumber = document.getElementById('element-number');
    const elementMass = document.getElementById('element-mass');
    const elementCategory = document.getElementById('element-category');
    const search = document.getElementById('search');

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
        periodicTable.appendChild(elementDiv);
    });

    search.addEventListener('input', () => {
        const query = search.value.toLowerCase();
        document.querySelectorAll('.element').forEach(el => {
            const name = el.querySelector('.symbol').textContent.toLowerCase();
            const symbol = el.querySelector('.symbol').textContent.toLowerCase();
            el.style.display = name.includes(query) || symbol.includes(query) ? 'flex' : 'none';
        });
    });

    function showElementInfo(element) {
        elementName.textContent = element.name;
        elementSymbol.textContent = `Symbol: ${element.symbol}`;
        elementNumber.textContent = `Atomic Number: ${element.number}`;
        elementMass.textContent = `Atomic Mass: ${element.mass}`;
        elementCategory.textContent = `Category: ${element.category.replace('-', ' ')}`;
        
        elementInfo.style.display = 'block';

        document.querySelectorAll('.element').forEach(el => el.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
    }
});
