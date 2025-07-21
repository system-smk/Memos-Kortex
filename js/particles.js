const canvas = document.getElementById("cortex");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const particleCount = 80;
const maxDistance = 120;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = 1.5 + Math.random();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#00eaff";
    ctx.fill();
  }
}

function connect(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < maxDistance) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 234, 255, ${1 - dist / maxDistance})`;
    ctx.lineWidth = 0.7;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}

// Initialiser particules
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p, i) => {
    p.move();
    p.draw();
    for (let j = i + 1; j < particles.length; j++) {
      connect(p, particles[j]);
    }
  });
  requestAnimationFrame(animate);
}

animate();
