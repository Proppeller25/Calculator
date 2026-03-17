const inputElement = document.querySelector('#inputElement')
const buttons = document.querySelectorAll('button')
const temporaryResultdiv = document.querySelector('.temporaryResult')

let calculatorArr = []

let currentInputValue = ''
const checkInput = () => {
  if (inputElement.value.length > 8) {
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
    if (!button.classList.contains('operator') && inputElement.value.length < 8) inputElement.value += button.textContent
    else if (button.classList.contains('operator')) {
      if (button.textContent === 'C') {
        inputElement.value = ''
        return
      }
      else if (button.textContent === 'AC') {
        calculatorArr = []
        updateTempDiv()
      }
      else if (button.textContent === '=') {
        calculatorArr.push(inputElement.value)
        inputElement.value = calculate()
        temporaryResultdiv.textContent = ''
        return
      }
      else {
        calculatorArr.push(inputElement.value)
        calculatorArr.push(button.textContent)
        inputElement.value = ''
        updateTempDiv()
      }  
      
    }
  })
})




 

const calculate = () => {
  let total = 0
  let operator = null

  calculatorArr.forEach((token, i) => {

    if (isNaN(Number(token))) operator = token
    else if (!isNaN(Number(token))){
      if (i < 1) total = Number(token)
      else {
       if (operator === '+') total += Number(token)
       else if (operator === '—') total -= Number(token)
       else if (operator === '*') total = total * Number(token)
       else if (operator ==='/') total = total / Number(token) 
      }
    }
  })
  return total
}

const updateTempDiv  = () => {
  temporaryResultdiv.textContent = ''
  temporaryResultdiv.textContent += calculate()
}

