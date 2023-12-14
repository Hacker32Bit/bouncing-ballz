function randomIntFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor(): string {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

export function canvasInit() {
  // Check if params exits in local storage. If not init defaults values
  if (!localStorage.getItem("color")) localStorage.setItem("color", "#9C27B0");
  if (!localStorage.getItem("radius")) localStorage.setItem("radius", "50");
  if (!localStorage.getItem("elasticity"))
    localStorage.setItem("elasticity", "50");
  if (!localStorage.getItem("random")) localStorage.setItem("random", "false");

  // get inputs elements
  const colorInput = document.getElementById("color");
  const radiusInput = document.getElementById("radius");
  const elasticityInput = document.getElementById("elasticity");
  const randomInput = document.getElementById("random");
  const generateRandomButton = document.getElementById("generateRandom");
  const radiusOutput = document.getElementById("radiusOutput");
  const elasticityOutput = document.getElementById("elasticityOutput");

  // Init inputs values from localStorage
  (colorInput as HTMLInputElement).value = localStorage.getItem("color");
  (radiusInput as HTMLInputElement).valueAsNumber =
    +localStorage.getItem("radius");
  (elasticityInput as HTMLInputElement).valueAsNumber =
    +localStorage.getItem("elasticity");
  radiusOutput.innerHTML = localStorage.getItem("radius");
  elasticityOutput.innerHTML = localStorage.getItem("elasticity");

  // Add events listeners for handle changes and save in localstorage
  colorInput.addEventListener("input", (event) => {
    const { target } = event;
    localStorage.setItem("color", (target as HTMLInputElement).value);
    console.log("Color: ", localStorage.getItem("color"));
  });
  radiusInput.addEventListener("input", (event) => {
    const { target } = event;
    localStorage.setItem(
      "radius",
      (target as HTMLInputElement).valueAsNumber.toString()
    );
    radiusOutput.innerHTML = localStorage.getItem("radius");
    console.log("Radius: ", localStorage.getItem("radius"));
  });
  elasticityInput.addEventListener("input", (event) => {
    const { target } = event;
    localStorage.setItem(
      "elasticity",
      (target as HTMLInputElement).valueAsNumber.toString()
    );
    elasticityOutput.innerHTML = localStorage.getItem("elasticity");
    console.log("Elasticity: ", localStorage.getItem("elasticity"));
  });
  randomInput.addEventListener("input", (event) => {
    const { target } = event;
    localStorage.setItem(
      "random",
      (target as HTMLInputElement).checked.toString()
    );
    console.log("Random: ", localStorage.getItem("random"));
  });
  generateRandomButton.addEventListener("click", () => {
    let colorOutput = document.getElementById("color");

    let randomColor = getRandomColor();
    let randomRadius = randomIntFromRange(5, 100).toString();
    let randomElasticity = randomIntFromRange(5, 100).toString();

    localStorage.setItem("color", randomColor);
    localStorage.setItem("radius", randomRadius);
    localStorage.setItem("elasticity", randomElasticity);

    //console.log(radiusOutput);
    (colorOutput as HTMLInputElement).value = localStorage.getItem("color");
    (radiusInput as HTMLInputElement).value = localStorage.getItem("radius");
    (elasticityInput as HTMLInputElement).value =
      localStorage.getItem("elasticity");
    radiusOutput.innerHTML = localStorage.getItem("radius");
    elasticityOutput.innerHTML = localStorage.getItem("elasticity");
  });

  const canvas = <HTMLCanvasElement>document.getElementById("gameFrame");
  const context = canvas.getContext("2d");

  // Init mouse position as default
  const mouse: { x: number; y: number } = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  // Init const gravity, ballId and ballArray;
  const GRAVITY = 0.098;
  var ballId = 0;
  const ballArray: any = [];

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

    if ((target as HTMLElement).id === "gameFrame") {
      var color = localStorage.getItem("color");
      var radius = +localStorage.getItem("radius");
      var elasticity = +localStorage.getItem("elasticity");
      var x = event.clientX;
      var y = event.clientY;
      var dx = 0;
      var dy = 0;
      if (ballArray.length >= 15) ballArray.shift();
      ballArray.push(
        new Ball(ballId++, x, y, dx, dy, radius, elasticity, color)
      );

      if (localStorage.getItem("random") !== "false") {
        generateRandomButton.click();
      }
    }
  });

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

      ballArray.find((ball) => {
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

  tick(lastTime);
}
