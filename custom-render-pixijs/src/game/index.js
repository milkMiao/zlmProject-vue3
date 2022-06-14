import { Application } from "pixi.js";

export const game = new Application({
  width: 600,
  height: 400,
});

document.body.append(game.view);

export function getRootContainer() {
  return game.stage;
}