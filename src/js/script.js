//Musiteli Mubuso
//Simon Game
//Last modified 06/15/19


//Variables 
//stores variable for clearing setInterval timer
let stopRunInterval1
let stopRunInterval2

//Stores flag that controls iterator
//combine with object 
let intervalFlag = false

//Stores button
let startBtn = $('#start')
let restartBtn = $('#restart')

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
        $('.scoreKeeper p').text((this.score + "").padStart(2, '0'))
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
    stopRunInterval2 = setTimeout(() => stopRunInterval2 = setInterval(toggleGlowEffectSequence, 1000), 250)
}

//Turns on the light to show activated
//This function is placed into the callback queue twice at different time intervals
// Else statement only runs when computer has reached the end sequence 
let toggleGlowEffectSequence = () => {
    if (computerSequence.length > lightOnCounter) {
        computerSequence[lightOnCounter].toggleClass('glow')
        //Only second function can access this code
        if (intervalFlag) {
            lightOnCounter++
            intervalFlag = false
        } else {
            computerSequence[lightOnCounter][0].children[0].play()
            intervalFlag = true
        }
    } else {
        stopGlowEffect()
    }
}

//Stop toggleFunction, clear interval and allow user to click on game pieces
let stopGlowEffect = () => {
    lightOnCounter = 0
    clearInterval(stopRunInterval1)
    clearInterval(stopRunInterval2)
    levelTrack.toggleTurn()
    levelTrack.changeTurn()
}

//Function check if player pressed the correct button
let verifyPlayerInput = () => {
    if (compareAnswers()) {
        checkSequenceLength()
    } else {
        swal({
            title: "You Failed",
            text: "Try again next time",
            icon: "warning",
            button: "Okay"
        })
        $('.lossSound')[0].play()
        levelTrack.toggleTurn()
        display.show()
        textDisplay.text(`High Score is ${levelTrack.score}`)
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


//Reset values
let resetValues = () => {
    levelTrack.isPlayerTurn = false
    computerSequence = []
    playerSequence = []
    levelTrack.score = -1
    levelTrack.changeScore()
}


//toggle glow on and then off
let togglGlowEffect = (evt) => {
    if (evt.target.className === 'colorButtons') {
        evt.target.classList.add('glow')
        setTimeout(() => evt.target.classList.remove('glow'), 500)
    }
}


//EventListeners
//Restart game 
restartBtn.on('click', () => {
    if (computerSequence.length > 0) {
        startBtn.show()
        resetValues()
        textDisplay.text('Simon Game')
    } else {
        textDisplay.text('Simon Game')
        resetValues()
    }
})


//press start button to start game
startBtn.on('click', () => {
    startBtn.hide()
    display.hide()
    textDisplay.html('The Game has started')
    computerTurn()
})

//Displays the instructions for the game when clicked
$('#instructions').eq(0).on('click', function () {
    swal({
        title: "Good job!",
        text: "Think fast... SIMON says, Chase my flashing lights and sounds \nThe challenge is to repeat the ever-increasing random signals that SIMON generates.\nThere are three game variations you can play, and you can even set the level of difficulty you want. In any case, you are sure to enjoy hours of challenging fun with SIMON",
        icon: "success",
        button: "I Understand",
    })
})

//Listens for player cliucking on any of the buttons inside shell
$('#shell').on('click', (evt) => {
    if (evt.target.className === "colorButtons") {
        if (levelTrack.isPlayerTurn) {
            evt.target.children[0].play()
            levelTrack.changeTurn()
            togglGlowEffect(evt)
            let dataValue = evt.target.dataset.Value
            pushRandomColor(playerSequence, parseInt(dataValue))
            verifyPlayerInput()
        } else {
            return
        }
    }
})