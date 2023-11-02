const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 2,
    dy: 2,
    bounceCount: 0,
};

resetButton.addEventListener('click', () => {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.bounceCount = 0;
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if(
        clickX > ball.x - ball.radius &&
        clickX < ball.x + ball.radius &&
        clickY > ball.y - ball.radius &&
        clickY < ball.y + ball.radius
    ) {
        // Ball clicked, increase bounce count
        ball.bounceCount++;
    } else {
        ball.x = clickX;
        ball.y = clickY;
    }
});

function drawball() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red'; 
    ctx.fill();
    ctx.closePath();
}

function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
        ball.bounceCount++;
    }
    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
        ball.bounceCount++;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    
    drawball();
}

setInterval(updateGameArea, 10);