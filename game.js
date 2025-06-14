const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  color: "red",
  speed: 3
};

let foods = [];
for (let i = 0; i < 100; i++) {
  foods.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 5,
    color: "yellow"
  });
}

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawCircle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function update() {
  const dx = mouse.x - player.x;
  const dy = mouse.y - player.y;
  const angle = Math.atan2(dy, dx);
  player.x += Math.cos(angle) * player.speed;
  player.y += Math.sin(angle) * player.speed;

  for (let i = foods.length - 1; i >= 0; i--) {
    const f = foods[i];
    const dist = Math.hypot(player.x - f.x, player.y - f.y);
    if (dist < player.radius + f.radius) {
      player.radius += 0.5;
      foods.splice(i, 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle(player.x, player.y, player.radius, player.color);
  foods.forEach(f => drawCircle(f.x, f.y, f.radius, f.color));
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
