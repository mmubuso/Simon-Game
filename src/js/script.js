// Javascript arry


//Variables 
//stores variable for clearing setInterval timer
let stopRunInterval1
let stopRunInterval2
//Stores flag that controls iterator
let intervalFlag = false

//Tracks light pattern
let lightOnCounter = 0
let lightOffCounter = 0
//Correspond with simon color pieces
let greenPiece = $('#green')
let redPiece = $('#red')
let yellowPiece = $('#yellow')
let bluePiece = $('#blue')
//Array of selected colors
let computerSequence = []
let playerSequence = []


//Objects
//Keeps track of what round you're on
let levelTrack = {
    score: 0,
    addOne: function(){
        this.score++
        $('.scoreKeeper p').text(this.score)
    }
}

//Functions

//Generate random number and push color that matches number to computers new sequence
let pushRandomColor = (arr) => {
    let color;
switch (Math.floor(Math.random() * 4) + 1) {
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
let compareAnswers = (playerArray,computerArray) => {
    for(let i = 0; i < playerArray.length; i++){
        if(playerArray[i] !== computerArray[i]){
            return false
        }
    }
    return true
}

//Controls delay between items 
let runLightSequence = () => {
    stopRunInterval1 = setInterval(turnlightOn, 1000)
    stopRunInterval2 = setTimeout(() => stopRunInterval2 = setInterval(turnlightOn, 1000),500)
}

//Might turn these into one function using toggle
//Turns on the light to show activated
let  turnlightOn =  () => {
    if (computerSequence.length > lightOnCounter) {
        console.log("Light On")
        computerSequence[lightOnCounter].toggleClass('glow')

        if(intervalFlag){lightOnCounter++;intervalFlag=false}else{intervalFlag = true}
    } else {
        lightOnCounter = 0
        clearInterval(stopRunInterval1)
        clearInterval(stopRunInterval2)
    }
}

//EventListeners
//press start button to start game
$('#start').on('click', () => {
    runLightSequence()
    pushRandomColor(computerSequence)
    document.getElementById('start').
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