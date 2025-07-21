const canvas = document.getElementById("cortex-bg");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
let impulses = [];
let mouse = { x: null, y: null };

const count = 242;
const maxDist = 140;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

document.addEventListener("click", (e) => {
  impulses.push({
    x: e.clientX,
    y: e.clientY,
    r: 0,
    alpha: 1
  });
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = 1.5 + Math.random() * 1.5;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00eaff";
    ctx.fill();
  }
}

function connect(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < maxDist) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0,234,255,${1 - dist / maxDist})`;
    ctx.lineWidth = 0.6;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}

function drawImpulses() {
  for (let i = impulses.length - 1; i >= 0; i--) {
    const imp = impulses[i];
    ctx.beginPath();
    ctx.arc(imp.x, imp.y, imp.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${imp.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    imp.r += 2;
    imp.alpha -= 0.03;

    if (imp.alpha <= 0) {
      impulses.splice(i, 1);
    }
  }
}

// Initialisation
for (let i = 0; i < count; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  drawImpulses();

  particles.forEach((p, i) => {
    p.move();
    p.draw();

    for (let j = i + 1; j < particles.length; j++) {
      connect(p, particles[j]);
    }

    // Connexion souris ↔ particule
    if (mouse.x && mouse.y) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / maxDist})`;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}
animate();
