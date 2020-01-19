let burger = document.querySelector('.hamburger'),
    topBun = document.querySelector('.top-bun'),
    meat = document.querySelector('.meat'),
    bottomBun = document.querySelector('.bottom-bun');

    console.log("hello world");
burger.addEventListener('click', () => {

    
    topBun.classList.toggle('top-bun-active');
    meat.classList.toggle('meat-active');
    bottomBun.classList.toggle('bottom-bun-active');
});