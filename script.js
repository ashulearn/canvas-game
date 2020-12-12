let paintBox=document.getElementById("paintBox")
let pen=paintBox.getContext("2d")

let gameOn=true;

let playerspeed=5

class Box {
    constructor(size,color){
        this.size=size
        this.color=color
        this.x=0
        this.y=0
    }
}

class Player extends Box {
    constructor(){
        super(50,'blue')
        this.x=0
        this.y=225
        this.speed=0

    }
    move() {
        this.x += this.speed
    }
    

}

class Enemy extends Box {
    constructor(speed){
        super(50,'red')
        this.speed=speed
    }
    move() {
        this.y += this.speed 
        if(this.y > 450) {
            this.speed = -Math.abs(this.speed)
        }
        if(this.y < 0) {
            this.speed = Math.abs(this.speed)
        }
    }
} 

let player = new Player()

let e1=new Enemy(4)
let e2=new Enemy(8)
let e3=new Enemy(12)
e1.x=100
e2.x=233
e3.x=350

function drawBox(box) {
    pen.fillStyle = box.color
    pen.fillRect(box.x,box.y,box.size,box.size)
}

function isCollided(box1,box2) {
    if(Math.abs(box1.x-box2.x) < 25 && Math.abs(box1.y -box2.y)<25){
        console.log("collided")
        return true
    }
    else {
        return false
    }
    

}
// setInterval( () => {
//     pen.clearRect(0,0,500,500)
//     e1.y +=e1.speed
//     e2.y +=e2.speed
//     drawBox(e1)
//     drawBox(e2)
// }, 100)
setInterval( () => {
    playerspeed=parseInt(Math.random() * 10)
},1000)

paintBox.addEventListener( "mousedown" , () => {
    player.speed=playerspeed
    console.log("mousedown")
})
paintBox.addEventListener("mouseup", ()=> {
    player.speed=0
    console.log("mouseup")

})
function gameloop() {
    if(!gameOn) return
    pen.clearRect(0,0,500,500)
    e1.move()
    e2.move()
    e3.move()
    player.move()
    if(isCollided(e1,player) || isCollided(e2,player) || isCollided(e3,player)) {
        gameOn=false
        window.alert("Game Over")
    }
    drawBox(player)
    drawBox(e1)
    drawBox(e2)
    drawBox(e3)
    window.requestAnimationFrame(gameloop)

}

gameloop()

// function updateGame() {
//     window.requestAnimationFrame( () => {
//         pen.clearRect(0,0,500,500)
//     e1.move()
//     e2.move()
//     e3.move()
//     drawBox(e1)
//     drawBox(e2)
//     drawBox(e3)
//     updateGame()
//     })

// }
// updateGame()