const container = document.getElementById('container');
const resetButton = document.getElementById('reset-button');

function createGrid(size) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);
        square.addEventListener('mouseenter', colorSquare);
    }
}

function colorSquare(e) {
    const randomColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
    e.target.style.backgroundColor = randomColor;
    e.target.style.transition = 'none';

    // Add 10% black on each interaction, up to a maximum of 10 interactions.
    let darkness = parseInt(e.target.dataset.darkness) || 0;
    if (darkness < 10) {
        darkness += 1;
        e.target.dataset.darkness = darkness;
        e.target.style.filter = `brightness(${100 - darkness * 10}%)`;
    }
}

resetButton.addEventListener('click', () => {
    let newSize = prompt('Enter the number of squares per side (max 100):');
    newSize = parseInt(newSize);
    if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
});

createGrid(16);