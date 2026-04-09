const inputElement = document.querySelector('#inputElement')
const buttons = document.querySelectorAll('button')
const temporaryResultdiv = document.querySelector('.temporaryResult')
const historyDiv = document.querySelector('.historyDiv')
const historyButtonDiv = document.querySelector('.historyButtonDiv')
const keysContainer = document.querySelector('.keysContainerDiv')

let calculatorArr = []
let today = new Date()
let storageArr = JSON.parse(localStorage.getItem('previousCalc')) || []

const foundDuplicate = storageArr.find(item => item.date === today.toLocaleDateString())

const checkInput = () => {
  if (inputElement.value.length > 8) {
    inputElement.value = inputElement.value.slice(0, 8)
  }
   else ''
}




inputElement.addEventListener('input', checkInput)



buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!button.classList.contains('operator') && inputElement.value.length < 8) inputElement.value += button.textContent
    else if (button.classList.contains('operator')) {
      if (button.textContent === 'C') {
        inputElement.value = ''
        return
      }
      else if (button.textContent === 'AC') {
        inputElement.value = ''
        calculatorArr = []
        updateTempDiv()
      }
      else if (button.textContent === '=') {
        calculatorArr.push(inputElement.value)

        if (!foundDuplicate) {
          storageArr.push ({
            date:today.toLocaleDateString(),
            entries: [{expression: calculatorArr.join(' '), result: calculate(), time: today.toLocaleTimeString()}]
          })
          localStorage.setItem('previousCalc', JSON.stringify(storageArr))
          displayHistory()
        } 
        else if (foundDuplicate) {
          console.log(foundDuplicate)
          foundDuplicate.entries.push({
            expression: calculatorArr.join(' '),
            result: calculate(),
            time: today.toLocaleTimeString()
          })
          localStorage.setItem('previousCalc', JSON.stringify(storageArr))
          displayHistory()
        }

        localStorage.setItem('previousCalc', JSON.stringify(storageArr))
        inputElement.value = calculate()
        temporaryResultdiv.textContent = ''
        calculatorArr = []
        return
      }
      else {
        calculatorArr.push(Number(inputElement.value))
        calculatorArr.push(button.textContent)
        inputElement.value = ''
        updateTempDiv()
        displayHistory()
      }  
      
    }
  })
})

historyButtonDiv.addEventListener('click', () => {
  console.log('history clicked')
  historyDiv.classList.toggle('display')
  keysContainer.classList.toggle('display')
})


inputElement.addEventListener('keydown', () => {
  if (historyDiv.classList.contains('display')) return
  historyDiv.classList.toggle('display')
  keysContainer.classList.toggle('display')
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
       else if (operator === '%') total = total * (Number(token) / 100)
      }
    }
  })
  return total
}

const updateTempDiv  = () => {
  temporaryResultdiv.textContent = ''
  temporaryResultdiv.textContent += calculate()
}

const displayHistory = () => {
  historyDiv.innerHTML = ''
  if (storageArr.length < 1) historyDiv.innerHTML = `<div>No History</div>` 
  storageArr.forEach((data) => {
    let entryHtml = ``
    data.entries.forEach((entry) => {
      entryHtml += `<div>${entry.expression} =</div>
      <div class = 'historyEntry'>${entry.result}</div>`
    })

    historyDiv.innerHTML += `<div >${data.date}</div>
      <hr>
      ${entryHtml}
      <hr>
      ` 
  })
}

//enter button is equivalent to equals to (=)
window.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.key === 'Enter' && calculatorArr.length > 0) {  
    calculatorArr.push(inputElement.value)
    if (!foundDuplicate) {
      storageArr.push ({
        date:today.toLocaleDateString(),
        entries: [{expression: calculatorArr.join(' '), result: calculate(), time: today.toLocaleTimeString()}]
      })
      localStorage.setItem('previousCalc', JSON.stringify(storageArr))
      displayHistory()
    } 
    else if (foundDuplicate) {
      console.log(foundDuplicate)
      foundDuplicate.entries.push({
        expression: calculatorArr.join(' '),
        result: calculate(),
        time: today.toLocaleTimeString()
      })
      localStorage.setItem('previousCalc', JSON.stringify(storageArr))
      displayHistory()
    }

    localStorage.setItem('previousCalc', JSON.stringify(storageArr))
    inputElement.value = calculate()
    temporaryResultdiv.textContent = ''
    calculatorArr = []
    return
  }
})

displayHistory()

