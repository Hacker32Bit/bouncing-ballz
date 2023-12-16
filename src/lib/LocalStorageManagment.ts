export function initLocalStorage() {
  if (!localStorage.getItem("color")) localStorage.setItem("color", "#9C27B0");
  if (!localStorage.getItem("radius")) localStorage.setItem("radius", "50");
  if (!localStorage.getItem("elasticity"))
    localStorage.setItem("elasticity", "50");
  if (!localStorage.getItem("random")) localStorage.setItem("random", "false");
}

export function getLocalStorage<getLocalStorageProps>(
  colorInput: HTMLElement,
  radiusInput: HTMLElement,
  elasticityInput: HTMLElement,
  randomInput: HTMLElement,
  radiusOutput: HTMLElement,
  elasticityOutput: HTMLElement
) {
  (colorInput as HTMLInputElement).value = localStorage.getItem("color");
  (radiusInput as HTMLInputElement).valueAsNumber =
    +localStorage.getItem("radius");
  (elasticityInput as HTMLInputElement).valueAsNumber =
    +localStorage.getItem("elasticity");
  (randomInput as HTMLInputElement).checked =
    localStorage.getItem("random") !== "false" ? true : false;
  radiusOutput.innerHTML = localStorage.getItem("radius");
  elasticityOutput.innerHTML = localStorage.getItem("elasticity");
}
