class Ant {
	constructor(col, row) {
		this.col = col;
		this.row = row;
		this.direction = 0;
	}

	moveForward() {
		switch (this.direction) {
			case 0: this.row--; break;
			case 1: this.col++; break;
			case 2: this.row++; break;
			case 3: this.col--; break;
		}
		draw();
	}

	turnLeft() {
		this.direction = (this.direction + 3) % 4;
		flipTile(this.col, this.row);
	}

	turnRight() {
		this.direction = (this.direction + 1) % 4;
		flipTile(this.col, this.row);
	}

	getFrontTileColor() {
		let fc = this.col;
		let fr = this.row;
		switch (this.direction) {
			case 0: fr--; break;
			case 1: fc++; break;
			case 2: fr++; break;
			case 3: fc--; break;
		}
		return flippedTiles.has(`${fc},${fr}`) ? "#888888" : "#FFFFFF";
	}
}
