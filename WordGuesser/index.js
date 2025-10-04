const chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
let word = words[Math.floor(Math.random() * words.length)];
let guessNumber = 1;
let guess = '';
let won = false;

const notify = (text, time = 1000) => {
    const element = document.getElementById('alert');
    
    if (element.style.display && element.style.display != 'none') return;

    element.textContent = text;
    element.style.display = 'block';

    const timer = setTimeout(() => {
        let opacity = 1;

        const interval = setInterval(() => {
            if (opacity <= 0.1) {
                clearInterval(interval);
                return element.style.display = 'none';
            }

            element.style.opacity = opacity;
            opacity -= opacity * 0.1;
        }, 25);
    }, time);

    element.style.opacity = 1;
};

const retry = () => {
    word = words[Math.floor(Math.random() * words.length)];
    guess = '';
    guessNumber = 1;
    won = false;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const element = document.getElementById(`letter${i + 1}-${j + 1}`);
            element.style.backgroundColor = '';
            element.style.borderColor = '#3A3A3C';
            element.textContent = '';
            element.style.transform = 'scale(1.0)';
            element.style.transitionDuration = '0.1s';
        }
    }

    for (let k = 0; k < chars.length; k++) {
        document.getElementById(chars[k]).style.backgroundColor = '#818384';
    }
};

const guessWord = () => {
    //Checking if the guess values fit the perameter
    if (guess.length != 5) return notify('Not enough letters');
    if (!words.includes(guess)) return notify('Not a valid word');

    //creates a variable as a placeholder for the answer in the form of an array
    const temp = Array.from(word);
    const result = new Array(5);

    if (guess == word) {
        won = true;
    }

    for (let i = 0; i < 5; i++) {
        //sets all the boxes to gray
        // document.getElementById(`letter${guessNumber}-${i + 1}`).style.background = "#3A3A3C";
        // document.getElementById(guess[i]).style.background = "#3a3a3c";
        document.getElementById(`letter${guessNumber}-${i + 1}`).style.borderColor = "#121213";

        //if the letter is in the right spot and is correct, make the box green
        //then, removes that letter from the temporary placeholder "temp"
        if (guess[i] == word[i]) {
            result[i] = 'green';
            temp[i] = '+';
        }
    }
    
    //if the letter is in the left over places in the word BUT is in the wrong place, turn the box yellow
    for (let j = 0; j < 5; j++) {
        if (temp.includes(guess[j]) && word[j] !== guess[j]) {
            temp[word.indexOf(guess[j])] = '-';
            result[j] = 'yellow';
        }
    }

    for (let k = 0; k < 5; k++) {
        const element = document.getElementById(`letter${guessNumber}-${k + 1}`);
        element.style.transitionDuration = '1s';
        element.style.transform = 'scale(1.1)';

        if (result[k] == 'green') {
            element.style.background = '#6ca965';
            document.getElementById(guess[k]).style.background = '#6ca965';
        } else if (result[k] == 'yellow') {
            element.style.background = '#c8b653';
            document.getElementById(guess[k]).style.background = '#c8b653';
        } else {
            element.style.background = '#3a3a3c';
            document.getElementById(guess[k]).style.background = '#3a3a3c';
        }
    }

    guess = '';

    if (won) {
        if (guessNumber == 1) notify('Cheater');
        if (guessNumber == 2) notify('Fantastic');
        if (guessNumber == 3) notify('Great');
        if (guessNumber == 4) notify('Good');
        if (guessNumber == 5) notify('Okay..');
        if (guessNumber == 6) notify('Damn...');
    } else {
        if (guessNumber == 6) setTimeout(() => notify(word.toUpperCase(), 2000), 5000);
    }
    
    guessNumber++;
};

const addLetter = (letter) => {
    if (guess.length === 5 || won || guessNumber == 7) return;

    guess += letter;

    const element = document.getElementById(`letter${guessNumber}-${guess.length}`);
    element.textContent = letter.toUpperCase();
    element.style.transform = 'scale(1.1)';
    element.style.borderColor = '#565758';
};

const removeLetter = () => {
    if (guess.length == 0 || won || guessNumber == 7) return;

    const element = document.getElementById(`letter${guessNumber}-${guess.length}`);
    element.textContent = '';
    element.style.transform = 'scale(1.0)';
    element.style.borderColor = '#3A3A3C';
    guess = guess.slice(0, guess.length - 1);
};

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey) return;
    if (event.key === 'Enter') guessWord();
    if (event.key === 'Backspace') removeLetter();
    if (chars.includes(event.key)) addLetter(event.key);
});