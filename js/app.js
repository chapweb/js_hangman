// document.addEventListener('DOMContentLoaded', () => {

    // Press "Start Game" button to remove overlay <div>
    const overlayDiv = document.querySelector('#overlay');
    overlayDiv.addEventListener('click', (e) => {
        if (e.target.className === 'btn__reset') {
            overlayDiv.style.display = 'none';
        }
    });

    // list of possible phrase for game
    const phrases = ['I love you', 'Never say never', 'Hashtag', 'Go For Broke', 'Swinging For the Fences', 'On the Same Page', 'sunday'];
    const ul = document.querySelector('#phrase ul');
    const qwerty = document.querySelector('#qwerty')
    const scoreBoardImg = document.querySelectorAll('#scoreboard img')
    let winScore = 0;
    let missedScore = 0;

    //     Return a random phrase in array e.g. ["t", "u", "e", "s", "d", "a", "y"]
    const getRandomPhraseAsArray = (array) => {
        let randomNum = Math.round(Math.random() * (array["length"] - 1));
        let randomWord = array[randomNum].toUpperCase(); //e.g. 'TUESDAY'
        let phraseArr = [];
        for (let i = 0; i < randomWord.length; i++) {
            phraseArr.push(randomWord[i]);
        }
        return phraseArr;
    };

    const addPhrasetoDisplay = (array) => {
        for (let i = 0; i < array.length; i++) {
            let li = document.createElement('li');
            li.textContent = array[i];
            if (array[i] == " ") {
                li.className = 'space';
            } else {
                li.className = 'letter';
            }
            ul.appendChild(li);
        }
    }

    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);

//================================================================================



const checkLetter = (letter) => {
    const list = ul.children;
    let isCorrect = false;
    for (li of list) {
        if (li.className === 'letter' && li.textContent === letter.toUpperCase() ) {
            li.className = 'show';
            isCorrect = true;
        }
    }
    if (isCorrect) {return letter;}
};

const checkWin = () => {
    winScore += 1;
    const list = ul.children;
    let isLetter = false
    for (li of list) {
        li.className === 'letter' ? isLetter = true : isLetter = false;
    }
    if (!isLetter) {
        resetGame('win')
    }
};

const checkLose = () => {
    scoreBoardImg[missedScore].src = 'images/lostHeart.png';
    missedScore += 1;
    if (missedScore === scoreBoardImg.length) {
        resetGame('lose')
    }
}
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;
        let letterFound = checkLetter(e.target.textContent);
        letterFound ? checkWin() : checkLose()
    }
});

const resetGame = (winLose) => {
    overlayDiv.className = winLose;
    overlayDiv.style.display = '';
    while (ul.childElementCount > 0) {
        ul.removeChild(ul.children[0])
    }
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);
    missedScore = 0;
    let buttons = qwerty.querySelectorAll('button');
    buttons.forEach(button => {
        button.className = '';
        button.disabled = false;
    });
    scoreBoardImg.forEach(img => {
        img.src = 'images/liveHeart.png'
    })
};
//================================================================================
// });
