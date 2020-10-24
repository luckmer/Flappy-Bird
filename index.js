document.addEventListener("DOMContentLoaded", () =>{
    const Game = document.querySelector(".game")
    const character = document.querySelector(".character");
    const start = document.querySelector(".Start")
    let characterLeft = 100;
    let gravity = 3;
    let ChTimer;
    let ChLeft = 10;

    function StartGame(){
        generateWall()
        FallDown()
        start.classList.add("Off")
    }

    function FallDown(){
        ChTimer = setInterval(function (){
            characterLeft += gravity;
            character.style.top = characterLeft + "px"
            character.style.left = ChLeft + "px"
            if (characterLeft > 355){
                setEndGame()
            }
        }, 20)
    }

    function generateWall(){
        
        let left = 830
        let random = ((Math.random() * 120) + 250)
        const wall = DownPart(random);
        const UpWall = upperPart(random, Game);
        Game.appendChild(wall)

        function moveBlock(){
            left -= 5;
            wall.style.left = left + "px"
            UpWall.style.left = left + "px"
            if (left < -100){
                clearInterval(timerId)
                wall.classList.remove("wall")
                UpWall.classList.remove("UpWall")
            }
            Collision(left, ChLeft, characterLeft, random, setEndGame, timerId, ChTimer);
        }
        let timerId = setInterval(moveBlock, 20)
        setTimeout(generateWall, 3000)
    }

    function upperPart(random, Game){
        const UpWall = document.createElement("div");
        UpWall.classList.add("UpWall");
        UpWall.style.top = random - 350 + "px";
        Game.appendChild(UpWall);
        return UpWall;
    }

    function DownPart(random){
        const wall = document.createElement("div");
        wall.classList.add("wall");
        wall.style.top = random + "px";
        return wall;
    }
    
    function Collision(left, ChLeft, characterLeft, random, setEndGame, timerId, ChTimer){
        if (left > -10 && left < 10 &&
            ChLeft === 10 &&
            (characterLeft < random - 180) ||
            characterLeft === 0){
            setEndGame(timerId, ChTimer);
        }
    
        if (left > -10 &&
            left < 10 &&
            ChLeft === 10 &&
            (characterLeft > random - 20)){
            setEndGame(timerId, ChTimer);
            
        }
    }

    function setEndGame(timerId, ChTimer){
        clearInterval(timerId);
        clearInterval(ChTimer);
        location.reload(true);
        alert("game over ")
    }

    const jump = () => characterLeft < 910 ? characterLeft -= 50 : characterLeft -= 2;
    
    function Joystick(e){
        if (e.keyCode === 32){
            jump()
        }
    }
    

    start.addEventListener("click", StartGame)
    document.addEventListener("keyup",Joystick)
})
