var massMark = 78;
var heightMark = 1.69;

var massJohn = 92;
var heightJohn = 1.95;

var BMIMark = massMark / (heightMark * heightMark) ;
var BMIJohn = massJohn / (heightJohn * heightJohn) ;
console.log(BMIMark);
console.log(BMIJohn);


var markHeigherBMI = BMIMark > BMIJohn;
console.log("is mark's BMI heigher than john's " + markHeigherBMI);
/*************************************************** */


var johnScore = (89 + 120 + 103) / 3;
var mikeScore = (116 + 94 + 123) / 3;
var maryScore = (97 + 134 + 105) / 3;
console.log(johnScore);
console.log(mikeScore);
console.log(maryScore);

if (johnScore > mikeScore && johnScore > maryScore) {
    console.log('john\'s team wins with ' + johnScore + ' points');
} else if (mikeScore > johnScore && mikeScore > maryScore) {
    console.log('mike\'s team wins with ' + mikeScore + ' points');
}else if (maryScore > johnScore && maryScore > mikeScore) {
    console.log('mary\'s team wins with ' + maryScore + ' points');
} else {
    console.log('there is a draw'); 
}

/******************************************************* */

function calculateAge(birthYear) {
    return 2018 - birthYear;
}
var mikeAge = calculateAge(1990);
console.log(mikeAge);

function yearUntilRetirement(year) {
    var age = calculateAge(year);
    var retirement = 65 - age;

    if (retirement > 0) {
        console.log(' retires in ' + retirement + ' years.');
    } else {
        console.log(' is already retired.');  
    }  
}
yearUntilRetirement(1990);

/*************************************** **/

function tipCalculator(bill) {
    var percentage;
    if (bill < 50) {
        percentage = .2;
    } else if (bill >= 50 && bill < 200) {
        percentage = .15;
    } else {
        percentage = .1;
    }
    return percentage * bill;
}

var bills = [124, 48, 268];
var tips = [tipCalculator(bills[0]),
            tipCalculator(bills[1]),
            tipCalculator(bills[2]),
];

var finalValues = [bills[0] + tips[0],
                   bills[1] + tips[1],
                   bills[2] + tips[2]
];

console.log(tips);
console.log(finalValues);

/*************************************************** */
// var john = {
//     fullName: 'john smith',
//     mass: 92,
//     height: 1.95,
//     calcBMI: Function() {
//         this.bmi = this.mass / (this.height * this.height);
//         return this.bmi;
//     }
// }

// var mark = {
//     fullName: 'mark miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI: Function() {
//         this.bmi = this.mass / (this.height * this.height);
//         return this.bmi;
//     }
// }
// john.calcBMI();
// mark.calcBMI();
// console.log(john, mark);
/************************** */

var john = {
    fullName: 'john smith',
    bills: [124, 48, 268, 180, 42],
    calcTips: function() {
        this.tips = [];
        this.finalValues = [];

        for (var i = 0; i < this.bills.length; i++) {

            var bill = this.bills[i];
            var percentage;

            if (bill < 50) {
                percentage = .2;
            } else if (bill >= 50 && bill < 200) {
                percentage = .15;
            } else {
                percentage = .1;
            }
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
    }
}

var mark = {
    fullName: 'mark miller',
    bills: [77, 475, 110, 45],
    calcTips: function() {
        this.tips = [];
        this.finalValues = [];

        for (var i = 0; i < this.bills.length; i++) {

            var bill = this.bills[i];
            var percentage;

            if (bill < 100) {
                percentage = .2;
            } else if (bill >= 100 && bill < 300) {
                percentage = .1;
            } else {
                percentage = .25;
            }
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
    }
}
function calcAverage(tips) {
    var sum = 0;
    for (var i = 0; i < tips.length; i++) {
        sum = sum + tips[i];
    }
    return sum / tips.length;
}


john.calcTips();
mark.calcTips();
console.log(john, mark);

john.average = calcAverage(john.tips);
mark.average = calcAverage(mark.tips);
console.log(john, mark);

if (john.average > mark.average) {
    console.log(john.fullName + '\'s family pays heigher tips, with an average of $' + john.average); 
} else if ( mark.average > john.average) {
    console.log(mark.fullName + '\'s family pays heigher tips, with an average of $' + mark.average);
}
/******************************************* */
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update the round score if the rolled number was not a 1
        if (dice !==1) {
           //add score
           roundScore += dice;
           document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
           //next player
           nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to global score
    scores[activePlayer] += roundScore;

    // update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player won the game
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
         // next player
         nextPlayer();
    }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}









































