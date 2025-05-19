// snake game 
const snakeSection = document.getElementById('snake-section');
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const scoreElem = document.getElementById('snake-score');
let box = 20;
let snake, direction, food, score, gameInterval, gameOver;

function resetSnakeGame() {
    snake = [{x: 8, y: 8}];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * 16),
        y: Math.floor(Math.random() * 16)
    };
    score = 0;
    gameOver = false;
    scoreElem.textContent = 'Score: 0';
    clearInterval(gameInterval);
    gameInterval = setInterval(drawSnakeGame, 100);
}

function drawSnakeGame() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = '#0f0';
    ctx.fillRect(food.x * box, food.y * box, box, box);


    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#fff' : '#0f0';
        ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
    }


    let head = {x: snake[0].x, y: snake[0].y};
    if (direction === 'LEFT') head.x--;
    if (direction === 'UP') head.y--;
    if (direction === 'RIGHT') head.x++;
    if (direction === 'DOWN') head.y++;


    if (
        head.x < 0 || head.x >= 16 ||
        head.y < 0 || head.y >= 16 ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        gameOver = true;
        ctx.fillStyle = '#f00';
        ctx.font = '24px VT323, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        return;
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElem.textContent = 'Score: ' + score;
        food = {
            x: Math.floor(Math.random() * 16),
            y: Math.floor(Math.random() * 16)
        };
    } else {
        snake.pop();
    }
}

document.addEventListener('keydown', function(e) {
    if (!snakeSection || snakeSection.style.display === 'none') return;
    if (gameOver && e.key.toLowerCase() === 'r') {
        resetSnakeGame();
        return;
    }
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});


const commandInput = document.getElementById('command');
commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = commandInput.value.trim().toLowerCase();
        if (cmd === 'snake') {
            document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
            snakeSection.style.display = 'block';
            resetSnakeGame();
        } else {
            snakeSection.style.display = 'none';
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    const commandInput = document.getElementById('command');
    const sections = {
        about: document.getElementById('about'),
        projects: document.getElementById('projects'),
        contact: document.getElementById('contact'),
        help: document.getElementById('help')
    };

    sections.snake = snakeSection; 
    const introText = "Welcome to my portfolio! Type 'about', 'projects','contact' or help to navigate.";
    let i = 0;

    function typeWriter() {
        if (i < introText.length) {
            typewriterElement.textContent += introText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.toLowerCase().trim();
            commandInput.value = '';

            Object.values(sections).forEach(section => section.classList.add('hidden'));

            if (sections[command]) {
                sections[command].classList.remove('hidden');
            } else {
                typewriterElement.textContent = "Invalid command. Try 'about', 'projects', or 'contact'.";
                setTimeout(() => {
                    typewriterElement.textContent = introText;
                }, 2000);
            }
        }
    });
});
