// src/models/hit-dice.model.ts

import { HitDiceType } from "../../../shared/constants/character.constants";

export class HitDice {
  readonly dice: HitDiceType;
  readonly quantity: number;

  constructor(dice: HitDiceType, quantity: number) {
    this.dice = dice;
    this.quantity = quantity;
  }
}
