const numberValues = document.querySelectorAll(".number__counting");
const lastNumberValue = numberValues[numberValues.length - 1];

let interval = 3000

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            numberValues.forEach((numberValue) => {
                let startValue = 1
                let endValue = parseInt(numberValue.getAttribute("data-count"))
                let duration = Math.floor(interval / endValue)
                let counter = setInterval(function () {
                    startValue += 1
                    numberValue.textContent = startValue
                    if (startValue == endValue) {
                        clearInterval(counter)
                        numberValue.textContent = endValue
                        lastNumberValue.textContent = endValue + "+"
                    }
                    counterObserver.unobserve(numberValue);
                }, duration)
            })
        }
    })
})
counterObserver.observe(lastNumberValue)

