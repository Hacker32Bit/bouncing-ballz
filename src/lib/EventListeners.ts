import { ballArray, incBallId } from "../canvas";
import { BallFunctuinProps, BallProps, MouseProps } from "../interfaces";
import { getRandomColor, randomIntFromRange } from "./RandomsFunctions";

export function eventsListeners(
  colorInput: HTMLElement,
  radiusInput: HTMLElement,
  elasticityInput: HTMLElement,
  randomInput: HTMLElement,
  radiusOutput: HTMLElement,
  elasticityOutput: HTMLElement,
  removeLastBall: HTMLElement,
  removeAllBalls: HTMLElement,
  removeFirstBall: HTMLElement,
  ballCounts: HTMLElement,
  generateRandomButton: HTMLElement,
  canvas: HTMLCanvasElement,
  mouse: MouseProps,
  Ball: BallFunctuinProps,
) {
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
  removeLastBall.addEventListener("click", () => {
    ballArray.shift();
    ballCounts.innerHTML = ballArray.length;
  });
  removeFirstBall.addEventListener("click", () => {
    ballArray.pop();
    ballCounts.innerHTML = ballArray.length;
  });
  removeAllBalls.addEventListener("click", () => {
    ballArray.length = 0;
    ballCounts.innerHTML = ballArray.length;
  });

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
        //@ts-ignore
        new Ball(incBallId(), x, y, dx, dy, radius, elasticity, color)
      );

      ballCounts.innerHTML = ballArray.length;

      if (localStorage.getItem("random") !== "false") {
        generateRandomButton.click();
      }
    }
  });
}
