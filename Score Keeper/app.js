const p1button = document.querySelector('#p1button');
const p2button = document.querySelector('#p2button');
const p2Display = document.querySelector('#p2Display');
const resetButton = document.querySelector('#reset')
const p1Display = document.querySelector('#p1Display');
const winningScoreSelect = document.querySelector('#playupto')
let p1score = 0;
let p2score = 0;
let winningScore = 5;

let isGAmeOver = false;
p1button.addEventListener('click', function () {
    if (!isGAmeOver) {
        p1score += 1;
        if (p1score === winningScore) {
            isGAmeOver = true;
            p1Display.classList.add('winner');
            p2Display.classList.add('loser');
            p1button.disabled = true;
            p2button.disabled = true;
        }

        p1Display.textContent = p1score;

    }


}


)


p2button.addEventListener('click', function () {
    if (!isGAmeOver) {
        p2score += 1;
        if (p2score === winningScore) {
            isGAmeOver = true;
            p2Display.classList.add('winner');
            p1Display.classList.add('loser');
            p1button.disabled = true;
            p2button.disabled = true;
        }
        p2Display.textContent = p2score;

    }


}


)
resetButton.addEventListener('click', reset)

function reset() {
    isGAmeOver = false;
    p1score = 0;
    p2score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    p1Display.classList.remove('winner', 'loser');
    p2Display.classList.remove('winner', 'loser');
    p1button.disabled = false;
    p2button.disabled = false;
}

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value)
    reset();
})