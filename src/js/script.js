
//Variables 
//stores variable for clearing setInterval timer
let stopRunInterval1
let stopRunInterval2
//Stores flag that controls iterator
//combine with object 
let intervalFlag = false

//Stores start button flag
let startBtn = $('#start')

//Stores textbox at top of the screen
let textDisplay = $('header .card-title')
let display = $('header .card')

//Correspond with simon color pieces
let greenPiece = $('#green')
let redPiece = $('#red')
let yellowPiece = $('#yellow')
let bluePiece = $('#blue')

//Tracks light pattern
let lightOnCounter = 0
let lightOffCounter = 0

//Array of selected colors
let computerSequence = []
let playerSequence = []


//Objects
//Keeps track of what round you're on
let levelTrack = {
    score: 0,
    isPlayerTurn: false,
    changeScore: function () {
        this.score++
        $('.scoreKeeper p').text(this.score)
    },
    changeTurn: function () {
        let turnFlag = $('.turnFlag p').eq(0)
        this.isPlayerTurn ? turnFlag.text('Its your turn! Good Luck') : turnFlag.text('Its the computers turn')
    },
    toggleTurn: function () {
        this.isPlayerTurn = this.isPlayerTurn ? false : true
    }
}

//Functions

//Generate random number and push color that matches number to computers new sequence
let pushRandomColor = (arr, num) => {
    if (!levelTrack.isPlayerTurn) {
        num = Math.floor(Math.random() * 4) + 1
    }
    let color;
    switch (num) {
        case 1:
            color = greenPiece;
            break;
        case 2:
            color = redPiece;
            break;
        case 3:
            color = yellowPiece
            break;
        case 4:
            color = bluePiece;
            break;
    }
    arr.push(color)
}

//Return false if arrays dont match and true if they do
let compareAnswers = () => {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== computerSequence[i]) {
            return false
        }
    }
    return true
}

//Controls delay between items 
let runLightSequence = () => {
    stopRunInterval1 = setInterval(toggleGlowEffectSequence, 1000)
    //Might be able to remove stopRunInterval2
    stopRunInterval2 = setTimeout(() => stopRunInterval2 = setInterval(toggleGlowEffectSequence, 1000), 500)
}

//Turns on the light to show activated
let toggleGlowEffectSequence = () => {
    if (computerSequence.length > lightOnCounter) {
        computerSequence[lightOnCounter].toggleClass('glow')

        if (intervalFlag) { lightOnCounter++; intervalFlag = false } else { intervalFlag = true }
    } else {
        lightOnCounter = 0
        clearInterval(stopRunInterval1)
        clearInterval(stopRunInterval2)
        levelTrack.toggleTurn()
        levelTrack.changeTurn()
    }
}

//Function check if player move on or not
let verifyPlayerInput = () => {
    if (compareAnswers()) {
        checkSequenceLength()
    } else {
        swal({
            title: "You Failed",
            text: "Try again next time",
            Icon: "warning",
            button: "Okay"
        })
        
    }
}

//Check if answers are the same length so that we can stop user from entering
//  in more variables
let checkSequenceLength = () => {
    if (playerSequence.length === computerSequence.length) {
        playerSequence = []
        levelTrack.changeScore()
        levelTrack.isPlayerTurn = false
        computerTurn()
    }
}

//Computer runs sequence
let computerTurn = () => {
    levelTrack.changeTurn()
    pushRandomColor(computerSequence)
    runLightSequence()
}

//EventListeners

//toggle glow on and then off
let togglGlowEffect = (evt) => {
    if (evt.target.className === 'colorButtons') {
        evt.target.classList.add('glow')
        setTimeout(() => evt.target.classList.remove('glow'), 500)
    }
}

//press start button to start game
startBtn.on('click', () => {
    startBtn.hide()
    textDisplay.html('The Game has started')
    computerTurn()
})

//Displays the instructions for the game when clicked
$('.content .btn').eq(1).on('click', function () {
    swal({
        title: "Good job!",
        text: "Think fast... SIMON says, Chase my flashing lights and sounds \nThe challenge is to repeat the ever-increasing random signals that SIMON generates.\nThere are three game variations you can play, and you can even set the level of difficulty you want. In any case, you are sure to enjoy hours of challenging fun with SIMON",
        icon: "success",
        button: "I Understand",
    })
})

//Listens for player cliucking on any of the buttons inside shell
$('#shell').on('click', (evt) => {
    if (levelTrack.isPlayerTurn) {
        levelTrack.changeTurn()
        togglGlowEffect(evt)
        let dataValue = evt.target.dataset.Value
        pushRandomColor(playerSequence, parseInt(dataValue))
        verifyPlayerInput()
    } else {
        return
    }
})