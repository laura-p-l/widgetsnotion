// JavaScript code for the snake game

        const gameBoard = document.getElementById("game-board");
        let snake = [{x: 10, y: 10}];
        let food = {x: 5, y: 5};
        let direction = {x: 0, y: 0};
        let score = 0;

        function updateGameBoard() {
            gameBoard.innerHTML = "";

            snake.forEach(node => {
                const snakeNode = document.createElement("div");
                snakeNode.style.left = node.x * 20 + "px";
                snakeNode.style.top = node.y * 20 + "px";
                snakeNode.classList.add("snake-node");
                gameBoard.appendChild(snakeNode);
            });

            const foodNode = document.createElement("div");
            foodNode.style.left = food.x * 20 + "px";
            foodNode.style.top = food.y * 20 + "px";
            foodNode.classList.add("food");
            gameBoard.appendChild(foodNode);
        }

        function moveSnake() {
            const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                generateFood();
            } else {
                snake.pop();
            }
        }

        function generateFood() {
            food = {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)};
        }

        function handleKeyPress(event) {
            if (event.key === "ArrowUp" && direction.y !== 1) {
                direction = {x: 0, y: -1};
            } else if (event.key === "ArrowDown" && direction.y !== -1) {
                direction = {x: 0, y: 1};
            } else if (event.key === "ArrowLeft" && direction.x !== 1) {
                direction = {x: -1, y: 0};
            } else if (event.key === "ArrowRight" && direction.x !== -1) {
                direction = {x: 1, y: 0};
            }
        }

        function checkCollision() {
            if (
                snake[0].x < 0 ||
                snake[0].x >= 20 ||
                snake[0].y < 0 ||
                snake[0].y >= 20 ||
                snake.slice(1).some(node => node.x === snake[0].x && node.y === snake[0].y)
            ) {
                clearInterval(gameInterval);
                alert("Game over! Your score: " + score);
            }
        }

        document.addEventListener("keydown", handleKeyPress);

        const gameInterval = setInterval(() => {
            moveSnake();
            updateGameBoard();
            checkCollision();
        }, 200);
