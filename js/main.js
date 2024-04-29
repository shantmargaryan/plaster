const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const calc = document.querySelector(".main__calculator");
const calcBtn = document.querySelector(".nav__Calculator");
const overlay = document.querySelector(".main__overlay");
const sendForm = document.querySelector(".main__form");
const formInput = document.querySelector(".main__input");
const requestBtn = document.querySelector(".header__btn");
const requestCall = document.querySelector(".main__request-call");


document.addEventListener("click", (e) => {
    if (e.target.closest(".nav__Calculator")) {
        calc.classList.add("main__calculator_active");
        overlay.classList.add("main__overlay_active");
    } else if (e.target.closest(".main__overlay")) {
        calc.classList.remove("main__calculator_active");
        overlay.classList.remove("main__overlay_active");

    }
    if (e.target.closest(".header__btn")) {
        requestCall.classList.add("main__request-call_active");
        overlay.classList.add("main__overlay_active");
    } else if (e.target.closest(".main__overlay")) {
        requestCall.classList.remove("main__request-call_active");
        overlay.classList.remove("main__overlay_active");
    }
})


function menu() {
    let nav = document.querySelector(".nav");
    nav.classList.toggle("show");
    if (nav.classList.contains("show")) {
        document.querySelector(".main").style.paddingTop = nav.querySelector(".nav__list").offsetHeight + "px";
    } else {
        document.querySelector(".main").style.paddingTop = "";
    }
}
document.querySelector(".burger").addEventListener("click", menu);

const mediaQueryMinWidth_992 = window.matchMedia('(min-width: 992px)');
mediaQueryMinWidth_992.addEventListener("change", (e) => {
    if (e.matches) {
        nav.classList.remove("show");
        document.querySelector(".main").style.paddingTop = "";
    }
});

if (document.querySelector(".hero__swiper") || document.querySelector(".materials__swiper") || document.querySelector(".gallery__swiper")) {
    let heroSwiper = new Swiper(".hero__swiper", {
        spaceBetween: 20,
        pagination: {
            clickable: true,
            el: ".swiper-pagination",
        },
        autoplay: {
            delay: 3000,
        },
        mousewheel: true,
    });
    let materialsSwiper = new Swiper(".materials__swiper", {
        cssMode: true,
        spaceBetween: 20,
        breakpoints: {
            600: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            clickable: true,
            el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
    });
    let gallerySwiper = new Swiper(".gallery__swiper", {
        spaceBetween: 20,
        breakpoints: {
            600: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + "</span>";
                },
            },
        },
    });
}

if (document.querySelector(".tabs")) {
    new Tabs('tab1', {
        firstTabActive: true,
        isChanged(tabs) {
            console.log(tabs);
        },
    })
}
const priceText = document.querySelector("[data-price-text]");
const price = document.querySelector("[data-price]");
const chackbox = document.querySelectorAll(".calculator__checkbox");
const inputRange = document.querySelectorAll(".calculator__input")
const merter = document.querySelectorAll(".calculator__meter");
function range() {
    for (let i = 0; i < inputRange.length; i++) {
        inputRange[i].addEventListener("input", function () {
            merter[0].textContent = inputRange[0].value + " m2"
            merter[1].textContent = inputRange[1].value + " mm"
        });
    }
    chackbox[0].addEventListener("input", function (e) {
        if (chackbox[0].checked) {
            price.textContent = (inputRange[0].value * inputRange[1].value * 650).toFixed(0) + " руб."
        } else {
            price.textContent = "0"
        }
    })
}

range();


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})