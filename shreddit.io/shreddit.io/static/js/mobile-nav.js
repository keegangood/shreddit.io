let burger = document.querySelector('.hamburger'),
    settingsIcon = document.querySelector('.settings-icon'),
    topBun = document.querySelector('.top-bun'),
    meat = document.querySelector('.meat'),
    bottomBun = document.querySelector('.bottom-bun'),
    cover = document.querySelector('.content-cover'),
    menu = document.querySelector('.mobile-nav-menu');
    navMenuContent = document.querySelector('.mobile-nav-content'),
    settingsMenuContent = document.querySelector('.settings-menu-content'),
    mainContent = document.querySelector('.main-content'),
    messageCloseX = document.querySelector('#message-close-x');

burger.addEventListener('click', () => {
    mainContent.classList.toggle('no-scroll');

    settingsMenuContent.classList.toggle('hidden');
    navMenuContent.classList.toggle('content-inactive');

    burger.classList.toggle('mobile-nav-icon-active');
    settingsIcon.classList.toggle('hidden');
    topBun.classList.toggle('top-bun-active');
    meat.classList.toggle('meat-active');
    bottomBun.classList.toggle('bottom-bun-active');

    cover.classList.toggle('content-cover-active');

    menu.classList.toggle('mobile-menu-active');
});

settingsIcon.addEventListener('click', () => {
    settingsIcon.classList.toggle('mobile-nav-icon-active');
    settingsIcon.classList.toggle('settings-icon-active')
    navMenuContent.classList.toggle('hidden');
    settingsMenuContent.classList.toggle('content-inactive');


    burger.classList.toggle('hidden');

    cover.classList.toggle('content-cover-active');
    menu.classList.toggle('mobile-menu-active');
});

if(messageCloseX){
    messageCloseX.addEventListener('click', () => {
        messageCloseX.parentElement.remove();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
});