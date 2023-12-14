import { canvasInit } from "./canvas";
import "./index.css";

const canvasFrame = document.getElementById("canvas-frame");

canvasFrame.innerHTML =
  "<canvas id='gameFrame'>Your browser does not support the HTML canvas tag.</canvas>";

canvasInit();
