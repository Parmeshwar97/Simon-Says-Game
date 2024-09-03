let gameSeq = [];
let userSeq = [];
let started = false;
let level=0;
let h2 = document.querySelector('h2');
let highScore = 0;
let btns = ["orange", "yellowgreen", "violet", "skyblue"];

document.addEventListener('keypress', function (e) {
    if (started == false) {
        started = true;
        console.log("Game Stated!");
        
        levelUp();
    }
})

function flashBtn(btn) {
    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove('flash'), 500);
}
function flashUser(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 200);
}
function overs(btn) {
  btn.classList.add("over");
  setTimeout(() => btn.classList.remove("over"), 500);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let ranCol = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranCol}`);

    gameSeq.push(ranCol);
    console.log(gameSeq);
    
    flashBtn(ranBtn);
}

function hScore(hs) {
    highScore = hs;
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (highScore < level) {
            highScore = level;
            hScore(highScore);
        }
        h2.innerHTML = ` Game Over<br>High Score : <i>${highScore}</i><br>Your Score Was :<i> ${level}</i><br>Press any key to Start Game!`;
        let over = document.querySelector('body');
        overs(over); 
        reset();
    }
}

function btnPress() {
    let btn = this;
    flashUser(btn);
    userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll('.btn');
for (btn of allBtn) {
    btn.addEventListener('click', btnPress);
}
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}