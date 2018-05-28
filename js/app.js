let openCard = [];
let beginCount = 3;
let lockedCard = [];
let count = 0;
const orgCard = document.getElementsByClassName('card');
let myCard;
let stars = document.getElementsByClassName('stars');
let move = document.getElementById('moves');
let seconds = 0;
let timeCounter = document.getElementById('watch');

let list = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];

setTimeout(start_stopwatch, 500);
shuffleTheCard();

document.getElementById('restart').addEventListener('click', function() {
    restart();
});

function restart() {
    count = 0;
    beginCount = 3;
    seconds = 0;
    move.innerHTML = `<span id="moves">0</span>`;
    timeCounter.textContent = 0;

    stars.item(0).classList.remove('hide-star');
    stars.item(1).classList.remove('hide-star');
    myCard = document.getElementsByClassName('card');
    for (let i = 0; i < myCard.length; i++) {
        myCard[i].classList.remove('open', 'show', 'match');
    }
    for (let i = 0; i < lockedCard.length; i++) {
        lockedCard.pop();
    }
    for (let i = 0; i < openCard.length; i++) {
        openCard.pop();
    }
    shuffleTheCard();
}

function shuffleTheCard() {
    setTimeout(startgame, 500);
    shuffle(list);
    for (let i = 0; i < list.length; i++) {
        orgCard[i].innerHTML = "<i></i>";
        orgCard[i].firstChild.classList.add("fa", list[i]);
    }
}

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

myCard = document.getElementsByClassName('card');
for (let i = 0; i < myCard.length; i++) {
    CardOnCilck(i);
}

function CardOnCilck(i) {
    let CardOnClick = i;
    myCard[i].addEventListener('click', function(e) {
        if (openCard.length != 2) {
            if (!(myCard[CardOnClick].classList.contains('open', 'show'))) {
                Check(CardOnClick);
            }
        }
    });
}

function Check(Card) {
    let fClcik = myCard.item(Card);
    myCard[Card].classList.add('open', 'show');
    openCard.push(fClcik);
    if (openCard.length === 2) {
        if (openCard[0].firstElementChild.className === openCard[1].firstElementChild.className) {
            openCard[0].classList.add('match');
            openCard[1].classList.add('match');
            lockedCard.push(openCard[0]);
            lockedCard.push(openCard[1]);
            openCard.pop();
            openCard.pop();
            moves();
        } else {
            openCard[0].classList.add('notmatch');
            openCard[1].classList.add('notmatch');
            moves();
            setTimeout(starttiem, 500);
        }
    }
}

function starttiem() {
    openCard[0].classList.remove('open', 'show', 'notmatch');
    openCard[1].classList.remove('open', 'show', 'notmatch');
    openCard.pop();
    openCard.pop();
}

function moves() {
    count++;
    move.innerHTML = `<span id="moves">${count}</span>`;
    if(count === 12) {
        stars[0].children[0].style.display = 'none';
         beginCount--;
    } else if (count === 24) {
        stars[0].children[1].style.display = 'none';
        beginCount--;
    } else if (lockedCard.length === 16) {
        setTimeout(function win() {
            swal("Good job!", `You Win with ${count} Moves and ${beginCount} Star and you take ${seconds} Seconds to \tfinish the game \n \tif you want to play agen press OK`, "success");
            restart();
        }, 500);
    }
}

function startgame() {
    for (var i = 0; i < myCard.length; i++) {
        myCard[i].classList.remove("open", "show");
    }
}

function start_stopwatch() {
    seconds++;
    timeCounter.textContent = "Seconds: " + seconds;
    setTimeout(start_stopwatch, 1000);
}