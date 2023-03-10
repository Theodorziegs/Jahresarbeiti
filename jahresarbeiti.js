addEventListener("resize", function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
    });
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let rows = 16; // anzahl der reihen senkrecht
    let cols = 16; // waagerecht
    let snake = [{ //start der Schlange
        x: 8, 
        y: 14
    }];
    let food = {
        x: 1,
        y: 1
    };    

    let obstacle = { //die Hindernisse 
        x: 4,
        y: 4
    };
    
    let cellWidth = canvas.width / cols; //teilt die leinwand in spalten 
    let cellHeight = canvas.height / rows;// und reihen ein
    let direction = 'UP'; //die schlange startet nach links
    let foodCollected = false;
    let obstacleHitted = false;

    placeFood();//plaziert das essen
    placeObstacle();

    setInterval(gameLoop, 200);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keydown', keyDownWASD);

draw();


function draw(){ //zeichnet
    

    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#b694ff';
    
    snake.forEach(part => add(part.x, part.y));

    ctx.fillStyle = '#3CB371'; //Essen
    add(food.x, food.y);

    ctx.fillStyle = '#3CB371'; 
    add(obstacle.x, obstacle.y);

    requestAnimationFrame(draw);
}

function testGameOver() {
    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find (part => part.x == firstPart.x && part.y == firstPart.y);
    
    

    if (snake[0].x < 0 || //das bedeutet oder
        snake[0].x > cols - 1 ||
        snake[0].y < 0 ||
        snake[0].y > rows - 1 ||
        duplicatePart
        ) {
            //was passieren soll
            placeFood();
            snake = [{ 
                x: 21, 
                y: 10
            }];
            direction = 'LEFT'; 
        }  
    }

function placeFood() { 
    
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);

    food = {
        x: randomX, 
        y: randomY
    }

}

function placeObstacle() { 
    
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);

    obstacle = {
        x: randomX, 
        y: randomY
    }

}

function add(x, y){
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth , cellHeight ); // -2
}

function shiftSnake(){
    for (let i =  snake.length -1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function gameLoop(){ //berechnet
    shiftSnake();
    if (foodCollected){
        snake = [{
            x: snake[0].x,
            y: snake[0].y
            }, ...snake];

        foodCollected = false;
    }

    if (obstacleHitted){
        snake = [{
            x: snake[-1].x,
            y: snake[-1].y
            }, ...snake];

        obstacleHitted = false;
    }
    
    if(direction== 'LEFT'){
    snake[0].x--;
}
    if(direction== 'RIGHT'){
    snake[0].x++;
}
    if(direction== 'UP'){
    snake[0].y--;
}
    if(direction== 'DOWN'){
    snake[0].y++;
}
    if (snake[0].x == food.x && 
        snake[0].y == food.y){
        foodCollected = true;
        placeFood();
        placeObstacle();
    }

    if (snake[0].x == obstacle.x && 
        snake[0].y == obstacle.y){
        obstacleHitted = true;
    }

}

function keyDown(e){
    if (e.keyCode == 37){
        direction = 'LEFT';
    }
    if (e.keyCode == 38){
        direction = 'UP';
    }
    if (e.keyCode == 39){
        direction = 'RIGHT';
    }
    if (e.keyCode == 40){
        direction = 'DOWN';
    }}

function keyDownWASD(e){
    if (e.keyCode == 65){ //65
        direction = 'LEFT';
    }
    if (e.keyCode == 87){
        direction = 'UP';
    }
    if (e.keyCode == 68){
        direction = 'RIGHT';
    }
    if (e.keyCode == 83){
        direction = 'DOWN';
    }}

    function left(){
         direction = 'LEFT';
        }

    function right(){
        direction = 'RIGHT';
        }

    function up(){
        direction = 'UP';
       }

    function down(){
        direction = 'DOWN';
       }

    
