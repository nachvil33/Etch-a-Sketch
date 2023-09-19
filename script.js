const container = document.getElementById('container');
const resetButton = document.getElementById('reset-button');
const randomPaintModeButton = document.getElementById('random-paint-mode-button');
const lockColorButton = document.getElementById('lock-color-button');
const colorPaletteButton = document.getElementById('color-palette-button');
const colorPalette = document.getElementById('color-palette');
const gridSizeInput = document.getElementById('grid-size');
const gridSizeValue = document.getElementById('grid-size-value');
const colors = document.querySelectorAll('.color');

let isPainting = false;
let isLocked = false;
let currentColor = 'rgb(0, 0, 0)';
let isPaletteVisible = false;

// Ocultar la paleta de colores al inicio
toggleColorPalette(false);

// Agregar un event listener al documento para cerrar la paleta al hacer clic en cualquier lugar fuera de ella
document.addEventListener('click', (event) => {
    if (!colorPalette.contains(event.target) && event.target !== colorPaletteButton) {
        toggleColorPalette(false);
    }
});

toggleColorPalette(false);

function createGrid(size) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);

        square.addEventListener('mouseenter', () => {
            if (isPainting) {
                colorSquare(square);
            }
        });

        square.addEventListener('click', () => {
            if (isPainting) {
                colorSquare(square);
            } else {
                square.style.backgroundColor = currentColor;
            }
        });
    }

    gridSizeValue.textContent = `${size}x${size}`;
}

function changeBackgroundColor() {
    if (!isLocked) {
        const randomColor = generateRandomColor();
        document.body.style.backgroundColor = randomColor;
    }
}

resetButton.addEventListener('click', () => {
    let newSize = gridSizeInput.value;
    newSize = parseInt(newSize);
    if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
});

randomPaintModeButton.addEventListener('click', () => {
    isPainting = !isPainting;
    randomPaintModeButton.textContent = isPainting ? 'Random Paint Mode (On)' : 'Random Paint Mode (Off)';
    toggleColorPalette(!isPainting);
});

lockColorButton.addEventListener('click', () => {
    isLocked = !isLocked;
    lockColorButton.textContent = isLocked ? 'Unlock Background Color' : 'Lock Background Color';
    // Ocultar la paleta de colores cuando se bloquea el color de fondo
    if (isLocked) {
        toggleColorPalette(false);
    }
});

colorPaletteButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el evento se propague al documento y cierre la paleta
    isPaletteVisible = !isPaletteVisible;
    toggleColorPalette(isPaletteVisible);
});

colors.forEach((color) => {
    color.addEventListener('click', () => {
        if (isLocked) return;
        currentColor = color.style.backgroundColor;
        toggleColorPalette(false);
    });
});

function toggleColorPalette(show) {
    if (show) {
        colorPalette.style.display = 'grid';
    } else {
        colorPalette.style.display = 'none';
    }
}

function colorSquare(square) {
    if (isPainting) {
        if (currentColor === 'black') {
            const randomColor = generateRandomColor();
            square.style.backgroundColor = randomColor;
            square.style.transition = 'none';

            let darkness = parseInt(square.dataset.darkness) || 0;
            if (darkness < 10) {
                darkness += 1;
                square.dataset.darkness = darkness;
                square.style.filter = `brightness(${100 - darkness * 10}%)`;
            }
        } else {
            square.style.backgroundColor = currentColor;
            square.style.transition = 'none';
        }
    }
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

setInterval(changeBackgroundColor, 7000);

createGrid(16);