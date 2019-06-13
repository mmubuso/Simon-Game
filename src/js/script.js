// Javascript arry

//Variables 
let colorArr = [1,2,3,4]
//Buttons to be clicked on
let greenPiece = $('#green')
let redPiece = $('red')
let yellowPiece = $('#yellow')
let bluePiece = $('#blue')

//Objects
let levelTrack = {
    score: 0,
    addOne: function(){
        this.score++
        $('.scoreKeeper p').text(this.score)
    }
}

//Functions


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
