const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
	if (ant._interval) {
		ant.stopStepping();
		startBtn.textContent = "Start";
	} else {
		ant.startStepping(50);
		startBtn.textContent = "Stop";
	}
});
