let climbInput = document.getElementById("climb-time");
let transitionInput = document.getElementById("transition-time");
let timer = document.getElementById("timer");
let phase = document.getElementById("phase");
let startButton = document.getElementById("start-btn");
const climbWarningAudio = document.getElementById("climb-warning");
const transitionEndAudio = document.getElementById("transition-end");

startButton.addEventListener("click", () => {
  let climbTime = Number(climbInput.value);
  let transitionTime = Number(transitionInput.value);

  if (isNaN(climbTime) || climbTime <= 0) {
    phase.textContent = "Please enter a valid climbing time";
    return;
  }

  if (isNaN(transitionTime) || transitionTime <= 0) {
    phase.textContent = "Please enter a valid transition time";
    return;
  }

  phase.textContent = "Climbing";

  let climbCountDown = climbTime;
  let transitionCountDown = transitionTime;
  let intervalId;

  function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function startClimb() {
    phase.textContent = "Climbing";
    climbCountDown = climbTime;
    timer.textContent = formatTime(climbCountDown);

    clearInterval(intervalId);
    intervalId = setInterval(() => {
      climbCountDown--;
      timer.textContent = formatTime(climbCountDown);

      if (climbCountDown === 3) climbWarningAudio.play();

      if (climbCountDown <= 0) {
        clearInterval(intervalId);
        startTransition();
      }
    }, 1000);
  }

  function startTransition() {
    phase.textContent = "Transition";
    transitionCountDown = transitionTime;
    timer.textContent = formatTime(transitionCountDown);

    clearInterval(intervalId);
    intervalId = setInterval(() => {
      transitionCountDown--;
      timer.textContent = formatTime(transitionCountDown);

      if (transitionCountDown === 1) transitionEndAudio.play();

      if (transitionCountDown <= 0) {
        clearInterval(intervalId);
        startClimb();
      }
    }, 1000);
  }

  startClimb();
});
