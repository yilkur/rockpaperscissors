const playerScoreDisplay = document.getElementById('player-score')
const computerScoreDisplay = document.getElementById('computer-score')
const playerMoveDisplay = document.getElementById('player-move')
const computerMoveDisplay = document.getElementById('computer-move')
const resultDisplay = document.getElementById('result')
const resetBtn = document.getElementById('reset-btn')
const buttons = [...document.getElementsByClassName('move')]

let playerScore
let computerScore

const initGame = () => {
  playerScore = 0
  computerScore = 0
  playerScoreDisplay.textContent = 0
  computerScoreDisplay.textContent = 0
  playerMoveDisplay.textContent = ''
  computerMoveDisplay.textContent = ''
  resultDisplay.textContent = ''
  buttons.forEach(button => (button.disabled = false))
  resetBtn.style.display = 'none'
}

initGame()

const resetGame = () => {
  resetBtn.style.display = 'block'
  resetBtn.addEventListener('click', initGame)
}

const endGame = () => {
  buttons.forEach(button => (button.disabled = true))
  if (playerScore > computerScore) {
    resultDisplay.textContent = 'Player Wins!'
  } else {
    resultDisplay.textContent = 'Computer Wins!'
  }

  resetGame()
}

const computerPlay = () => {
  const moves = ['ROCK', 'PAPER', 'SCISSORS']
  const randomNum = Math.floor(Math.random() * moves.length)

  return moves[randomNum]
}

const playRound = (playerMove, computerMove) => {
  playerMoveDisplay.textContent = playerMove
  computerMoveDisplay.textContent = computerMove
  let resultTxt = ''

  if (playerMove === computerMove) {
    resultTxt = `It's a draw`
    resultDisplay.textContent = resultTxt
    return
  }

  if (
    (playerMove === 'ROCK' && computerMove === 'SCISSORS') ||
    (playerMove === 'SCISSORS' && computerMove === 'PAPER') ||
    (playerMove === 'PAPER' && computerMove === 'ROCK')
  ) {
    playerScore++
    playerScoreDisplay.textContent = playerScore
    resultTxt = 'Player scores!'
  } else {
    computerScore++
    computerScoreDisplay.textContent = computerScore
    resultTxt = 'Computer scores!'
  }

  resultDisplay.textContent = resultTxt
}

const game = playerMove => {
  playRound(playerMove, computerPlay())
	if (playerScore === 5 || computerScore === 5) {
    endGame()
  }
}

buttons.forEach(button =>
  button.addEventListener('click', () => game(button.innerText))
)
