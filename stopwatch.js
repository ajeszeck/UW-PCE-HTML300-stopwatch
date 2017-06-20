//button controls
const start = document.querySelector("button.start")
const stop = document.querySelector("button.stop")
const lap = document.querySelector("button.lap")
//DOM elements that I need to update
const lapList = document.querySelector("#laplist")
const stopwatch = document.querySelector("#stopwatch")

//constants that I should never change
const laps = []
const intervalRate = 10 //every 10 ms

//values that will change pretty often
let intervalId = null
let rawTime = 0



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
  console.log("started")

  //every ten milliseconds, update the stopwatch
  intervalId = setInterval(stopwatchUpdate, intervalRate)
}

//stops the stopwatch by clearing the interval
function stopwatchStop(event) {
  event.preventDefault()
  console.log("stopped")
  //clear the interval
  clearInterval(intervalId)
}

//lap function to take a snapshot time when button is clicked
//adds to lapList div
function lapRecorder() {
  event.preventDefault();
  console.log("lap recorded!");
  let currentTime = stopwatchTime.innerHTML;
  laps.push(currentTime);
  lapList.innerHTML = "";

  for (var i = 0; i < laps.length; i++) {
    var currentLap = laps[i];
    var li = document.createElement("li");
    li.innerHTML = currentLap;
    lapList.appendChild(li);
  }
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
})
