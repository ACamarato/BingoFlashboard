const container = document.querySelector('.container');
const bingoNumbers = document.querySelectorAll('.row .number:not(.called)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const gameSelect = document.getElementById('game');
const lastCalled = document.getElementById('lastCalled');
const newGameButton = document.querySelector('.newGameButton');

populateUI();

let gamePrice = +gameSelect.value;

// Save selected game index and price
function setGameData(gameIndex, gamePrice) {
    localStorage.setItem('selectedGameIndex', gameIndex);
    localStorage.setItem('selectedGamePrice', gamePrice);
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
   // total.innerText = selectedBingoNumbersCount * gamePrice;

    setGameData(gameSelect.selectedIndex, gameSelect.value);
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
            }
        });
    }

    const selectedGameIndex = localStorage.getItem('selectedGameIndex');

    if (selectedGameIndex !== null) {
        gameSelect.selectedIndex = selectedGameIndex;
    }
}

// Bingo game select event
gameSelect.addEventListener('change', e => {
    gamePrice = +e.target.value;
    setGameData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

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

// Initial count and total set
updateSelectedCount();