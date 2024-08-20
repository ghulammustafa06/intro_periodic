document.addEventListener('DOMContentLoaded', () => {
    const elementInfo = document.getElementById('element-info');
    const elementName = document.getElementById('element-name');
    const elementDetails = document.getElementById('element-details');

    document.querySelectorAll('.element').forEach(element => {
        element.addEventListener('click', () => {
            const symbol = element.getAttribute('data-symbol');
            const name = element.getAttribute('data-name');
            const number = element.getAttribute('data-number');

            elementName.textContent = name;
            elementDetails.textContent = `Symbol: ${symbol}, Atomic Number: ${number}`;

            elementInfo.style.display = 'block';
        });
    });
});
