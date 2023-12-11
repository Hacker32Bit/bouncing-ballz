import { canvasInit } from "./canvas";
import "./index.css";

const root = document.getElementById("root");
  
root.innerHTML = `
<canvas id="gameFrame">
Your browser does not support the HTML canvas tag.
</canvas> 
<header>
<h1>Bouncing Ballz</h1>
</header>`;

canvasInit()