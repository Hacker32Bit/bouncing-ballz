import { getLocalStorage, initLocalStorage } from "./lib/LocalStorageManagment";
import { eventsListeners } from "./lib/EventListeners";
import { BallProps, MouseProps } from "./interfaces";

// Init const gravity, ballId and ballArray;
export const GRAVITY = 0.098;
export let ballId = 0;
export function incBallId() {
  return ballId++;
}
export const ballArray: any = [];

export function canvasInit() {
  // Check if params exits in local storage. If not init defaults values
  initLocalStorage();

  // get inputs elements
  const colorInput = document.getElementById("color");
  const radiusInput = document.getElementById("radius");
  const elasticityInput = document.getElementById("elasticity");
  const randomInput = document.getElementById("random");
  const generateRandomButton = document.getElementById("generateRandom");
  const radiusOutput = document.getElementById("radiusOutput");
  const elasticityOutput = document.getElementById("elasticityOutput");
  const removeLastBall = document.getElementById("removeLastBall");
  const removeFirstBall = document.getElementById("removeFirstBall");
  const removeAllBalls = document.getElementById("removeAllBalls");
  const ballCounts = document.getElementById("balls-counts");
  const canvas = <HTMLCanvasElement>document.getElementById("gameFrame");
  const context = canvas.getContext("2d");

  // Init mouse position as default
  const mouse: MouseProps = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  // Init inputs values from localStorage
  getLocalStorage(
    colorInput,
    radiusInput,
    elasticityInput,
    randomInput,
    radiusOutput,
    elasticityOutput
  );

  // Add events listeners for handle changes and save in localstorage
  eventsListeners(
    colorInput,
    radiusInput,
    elasticityInput,
    randomInput,
    radiusOutput,
    elasticityOutput,
    removeLastBall,
    removeAllBalls,
    removeFirstBall,
    ballCounts,
    generateRandomButton,
    canvas,
    mouse,
    Ball
  );

  // define Ball object
  function Ball(
    ballId: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    elasticity: number,
    color: string
  ) {
    this.ballId = ballId;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.elasticity = elasticity / 100;
    this.color = color;

    this.update = function (deltaTime: number) {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * this.elasticity;
      } else {
        this.dy += GRAVITY * deltaTime;
      }

      if (
        this.x + this.radius + this.dx > canvas.width ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      } else {
        this.dx *= this.elasticity;
      }

      if (this.dy < 0.1 && this.dy > -0.1) this.dy = 0;
      if (this.dx < 0.1 && this.dx > -0.1) this.dx = 0;

      ballArray.find((ball: BallProps) => {
        var distance = Math.hypot(ball.x - this.x, ball.y - this.y);

        if (
          ball.ballId !== this.ballId &&
          distance <= ball.radius + this.radius
        ) {
          //console.log("hitted!", distance);
          //console.log(ball.x, this.x)

          if (ball.x > this.x) {
            ball.dx += elasticity / 10;
            this.dx -= elasticity / 10;
          } else {
            ball.dx -= elasticity / 10;
            this.dx += elasticity / 10;
          }

          ball.dy = -elasticity / 10;
          this.dy = -this.dy;
          return ball;
        }
      });

      // console.log(
      //   "dx: ",
      //   this.dx,
      //   "dy: ",
      //   this.dy,
      //   "x: ",
      //   this.x,
      //   "y: ",
      //   this.y
      // );

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    };

    this.draw = function () {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    };
  }

  var lastTime = 0;

  // tick function
  function tick(currentTime: number) {
    const deltaTime = currentTime - lastTime;
    // ... update game elements using deltaTime

    if (isNaN(deltaTime)) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < ballArray.length; i++) {
      ballArray[i].update(deltaTime);
    }

    lastTime = currentTime;
    requestAnimationFrame(tick);

    context.beginPath();
    context.arc(
      mouse.x,
      mouse.y,
      +localStorage.getItem("radius"),
      0,
      Math.PI * 2,
      false
    );
    context.fillStyle = "#37474F";
    context.fill();
    context.stroke();
    context.strokeStyle = localStorage.getItem("color");
    context.lineWidth = 3;
    context.closePath();
  }

  requestAnimationFrame(tick);
}
