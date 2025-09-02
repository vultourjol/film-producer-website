document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('bg-lines');
    if (!canvas) {
        console.error("Canvas element with id 'bg-lines' not found.");
        return;
    }
    const ctx = canvas.getContext('2d');

    let width, height, stars, starCount = 800, speed;

    class Star {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = (Math.random() - 0.5) * width;
            this.y = (Math.random() - 0.5) * height;
            this.z = Math.random() * width;
            this.pz = this.z; 
        }

        update() {
            this.z -= speed;
            if (this.z < 1) {
                this.reset();
            }
        }

        draw() {
            const sx = (this.x / this.z) * (width / 2);
            const sy = (this.y / this.z) * (height / 2);
            const radius = Math.max(0, (1 - this.z / width) * 2.5);

            const px = (this.x / this.pz) * (width / 2);
            const py = (this.y / this.pz) * (height / 2);

            this.pz = this.z;

            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = `rgba(234,161,36, 1.0)`;
            ctx.lineWidth = radius;
            ctx.stroke();
        }
    }

    function setup() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.documentElement.scrollHeight;
        speed = (width / 1920) * 1; 
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
        ctx.translate(width / 2, height / 2);
    }


    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
        ctx.fillRect(-width / 2, -height / 2, width, height);

        for (const star of stars) {
            star.update();
            star.draw();
        }

        requestAnimationFrame(animate);
    }

    setup();
    animate();
});