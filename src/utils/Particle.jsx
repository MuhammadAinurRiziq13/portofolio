import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ 
  dotColor = '#5cbdaa',
  lineColor = '#5cbdaa',
  minSpeedX = 0.1,
  maxSpeedX = 0.7,
  minSpeedY = 0.1,
  maxSpeedY = 0.7,
  density = 10000,
  particleRadius = 7,
  lineWidth = 1,
  curvedLines = false,
  proximity = 100,
  parallax = true,
  parallaxMultiplier = 5,
  directionX = 'center',
  directionY = 'center'
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particles = useRef([]);
  const rafRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const tiltX = useRef(0);
  const tiltY = useRef(0);
  const pointerX = useRef(0);
  const pointerY = useRef(0);
  const paused = useRef(false);
  const winW = useRef(window.innerWidth);
  const winH = useRef(window.innerHeight);

  class Particle {
    constructor(canvas, ctx, options) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.options = options;
      this.stackPos = 0;
      this.active = true;
      this.layer = Math.ceil(Math.random() * 3);
      this.parallaxOffsetX = 0;
      this.parallaxOffsetY = 0;
      
      // Initial position
      this.position = {
        x: Math.ceil(Math.random() * canvas.width),
        y: Math.ceil(Math.random() * canvas.height)
      };

      // Speed
      this.speed = {};
      switch (options.directionX) {
        case 'left':
          this.speed.x = +(-options.maxSpeedX + (Math.random() * options.maxSpeedX) - options.minSpeedX).toFixed(2);
          break;
        case 'right':
          this.speed.x = +((Math.random() * options.maxSpeedX) + options.minSpeedX).toFixed(2);
          break;
        default:
          this.speed.x = +((-options.maxSpeedX / 2) + (Math.random() * options.maxSpeedX)).toFixed(2);
          this.speed.x += this.speed.x > 0 ? options.minSpeedX : -options.minSpeedX;
      }
      
      switch (options.directionY) {
        case 'up':
          this.speed.y = +(-options.maxSpeedY + (Math.random() * options.maxSpeedY) - options.minSpeedY).toFixed(2);
          break;
        case 'down':
          this.speed.y = +((Math.random() * options.maxSpeedY) + options.minSpeedY).toFixed(2);
          break;
        default:
          this.speed.y = +((-options.maxSpeedY / 2) + (Math.random() * options.maxSpeedY)).toFixed(2);
          this.speed.y += this.speed.y > 0 ? options.minSpeedY : -options.minSpeedY;
      }
    }

    draw() {
      const ctx = this.ctx;
      const options = this.options;
      
      ctx.beginPath();
      ctx.arc(
        this.position.x + this.parallaxOffsetX,
        this.position.y + this.parallaxOffsetY,
        options.particleRadius / 2,
        0,
        Math.PI * 2,
        true
      );
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      for (let i = particles.current.length - 1; i > this.stackPos; i--) {
        const p2 = particles.current[i];
        const a = this.position.x - p2.position.x;
        const b = this.position.y - p2.position.y;
        const dist = Math.sqrt((a * a) + (b * b)).toFixed(2);

        if (dist < options.proximity) {
          ctx.moveTo(
            this.position.x + this.parallaxOffsetX,
            this.position.y + this.parallaxOffsetY
          );
          if (options.curvedLines) {
            ctx.quadraticCurveTo(
              Math.max(p2.position.x, p2.position.x),
              Math.min(p2.position.y, p2.position.y),
              p2.position.x + p2.parallaxOffsetX,
              p2.position.y + p2.parallaxOffsetY
            );
          } else {
            ctx.lineTo(
              p2.position.x + p2.parallaxOffsetX,
              p2.position.y + p2.parallaxOffsetY
            );
          }
        }
      }
      ctx.stroke();
      ctx.closePath();
    }

    updatePosition() {
      const options = this.options;
      const canvas = this.canvas;

      if (options.parallax) {
        const isDesktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
        
        if (window.DeviceOrientationEvent && !isDesktop) {
          // Map tiltX range [-30,30] to range [0,winW]
          const ratioX = (winW.current - 0) / (30 - -30);
          pointerX.current = (tiltX.current - -30) * ratioX + 0;
          // Map tiltY range [-30,30] to range [0,winH]
          const ratioY = (winH.current - 0) / (30 - -30);
          pointerY.current = (tiltY.current - -30) * ratioY + 0;
        } else {
          pointerX.current = mouseX.current;
          pointerY.current = mouseY.current;
        }

        // Calculate parallax offsets
        this.parallaxTargX = (pointerX.current - (winW.current / 2)) / (options.parallaxMultiplier * this.layer);
        this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10;
        this.parallaxTargY = (pointerY.current - (winH.current / 2)) / (options.parallaxMultiplier * this.layer);
        this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10;
      }

      // Check boundaries
      switch (options.directionX) {
        case 'left':
          if (this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
            this.position.x = canvas.width - this.parallaxOffsetX;
          }
          break;
        case 'right':
          if (this.position.x + this.speed.x + this.parallaxOffsetX > canvas.width) {
            this.position.x = 0 - this.parallaxOffsetX;
          }
          break;
        default:
          if (this.position.x + this.speed.x + this.parallaxOffsetX > canvas.width || 
              this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
            this.speed.x = -this.speed.x;
          }
      }

      switch (options.directionY) {
        case 'up':
          if (this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
            this.position.y = canvas.height - this.parallaxOffsetY;
          }
          break;
        case 'down':
          if (this.position.y + this.speed.y + this.parallaxOffsetY > canvas.height) {
            this.position.y = 0 - this.parallaxOffsetY;
          }
          break;
        default:
          if (this.position.y + this.speed.y + this.parallaxOffsetY > canvas.height ||
              this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
            this.speed.y = -this.speed.y;
          }
      }

      // Move particle
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    }

    setStackPos(i) {
      this.stackPos = i;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      ctx.fillStyle = dotColor;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
    };

    const createParticles = () => {
      particles.current = [];
      const numParticles = Math.round((canvas.width * canvas.height) / density);
      for (let i = 0; i < numParticles; i++) {
        const particle = new Particle(canvas, ctx, {
          dotColor,
          lineColor,
          minSpeedX,
          maxSpeedX,
          minSpeedY,
          maxSpeedY,
          directionX,
          directionY,
          density,
          particleRadius,
          lineWidth,
          curvedLines,
          proximity,
          parallax,
          parallaxMultiplier
        });
        particle.setStackPos(i);
        particles.current.push(particle);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        particle.updatePosition();
      });
      
      particles.current.forEach(particle => {
        particle.draw();
      });

      if (!paused.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const handleMouseMove = (e) => {
      mouseX.current = e.pageX;
      mouseY.current = e.pageY;
    };

    const handleDeviceOrientation = (e) => {
      tiltY.current = Math.min(Math.max(-e.beta, -30), 30);
      tiltX.current = Math.min(Math.max(-e.gamma, -30), 30);
    };

    const handleResize = () => {
      winW.current = window.innerWidth;
      winH.current = window.innerHeight;
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    draw();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove); // Changed from canvas to window
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    dotColor,
    lineColor,
    minSpeedX,
    maxSpeedX,
    minSpeedY,
    maxSpeedY,
    directionX,
    directionY,
    density,
    particleRadius,
    lineWidth,
    curvedLines,
    proximity,
    parallax,
    parallaxMultiplier
  ]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ParticleBackground;