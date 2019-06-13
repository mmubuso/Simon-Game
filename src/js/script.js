// Javascript arry

//Variables 
//stores variable for clearing setInterval timer
let stopRunInterval1
let stopRunInterval2

//Tracks light pattern
let lightOnCounter = 0
let lightOffCounter = 0
//Correspond with simon color pieces
let greenPiece = $('#green')
let redPiece = $('#red')
let yellowPiece = $('#yellow')
let bluePiece = $('#blue')
//Array of selected colors
let colorArr = [greenPiece,redPiece,yellowPiece,bluePiece]


//Objects
//Keeps track of what round youre on
let levelTrack = {
    score: 0,
    addOne: function(){
        this.score++
        $('.scoreKeeper p').text(this.score)
    }
}


//Functions
//Controls delay between items 
let runLightSequence = () => {
    stopRunInterval1 = setInterval(turnlightOn, 1000)
    stopRunInterval2 = setTimeout( () => stopRunInterval2 = setInterval(turnLightOf, 1000),1000)

}

//Turns on the light to show activated
let  turnlightOn = function () {
    console.log(lightOnCounter)
    if (colorArr.length > lightOnCounter) {
        colorArr[lightOnCounter].addClass('redGlow')
        lightOnCounter++
    } else {
        lightOnCounter = 0
        clearInterval(stopRunInterval1)
    }
}

//Turns off the light to show deactivated
let  turnLightOf = function () {
    console.log(lightOffCounter)
    if (colorArr.length > lightOffCounter) {
        colorArr[lightOffCounter].removeClass('redGlow')
        lightOffCounter++
    } else {
        lightOffCounter = 0
        clearInterval(stopRunInterval2)
    }
}

//EventListernes
//Displays the instructions for the game when clicked
$('.content .btn').eq(1).on('click', function () {
    swal({
        title: "Good job!",
        text: "Think fast... SIMON says, Chase my flashing lights and sounds \nThe challenge is to repeat the ever-increasing random signals that SIMON generates.\nThere are three game variations you can play, and you can even set the level of difficulty you want. In any case, you are sure to enjoy hours of challenging fun with SIMON",
        icon: "success",
        button: "I Understand",
    })
})
