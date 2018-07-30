function displayNumber(num: number): string {
  return num <= 9 ? `0${num}` : `${num}`
}

function displayTime(millisecondsLeft: number) {
  const minutes = Math.floor(millisecondsLeft / 60 / 1000)
  const seconds = (millisecondsLeft / 1000) % 60

  return `${displayNumber(minutes)}:${displayNumber(seconds)}`
}

export { displayTime, displayNumber }
