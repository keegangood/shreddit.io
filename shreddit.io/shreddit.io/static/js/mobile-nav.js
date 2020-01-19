let burger = document.querySelector('.hamburger'),
    topBun = document.querySelector('.top-bun'),
    meat = document.querySelector('.meat'),
    bottomBun = document.querySelector('.bottom-bun'),
    cover = document.querySelector('.content-cover'),
    menu = document.querySelector('.mobile-nav-menu');
    mainContent = document.querySelector('.main-content');

burger.addEventListener('click', () => {
    mainContent.classList.toggle('no-scroll');

    burger.classList.toggle('hamburger-active');

    topBun.classList.toggle('top-bun-active');
    meat.classList.toggle('meat-active');
    bottomBun.classList.toggle('bottom-bun-active');

    cover.classList.toggle('content-cover-active');

    menu.classList.toggle('mobile-menu-active');

});

