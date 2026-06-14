class Ant {
	constructor(col, row) {
		this.col = col;
		this.row = row;
		this.direction = 0;
		this._interval = null;
		this.steps = 0;
	}

	moveForward() {
		switch (this.direction) {
			case 0: this.row--; break;
			case 1: this.col++; break;
			case 2: this.row++; break;
			case 3: this.col--; break;
		}
		this.steps++;
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

	step() {
		const currentGray = flippedTiles.has(`${this.col},${this.row}`);
		if (currentGray) {
			this.turnLeft();
		} else {
			this.turnRight();
		}
		this.moveForward();
	}

	startStepping(ms = 100) {
		if (this._interval) return;
		this._interval = setInterval(() => this.step(), ms);
	}

	stopStepping() {
		if (this._interval) {
			clearInterval(this._interval);
			this._interval = null;
		}
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
