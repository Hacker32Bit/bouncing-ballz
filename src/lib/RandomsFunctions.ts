export function randomIntFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomColor(): string {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}
