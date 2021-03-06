# Connect 4 Logic

[![Build](https://github.com/brajkowski/connect4-logic/actions/workflows/build.yml/badge.svg)](https://github.com/brajkowski/connect4-logic/actions/workflows/build.yml)
[![npm:latest](https://img.shields.io/npm/v/@brajkowski/connect4-logic/latest?color=limegreen&logo=npm)](https://www.npmjs.com/package/@brajkowski/connect4-logic)
[![npm:beta](https://img.shields.io/npm/v/@brajkowski/connect4-logic/beta?logo=npm)](https://www.npmjs.com/package/@brajkowski/connect4-logic)
[![codecov](https://codecov.io/gh/brajkowski/connect4-logic/branch/main/graph/badge.svg?token=ID99K7U143)](https://codecov.io/gh/brajkowski/connect4-logic)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This library provides APIs for manipulating and querying a standard (7x6) game of connect 4.

## Installation

Using npm:

```
$ npm i --save @brajkowski/connect4-logic
```

## Usage

### Standard Behavior

The main class that should be used to manipulate and query the underlying game state is `Logic`.

To begin, instantiate an implementation of `Logic` (currently `BitboardLogic` is the only implementation):

```ts
const logic: Logic = new BitboardLogic();
```

From there, you may perform queries on the game state such as:

```ts
let column = 0;
let result: boolean = logic.canPlaceChip(column);
```

and place chips that belong to a player:

```ts
let landedOnRow = logic.placeChip(Player.One, column); // returns 0.
landedOnRow = logic.placeChip(Player.Two, column); // returns 1.
```

These operations prevent placing chips in non-existent columns (ie: out-of-bounds columns) as well as overflowing a column (ie: a column can only hold 6 chips).

A basic game loop may look like:

```ts
const logic: Logic = new BitboardLogic();
let activePlayer: Player = Player.One;
function gameLoop() {
  while (true) {
    let column = promptActivePlayerForMove();
    if (!logic.canPlaceChip(column)) {
      continue;
    }
    logic.placeChip(activePlayer, column);
    if (logic.didWin(activePlayer)) {
      break;
    }
    swapActivePlayer();
  }
}
```

### Customized Behavior

The `Logic` class provides default connect 4 behavior (ie: chips fall to the bottom of a column and stack), but custom behavior can also be achieved by using the `PlayerState` class:

```ts
let row = 2;
let column = 3;
logic.getPlayerState(Player.One).occupyPosition(row, column);
```

The `PlayerState` operations allow for any chip placement, but are bounds-checked for valid row and column values and prevent duplicate chip placement (ie: trying to place another chip in a position that is already occupied).

## Building from Source

Using npm:

```
$ npm run build
```

will produce the compiled library under `/dist`.

The test suite may also be executed with npm:

```
$ npm test
```

## Future Plans

- Generalize the solution to fit arbitrary game board dimensions
