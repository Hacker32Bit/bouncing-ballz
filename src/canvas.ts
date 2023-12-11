function randomIntFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function canvasInit() {
  const canvas = <HTMLCanvasElement>document.getElementById("gameFrame");
  const context = canvas.getContext("2d");

  // Init mouse position as default
  const mouse: { x: number; y: number } = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  // Init possible colors
  const colors: string[] = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];
  const gravity = 1;
  const friction = 0.95;
  const ballArray = [];

  // Resize the canvas to fill browser window dynamically
  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  // Mouse move event
  window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  // Mouse click event and create ball
  window.addEventListener("click", function (event) {
 
    const { target } = event;
    
    if((target as HTMLElement).id === "gameFrame"){
        var radius = randomIntFromRange(10, 30);
        var color = randomColor(colors);
        var x = event.clientX;
        var y = event.clientY;
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        if (ballArray.length >= 15) ballArray.shift();
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
  });

  function Ball(
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function () {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction;
      } else {
        this.dy += gravity;
      }

      if (
        this.x + this.radius + this.dx > canvas.width ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      } else {
        this.dx *= friction;
      }

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

  function tick(currentTime: number) {
    const deltaTime = currentTime - lastTime;
    // ... update game elements using deltaTime


    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < ballArray.length; i++) {
      ballArray[i].update();
    }

    context.beginPath();
    context.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2, false);
    context.fillStyle = "#37474F";
    context.fill();
    context.closePath();
    

    lastTime = currentTime;
    requestAnimationFrame(tick);    
  }

  tick(lastTime);
}
