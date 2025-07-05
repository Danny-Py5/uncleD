const header = document.getElementById("header");
const headerNav = header.querySelector(".header__nav");
const headerLogin = header.querySelector(".header__login");
const headerMenuCont = header.querySelector(".header__drop-menu-cont");
const headerLogoCont = header.querySelector(".header__logo-cont");

const slider = document.querySelector(".category-cont");
let isMouseDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    // slider.classList.add("active"); // optional for styling
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
    isMouseDown = false;
    slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
    isMouseDown = false;
    slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault(); // stops text/image selection
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
});

document.querySelector(".header__drop-menu").addEventListener("click", () => {
    // [headerNav, headerLogin, headerMenuCont, headerLogoCont].forEach((elem) => {
    //     elem.classList.toggle("active");
    // });
    [headerNav, headerMenuCont].forEach((elem) => {
        elem.classList.toggle("active");
    });
});

window.addEventListener("resize", (e) => {
    removeActiveOnHeader();
});

header.querySelectorAll(".header__a").forEach((link) => {
    link.addEventListener("click", removeActiveOnHeader);
});

document.querySelectorAll(".faq__expand-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
        handleQuestions(button);
    });
});
document.querySelectorAll(".question__wrapper").forEach((question) => {
    question.addEventListener("click", (e) => {
        handleQuestions(question);
    });
});

function removeActiveOnHeader() {
    // [headerNav, headerLogin, headerMenuCont, headerLogoCont].forEach((elem) => {
    //     elem.classList.remove("active");
    // });
    [headerNav, headerMenuCont].forEach((elem) => {
        elem.classList.remove("active");
    });
}

let lastLastExpandedQuestion = undefined;
let currentExpandedQuestion = undefined;

function handleQuestions(element) {
    currentExpandedQuestion = element;

    closeLastExpandedQuestion();
    if (element.getAttribute("data-isExpanded") == "false") {
        element.setAttribute("data-isExpanded", true);

        document.querySelector(
            `.answer-${element.getAttribute("data-id")}`
        ).style.display = "block";

        // change + sign to x;
        element.classList.contains("question__wrapper")
            ? (element.firstChild.nextElementSibling.children[1].innerText =
                  "x")
            : (element.innerText = "x");

        lastLastExpandedQuestion = element;
    } else {
        hideQuestion(element);
    }
}

function closeLastExpandedQuestion() {
    if (
        lastLastExpandedQuestion &&
        currentExpandedQuestion.getAttribute("data-id") !==
            lastLastExpandedQuestion.getAttribute("data-id")
    ) {
        hideQuestion(lastLastExpandedQuestion);
    }
}

function hideQuestion(question) {
    question.setAttribute("data-isExpanded", "false");
    document.querySelector(
        `.answer-${question.getAttribute("data-id")}`
    ).style.display = "none";

    // change x sign to +;
    question.classList.contains("question__wrapper")
        ? (question.firstChild.nextElementSibling.children[1].innerText = "+")
        : (question.innerText = "+");
}
