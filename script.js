
const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#B8860B', '#FFD700', '#F5DEB3', '#FFF8DC'];
    let particlesArray = [];
    let linesArray = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
    }

    class DrawingLine {
      constructor() {
        this.startX = Math.random() * canvas.width;
        this.startY = Math.random() * canvas.height;
        this.controlX = this.startX + (Math.random() * 200 - 100);
        this.controlY = this.startY + (Math.random() * 200 - 100);
        this.endX = this.startX + (Math.random() * 300 - 150);
        this.endY = this.startY + (Math.random() * 300 - 150);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.quadraticCurveTo(this.controlX, this.controlY, this.endX, this.endY);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
    }

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
      }
    }

    function initLines() {
      linesArray = [];
      for (let i = 0; i < 30; i++) {
        linesArray.push(new DrawingLine());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let line of linesArray) {
        line.draw();
      }

      for (let particle of particlesArray) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
      
    }
    