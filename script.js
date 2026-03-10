// Typing Animation
const text = "25 years of greatness.25 years of a heart that makes my world brighter.And I am the luckiest girl alive to love you.";
const typingElement = document.getElementById("typing-text");

let i = 0;
function typeWriter() {
    if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 40);
    }
}
typeWriter();

/* =========================
   FLOATING HEART OUTLINES
========================= */

const heartCanvas = document.getElementById("hearts");
const hCtx = heartCanvas.getContext("2d");

heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;

let heartParticles = [];

for (let i = 0; i < 30; i++) {
    heartParticles.push({
        x: Math.random() * heartCanvas.width,
        y: Math.random() * heartCanvas.height,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawHeart(x, y, size) {
    hCtx.strokeStyle = "rgba(212,175,55,0.6)";
    hCtx.lineWidth = 1.5;
    hCtx.beginPath();
    hCtx.moveTo(x, y);
    hCtx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
    hCtx.bezierCurveTo(x - size, y + size / 2, x, y + size, x, y + size);
    hCtx.bezierCurveTo(x, y + size, x + size, y + size / 2, x + size, y);
    hCtx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
    hCtx.stroke();
}

function animateHearts() {
    hCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

    heartParticles.forEach(h => {
        drawHeart(h.x, h.y, h.size);
        h.y -= h.speed;

        if (h.y < -50) {
            h.y = heartCanvas.height;
            h.x = Math.random() * heartCanvas.width;
        }
    });

    requestAnimationFrame(animateHearts);
}

animateHearts();

/* =========================
   REAL WORKING CONFETTI
========================= */

function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];

    for (let i = 0; i < 200; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            color: Math.random() > 0.5 ? "#d4af37" : "#ffffff"
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            p.y += p.speed;
            p.rotation += 5;

            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}

/* =========================
   VIDEO FADE-IN ON SCROLL
========================= */

const videoSection = document.querySelector(".video-section");

window.addEventListener("scroll", () => {
    const position = videoSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (position < screenPosition) {
        videoSection.classList.add("show");
    }
});