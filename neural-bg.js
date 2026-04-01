/* The Cozm — Neural Network Background Animation */
(function () {
  'use strict';

  var canvas, ctx, particles, animId;
  var mouse = { x: -9999, y: -9999 };
  var TEAL = { r: 64, g: 174, b: 188 };
  var PARTICLE_COUNT = 60;
  var MAX_DIST = 160;
  var HERO_ID = 'neural-hero-canvas';

  function hexToRgb(hex) {
    return TEAL;
  }

  function init() {
    var hero = document.querySelector('.hero, .page-hero');
    if (!hero) return;

    // Avoid duplicate canvas
    if (document.getElementById(HERO_ID)) return;

    canvas = document.createElement('canvas');
    canvas.id = HERO_ID;
    canvas.style.cssText = [
      'position:absolute',
      'top:0',
      'left:0',
      'width:100%',
      'height:100%',
      'pointer-events:none',
      'z-index:1',
      'opacity:0.85'
    ].join(';');

    // Ensure hero has position:relative or absolute
    var heroPos = getComputedStyle(hero).position;
    if (heroPos === 'static') {
      hero.style.position = 'relative';
    }

    hero.insertBefore(canvas, hero.firstChild);
    ctx = canvas.getContext('2d');

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  function resize() {
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.2 + 0.3
      });
    }
  }

  function onMouseMove(e) {
    var hero = document.querySelector('.hero, .page-hero');
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Mouse repulsion (subtle)
      var dx = p.x - mouse.x;
      var dy = p.y - mouse.y;
      var distM = Math.sqrt(dx * dx + dy * dy);
      if (distM < 100 && distM > 0) {
        var force = (100 - distM) / 100 * 0.3;
        p.vx += (dx / distM) * force;
        p.vy += (dy / distM) * force;
      }

      // Speed limit
      var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.5) {
        p.vx = (p.vx / speed) * 1.5;
        p.vy = (p.vy / speed) * 1.5;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + TEAL.r + ',' + TEAL.g + ',' + TEAL.b + ',' + p.opacity + ')';
      ctx.fill();
    }

    // Draw connections
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var p1 = particles[i];
        var p2 = particles[j];
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          var alpha = (1 - dist / MAX_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(' + TEAL.r + ',' + TEAL.g + ',' + TEAL.b + ',' + alpha + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(animate);
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
