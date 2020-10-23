document.addEventListener("DOMContentLoaded",()=>{
    const character = document.querySelector(".character");
    const start = document.querySelector(".wall_control");
    let controlBlock = 910;
    let timerId;
    let gravity = 3;

    function FallDown()
    {
        timerId = setInterval(function ()
        {
            controlBlock -= gravity;
            character.style.bottom = controlBlock + "px"
            controlBlock < 582 ? clearInterval(timerId) : ""
        }, 20)
    }

    const Jump = () => controlBlock < 910 ? controlBlock += 40 : controlBlock -= 2

    function randomBlock()
    {
        let left =  1700;
        let random = ((Math.random()*300)+ 50);
        const block = document.createElement("div");
        const hole = document.createElement("div");
        block.classList.add("wall");
        block.style.left = left + "px";
        start.appendChild(block);
        hole.classList.add("emptyBlock");
        hole.style.left = left + "px";
        hole.style.top = random + "px";
        start.appendChild(hole);    
        function move()
        {
            
            left -= 5;
            block.style.left = left + "px"
            hole.style.left = left + "px"
            
            left == 380 ? ClearPanel(timer, block, hole) : []
            console.log(random + 190)
           
            
            
        }

        let timer = setInterval(move,20)
        setTimeout(randomBlock, 3000)
    }

    function ClearPanel(timer, block,hole)
        {
        clearInterval(timer);
        block.classList.remove("wall");
        hole.classList.remove("emptyBlock");
    }
    
    const Joystick = (e) => e.keyCode === 32 ? Jump() : []
    const StartGame = () => FallDown()

    randomBlock()
    StartGame()
    document.addEventListener("keyup", Joystick)
})