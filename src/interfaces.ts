export interface BallProps {
  ballId: number,
  x: number,
  y: number,
  dx: number,
  dy: number,
  radius: number,
  elasticity: number,
  color: string,
}

export interface BallFunctuinProps {
  (
    ballId: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    elasticity: number,
    color: string
  ): void,
  new? (Ball: BallProps): () => BallProps;
}

export interface MouseProps {
  x: number;
  y: number;
}
