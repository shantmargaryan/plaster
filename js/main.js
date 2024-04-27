const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const calc = document.querySelector(".main__calculator");
const calcBtn = document.querySelector(".nav__Calculator");
const overlay = document.querySelector(".main__overlay");


document.addEventListener("click", (e) => {
    if (e.target.closest(".nav__Calculator")) {
        calc.classList.add("main__calculator_active");
        overlay.classList.add("main__overlay_active");
    } else if (e.target.closest(".main__overlay")) {
        calc.classList.remove("main__calculator_active");
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

let heroSwiper = new Swiper(".hero__swiper", {
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

new Tabs('tab1', {
    firstTabActive: true,
    isChanged(tabs) {
        console.log(tabs);
    },
})

const inputRange = document.querySelectorAll(".calculator__input");
const merter = document.querySelectorAll(".calculator__meter");
function range() {
    for (let i = 0; i < inputRange.length; i++) {
        inputRange[i].addEventListener("input", function () {
            merter[0].textContent = inputRange[0].value + " m2"
            merter[1].textContent = inputRange[1].value + " mm"
        });
    }
}

range();