const container = document.querySelector('.container');
const bingoNumbers = document.querySelectorAll('.row .number:not(.called)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const gameSelect = document.getElementById('game');
const lastCalled = document.getElementById('lastCalled');
const newGameButton = document.querySelector('.newGameButton');
const jackpotAmountButton = document.querySelector('.jackpotAmountButton');
const gameInputButton = document.querySelector('.gameInputButton');

populateUI();

let gamePrice = +gameAmount.value;
var gameStyle = gameInput.value;

// Save selected price
function setGameData(gamePrice, gameStyle) {
    localStorage.setItem('selectedGamePrice', gamePrice);
    localStorage.setItem('selectedGameStyle', gameStyle);
}

// Update total and count
function updateSelectedCount() {
    const selectedBingoNumbers = document.querySelectorAll('.row .number.selected');
    const calledBingoNumbers = document.querySelectorAll('.row .number.called');

    const selectedNumbersIndex = [...selectedBingoNumbers].map(bingoNumber => [...bingoNumbers].indexOf(bingoNumber));
    const calledNumbersIndex = [...calledBingoNumbers].map(bingoNumber => [...bingoNumbers].indexOf(bingoNumber));

    localStorage.setItem('selectedBingoNumbers', JSON.stringify(selectedNumbersIndex));
    localStorage.setItem('calledBingoNumbers', JSON.stringify(calledNumbersIndex));

    const selectedBingoNumbersCount = selectedBingoNumbers.length;
    const calledBingoNumbersCount = calledBingoNumbers.length;

    count.innerText = selectedBingoNumbersCount + calledBingoNumbersCount;
    jackpotAmount.innerText = "$" + gamePrice;
    gameStyleSpan.innerText = gameStyle;

    setGameData(gameAmount.value, gameInput.value);
}

// Show last called number
function updateLastCalled() {
    const selectedBingoNumbers = document.querySelectorAll('.row .number.selected.last');

    var lastBingoNumberIndex = Number([...selectedBingoNumbers].map(bingoNumber => [...bingoNumbers].indexOf(bingoNumber))) + 1;

    lastCalled.innerText = lastBingoNumberIndex;

}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedBingoNumbers = JSON.parse(localStorage.getItem('selectedBingoNumbers'));

    if (selectedBingoNumbers !== null && selectedBingoNumbers.length > 0) {
        bingoNumbers.forEach((bingoNumber, index) => {
            if (selectedBingoNumbers.indexOf(index) > -1) {
                bingoNumber.classList.add('selected');
                bingoNumber.classList.add('last');
            }
        });
    }

    const calledBingoNumbers = JSON.parse(localStorage.getItem('calledBingoNumbers'));

    if (calledBingoNumbers !== null && calledBingoNumbers.length > 0) {
        bingoNumbers.forEach((bingoNumber, index) => {
            if (calledBingoNumbers.indexOf(index) > -1) {
                bingoNumber.classList.add('called');
            }
        });
    }

    const selectedGamePrice = localStorage.getItem('selectedGamePrice');

    if (selectedGamePrice !== null) {
        gameAmount.value = selectedGamePrice
    }

    const selectedGameStyle = localStorage.getItem('selectedGameStyle');

    if (selectedGameStyle !== null) {
        gameInput.value = selectedGameStyle
    }

    updateLastCalled();
}

// Lock Bingo number after no longer last called
function addCalledClass() {
    var lastToCalled = document.querySelectorAll('.last');

    lastToCalled.forEach(last => {
        last.classList.add('called');
        last.classList.remove('selected');
        last.classList.remove('last');
    })
}

// Bingo number click event
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('number') &&
        !e.target.classList.contains('last') &&
        !e.target.classList.contains('called')
    ) {
        addCalledClass()
        e.target.classList.toggle('selected');
        e.target.classList.add('last');

        updateSelectedCount();
        updateLastCalled();
    } else {
        (
        e.target.classList.contains('selected', 'last')
        ) 
            e.target.classList.remove('selected');
        e.target.classList.remove('last');
        updateSelectedCount();
        lastCalled.innerText = 0
        

    }
    
});

// Clear Bingo board button click
newGameButton.addEventListener('click', e => {
    if (
        confirm("Start a new game? This will clear the board.")) {
        var allCalled = document.querySelectorAll('.number');

        allCalled.forEach(number => 
            number.classList.remove('last','selected','called'));
        }
    updateSelectedCount();
    lastCalled.innerText = 0

});

// Clear Bingo board button click
jackpotAmountButton.addEventListener('click', e => {
    gamePrice = gameAmount.value;
    updateSelectedCount();

});

// Bingo game select event
gameInputButton.addEventListener('click', e => {
    gameStyle = gameInput.value;
    updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();