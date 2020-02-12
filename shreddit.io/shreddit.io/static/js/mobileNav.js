let toggleActiveNav = mediaQuery => {
    let navBars = document.querySelectorAll('.navigation'),
        navBar;
    
    console.log(navBars);
    
    if(mediaQuery.matches){
        navBar = navBars[1];
        navBar.classList.toggle('active-nav');

    } else {
        navBar = navBars[0];
        navBar.classList.toggle('active-nav');
    }


}

// listen for screen width changes
// mediaQuery = window.matchMedia("(min-width: 768px)");
// mediaQuery.addListener(toggleActiveNav);
// let activeNav = toggleActiveNav(mediaQuery);

// console.log(activeNav);


let burger              = document.querySelector('.hamburger'),
    topBun              = document.querySelector('.top-bun'),
    meat                = document.querySelector('.meat'),
    bottomBun           = document.querySelector('.bottom-bun'),
    cover               = document.querySelector('.content-cover'),
    menu                = document.querySelector('.mobile-nav-menu'),
    navMenuContent      = document.querySelector('.mobile-nav-content'),
    settingsMenuContent = document.querySelector('.settings-menu-content'),
    mainContent         = document.querySelector('.main-content'),
    settingsIcon = document.querySelector('.settings-icon');


burger.addEventListener('click', () => {
    mainContent.classList.toggle('no-scroll');

    navMenuContent.classList.toggle('content-inactive');

    topBun.classList.toggle('top-bun-active');
    burger.classList.toggle('mobile-nav-icon-active');
    meat.classList.toggle('meat-active');
    bottomBun.classList.toggle('bottom-bun-active');

    cover.classList.toggle('content-cover-active');
    menu.classList.toggle('mobile-menu-active');
    settingsMenuContent.classList.toggle('hidden');

    if(document.querySelector('.settings-menu-content')){
        settingsIcon = document.querySelector('.settings-icon');
        settingsIcon.classList.toggle('hidden');
    }
});

settingsIcon.addEventListener('click', () => {
    settingsIcon.classList.toggle('mobile-nav-icon-active');
    settingsIcon.classList.toggle('settings-icon-active')
    navMenuContent.classList.toggle('hidden');

    burger.classList.toggle('hidden');

    cover.classList.toggle('content-cover-active');
    menu.classList.toggle('mobile-menu-active');
});



document.addEventListener('DOMContentLoaded', function() {
    
    let elems = document.querySelectorAll('select');
    let options = {class:'browser-default'}
    let instances = M.FormSelect.init(elems, options);

});