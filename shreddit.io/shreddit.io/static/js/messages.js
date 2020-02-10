
// if(messagesCloseXs){

    

//     messageCloseX.addEventListener('click', () => {
//         messageCloseX.parentElement.remove();
//     });
// }

const displayMessages = () => {
    let messageDisplay = document.querySelector('.message-display'),
        messages       = document.querySelectorAll('.message-container'),
        closeXs        = document.querySelectorAll('.message-close-x'),
        closeX,
        i, j, k;

    if(messages) {
        for(i=0; i<messages.length; i++){
            // console.log(messages[i]);

            messages[i].classList.add('message-show');
            messages[i].style.top = (15*i) + 'px';

            closeX = closeXs[i];
            
            closeX.addEventListener('click', e => {
                message = e.target.parentElement.parentElement.parentElement;
                message.style.top = '-15px';
                message.classList.remove('message-show');

                setTimeout(() => {
                    displayMessages.remove();
                }, 300)
            })
        }
        
        
        setTimeout((msgs=messages) => {
            for(let i=msgs.length-1; i>=0; i--){

                msgs[msgs.length-1-i].style.transitionDelay = `${.5 * i}s`;
                msgs[i].style.top = '-15px';
                msgs[i].classList.remove('message-show');
            }
            
        }, 2500)

        setTimeout(() => {
            messageDisplay.remove()
        }, 2800)
    }
}

displayMessages();