const inputElement = document.querySelector('#inputElement')
const buttons = document.querySelectorAll('button')

let currentInputValue = ''
const checkInput = () => {
  if (inputElement.value.length > 8) {
    console.log('Exceeded Limit')
    inputElement.value = inputElement.value.slice(0, 8)
  }
   else console.log('Okay')
}




inputElement.addEventListener('input', checkInput)
inputElement.addEventListener('keydown', (event) => {
  if (isNaN(event.key) &&  event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Tab' && event.key !== '.') {event.preventDefault(); console.log(event.key)}
})


buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!button.classList.contains('operator') && inputElement.value.length < 8)currentInputValue += button.textContent
    else console.log('This is an operator')
    inputElement.value = currentInputValue
  })
})
