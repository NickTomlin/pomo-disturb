function displayNumber (number: number) : string {
  return number <= 9 ? `0${number}` : `${number}`
}

function displayTime (millisecondsLeft: number) {
  let minutes = Math.floor(millisecondsLeft / 60 / 1000)
  let seconds = (millisecondsLeft / 1000) % 60

  return `${displayNumber(minutes)}:${displayNumber(seconds)}`
}

export {displayTime, displayNumber}
