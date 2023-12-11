import { canvasInit } from "./canvas";
import "./index.css";

const root = document.getElementById("root");
  
root.innerHTML = `
<canvas id="gameFrame">
Your browser does not support the HTML canvas tag.
</canvas> 
<header>
<h1>Bouncing Ballz</h1>
<form>
<div class="form-group">
<label for="color">Color:</label>
<input type="color" id="color" name="color"> 
</div>
<div class="form-group">
<label for="radius">Radius (between 0 and 100 in px):</label>
<input type="range" id="radius" name="radius" min="0" max="100">
</div>
<div class="form-group">
<label for="elasticity">Elasticity (between 0 and 100 in %):</label>
<input type="range" id="elasticity" name="elasticity" min="0" max="100"> 
</div>
</form>
</header>`;

canvasInit()