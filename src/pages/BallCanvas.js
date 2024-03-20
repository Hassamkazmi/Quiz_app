import React, { useEffect, useRef } from 'react';

const BallCanvas = () => {
  const canvasRef = useRef(null);
  let ctx, w, h, balls = [];
  let mouse = {
    x: undefined,
    y: undefined
  }
  let rgb = [
    "rgb(26, 188, 156)",
    "rgb(46, 204, 113)",
    "rgb(52, 152, 219)",
    "rgb(155, 89, 182)",
    "rgb(241, 196, 15)",
    "rgb(230, 126, 34)",
    "rgb(231, 76, 60)"
  ]

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    resizeReset();
    window.addEventListener("resize", resizeReset);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);

    const animationId = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("resize", resizeReset);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseout", mouseout);
      cancelAnimationFrame(animationId);
    }
  }, []);

  const resizeReset = () => {
    w = canvasRef.current.width = window.innerWidth;
    h = canvasRef.current.height = window.innerHeight;
  }

  const animationLoop = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    drawBalls();

    let temp = [];
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].time <= balls[i].ttl) {
        temp.push(balls[i]);
      }
    }
    balls = temp;

    requestAnimationFrame(animationLoop);
  }

  const drawBalls = () => {
    for (let i = 0; i < balls.length; i++) {
      balls[i].update();
      balls[i].draw();
    }
  }

  const mousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 3; i++) {
      balls.push(new Ball());
    }
  }

  const mouseout = () => {
    mouse.x = undefined;
    mouse.y = undefined;
  }

  const getRandomInt = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
  }

  const easeOutQuart = (x) => {
    return 1 - Math.pow(1 - x, 4);
  }

  class Ball {
    constructor() {
      this.start = {
        x: mouse.x + getRandomInt(-20, 20),
        y: mouse.y + getRandomInt(-20, 20),
        size: getRandomInt(30, 40)
      }
      this.end = {
        x: this.start.x + getRandomInt(-300, 300),
        y: this.start.y + getRandomInt(-300, 300)
      }

      this.x = this.start.x;
      this.y = this.start.y;
      this.size = this.start.size;

      this.style = rgb[getRandomInt(0, rgb.length - 1)];

      this.time = 0;
      this.ttl = 120;
    }
    draw() {
      ctx.fillStyle = this.style;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    update() {
      if (this.time <= this.ttl) {
        let progress = 1 - (this.ttl - this.time) / this.ttl;

        this.size = this.start.size * (1 - easeOutQuart(progress));
        this.x = this.x + (this.end.x - this.x) * 0.01;
        this.y = this.y + (this.end.y - this.y) * 0.01;
      }
      this.time++;
    }
  }

  return <canvas ref={canvasRef}></canvas>;
}

export default BallCanvas;
