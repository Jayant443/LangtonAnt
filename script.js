const canvas = document.getElementById("grid-canvas");
const ctx = canvas.getContext("2d");

const cellSize = 20;
let zoom = 1;

let offsetX = 0;
let offsetY = 0;

const flippedTiles = new Set();

function flipTile(col, row) {
	const key = `${col},${row}`;
	if (flippedTiles.has(key)) return;
	flippedTiles.add(key);
	draw();
}

function getSize() {
	return cellSize * zoom;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const size = getSize();

	const startCol = Math.floor(offsetX / size);
	const endCol = startCol + Math.ceil(canvas.width / size) + 2;

	const startRow = Math.floor(offsetY / size);
	const endRow = startRow + Math.ceil(canvas.height / size) + 2;

	for (let row = startRow; row < endRow; row++) {
		for (let col = startCol; col < endCol; col++) {
			const x = col * size - offsetX;
			const y = row * size - offsetY;
			ctx.fillStyle = flippedTiles.has(`${col},${row}`) ? "#888888" : "#FFFFFF";
			ctx.fillRect(x, y, size, size);
		}
	}

	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.beginPath();
	for (let row = startRow; row <= endRow; row++) {
		const y = row * size - offsetY;
		ctx.moveTo(0, y + 0.5);
		ctx.lineTo(canvas.width, y + 0.5);
	}
	for (let col = startCol; col <= endCol; col++) {
		const x = col * size - offsetX;
		ctx.moveTo(x + 0.5, 0);
		ctx.lineTo(x + 0.5, canvas.height);
	}
	ctx.stroke();
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	draw();
}

window.addEventListener("resize", resize);
resize();

canvas.addEventListener("wheel", e => {
	e.preventDefault();

	const size = getSize();
	const mx = e.clientX;
	const my = e.clientY;

	const gridX = (mx + offsetX) / size;
	const gridY = (my + offsetY) / size;

	const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
	zoom = Math.min(5, Math.max(0.2, zoom * factor));

	const newSize = getSize();
	offsetX = gridX * newSize - mx;
	offsetY = gridY * newSize - my;

	draw();
}, { passive: false });

let dragging = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", e => {
	dragging = true;
	lastX = e.clientX;
	lastY = e.clientY;
});

window.addEventListener("mouseup", e => {
	dragging = false;
});

window.addEventListener("mousemove", e => {
	if (!dragging) return;

	offsetX -= e.clientX - lastX;
	offsetY -= e.clientY - lastY;

	lastX = e.clientX;
	lastY = e.clientY;

	draw();
});