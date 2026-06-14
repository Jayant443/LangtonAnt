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
}
