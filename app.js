const header = document.getElementById('header');
const headerNav = header.querySelector('.header__nav');
const headerLogin = header.querySelector('.header__login');
const headerMenuCont = header.querySelector('.header__drop-menu-cont');
const headerLogoCont = header.querySelector('.header__logo-cont');

document.querySelector('.header__drop-menu').addEventListener('click', () => {
    [headerNav, headerLogin, headerMenuCont, headerLogoCont]
        .forEach(elem => {
            elem.classList.toggle('active');
        });
})

window.addEventListener('resize', (e) => {
    removeActiveOnHeader();
})

header.querySelectorAll('.header__a').forEach(link => {
    link.addEventListener('click', removeActiveOnHeader)
})

function removeActiveOnHeader() {
    [headerNav, headerLogin, headerMenuCont, headerLogoCont]
        .forEach(elem => {
            elem.classList.remove('active');
        });
}

