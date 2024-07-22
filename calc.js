// Variables before DOM
const clearBtn = document.querySelector(".clearBtn")
const deleteBtn = document.querySelector(".deleteBtn")
const first = document.querySelector(".first")
const second = document.querySelector(".second")
let current = first
let operator = ""
let num
const btnList = ["7", "8", "9", "÷", "4", "5", "6", "x", "1", "2", "3", "-", ".", "0", "=", "+"]
// DOM
let i = 0
while (i < 16) {
    let btn = document.createElement("button")
    btn.classList.add("btn")
    if(i === 3 || i === 7 || i === 11 || i === 15) {
        btn.classList.add("operator")
    } else if(i !== 12 && i !== 14) {
        btn.classList.add("num")
    }
    if(i === 12) btn.classList.add("dot")
    if(i === 14) btn.classList.add("equal") 
    document.querySelector(".btnWrapper").appendChild(btn)
    btn.textContent = btnList[i];
    i++
}

// Variables Afer DOM
const nums = Array.from(document.querySelectorAll(".num"))
const operators = Array.from(document.querySelectorAll(".operator"))
const dot = document.querySelector(".dot")
const equal = document.querySelector(".equal")

// Listeners

nums.forEach((item) => {
    item.addEventListener("click", () => {
        current.textContent += item.textContent
    })
})

operators.forEach((item) => {
    item.addEventListener("click", () => {
        if(current === first && current.textContent !== "") {
            operator = item.textContent
            current = second
        } else if (current === second && current.textContent !== "") {
            num = operate(parseFloat(first.textContent), parseFloat(second.textContent), operator)
            clear()
            current = second
            first.textContent += num.toString()
            operator = item.textContent
        }
    })
})

dot.addEventListener("click", () => {
    if(!current.textContent.includes(".")) {current.textContent += "."} else {return}
})

clearBtn.addEventListener("click", clear)

equal.addEventListener("click", () => {
    let num = operate(parseFloat(first.textContent), parseFloat(second.textContent), operator)
    clear()
    current.textContent += num.toString()
})

deleteBtn.addEventListener("click", () => {
    if(current === second && second.textContent === ""){
        operator = ""
        current = first
    }
    current.textContent = current.textContent.slice(0, -1)
})

// Global Functions

function clear() {
    first.textContent = ""
    second.textContent = ""
    current = first
}

function operate(fNum, sNum, operator) {
    switch(operator) {
        case "+": return fNum + sNum
        case "-": return fNum - sNum
        case "x": return fNum * sNum
        case "÷": return fNum / sNum
    }
}