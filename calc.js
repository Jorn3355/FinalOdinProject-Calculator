// Variables
const btnList = ["7", "8", "9", "÷", "4", "5", "6", "x", "1", "2", "3", "-", ".", "0", "=", "+"]
const clearBtn = document.querySelector(".clearBtn")
const deleteBtn = document.querySelector(".deleteBtn")
const first = document.querySelector(".first")
const second = document.querySelector(".second")
const dot = document.querySelector(".dot")
let current = first
let operator = ""
let num

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

const nums = Array.from(document.querySelectorAll(".num"))
nums.forEach((item) => {
    item.addEventListener("click", () => {
        current.textContent += item.textContent
    })
})

const operators = Array.from(document.querySelectorAll(".operator"))
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

clearBtn.addEventListener("click", clear())

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