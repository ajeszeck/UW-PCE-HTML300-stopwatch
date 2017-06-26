//button controls
const start = document.querySelector("button.start")
const stop = document.querySelector("button.stop")
const lap = document.querySelector("button.lap")
const reset = document.querySelector("button.reset")
//DOM elements that I need to update
const lapList = document.querySelector("#lapList")
const stopwatch = document.querySelector("#stopwatchTime")

//constants that I should never change
var laps = []
const intervalRate = 10 //every 10 ms

//values that will change pretty often
let intervalId = null
let rawTime = 0

var clicked = false;
var stopClick = false;
// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}
//starts stopwatch by creating a new intervalId
//we will store the interval id so we can manipulate interval later
function stopwatchStart(event) {
  event.preventDefault()
  if (clicked == false) {
    console.log("started")
    //every ten milliseconds, update the stopwatch
    intervalId = setInterval(stopwatchUpdate, intervalRate)
    clicked = true
    stopClick = false;
  }

}

//stops the stopwatch by clearing the interval
function stopwatchStop(event) {
  event.preventDefault()
  clicked = false
  console.log("stopped")
  //clear the interval
  clearInterval(intervalId)
  stopClick = true;
}

//lap function to take a snapshot time when button is clicked
//adds to lapList div
function lapRecorder() {
  event.preventDefault();
  if (stopClick == false) {
    console.log("lap recorded!");
    let currentTime = stopwatchTime.innerHTML;
    laps.push(currentTime);
    lapList.innerHTML = "";
    for (var i = 0; i < laps.length; i++) {
      var ul = document.createElement("ul");
      var currentLap = laps[i];
      var li = document.createElement("li");
      li.innerHTML = currentLap;
      ul.appendChild(li);
      lapList.appendChild(ul);
    }
  }
}

function resetWatch () {
  console.log("reset!");
  clearInterval(intervalId);
  laps = [];
  lapList.innerHTML = "";
  rawTime = 0;
  stopwatchTime.innerHTML = formatTime(rawTime);
  clicked = false;
}
//adds the interval to the stopwatch time since the last tick.
//then update the dom with the new stopwatch time
function stopwatchUpdate() {
  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')
  start.addEventListener("click", stopwatchStart)
  stop.addEventListener("click", stopwatchStop)
  lap.addEventListener("click", lapRecorder)
  reset.addEventListener("click", resetWatch)
})
