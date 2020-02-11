
const toggleEditPanel = panel => {
    if (panel.style.maxHeight){
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
    if(panel.classList.contains('edit-panel-active')){
        panel.classList.remove('edit-panel-active');
    } else {
        panel.classList.add('edit-panel-active')
    }

}

const toggleEditButton = (button, status) => {
    if(status == 'on'){
        button.innerText = 'Editing...';
            
        button.classList.remove('blue-grey-text');
        button.classList.remove('text-lighten-5');
    
        button.classList.add('red-text');
        button.classList.add('text-darken-1');
    } else if(status == 'off'){
        button.innerText = 'Edit';
        
        button.classList.add('blue-grey-text');
        button.classList.add('text-lighten-5');

        button.classList.remove('red-text');
        button.classList.remove('text-darken-1');
    }
}

const updateEditDisplay = (button, progressionItem) => {
    let editPanel = progressionItem.querySelector('#edit-panel'),
        editButton;

    console.log(button.nodeName);
    
    if(button.nodeName == 'DIV') {
        editButton = button;
        if(editButton.innerText == 'Edit'){
            
            editProgressionItem(progressionItem);
    
            toggleEditButton(editButton, 'on')
    
            toggleEditPanel(editPanel);
    
        } else if(editButton.innerText == 'Editing...'){
            editButton.innerText = 'Edit';
            
            editButton.classList.remove('red-text');
            editButton.classList.remove('text-darken-1');
    
            editButton.classList.add('blue-grey-text');
            editButton.classList.add('text-lighten-5');
            
            toggleEditButton(editButton, 'off')
            toggleEditPanel(editPanel);
    
        }
    } else if(button.nodeName == 'I'){
        if(editPanel.classList.contains('edit-panel-active')){
            editButton = progressionItem.querySelector('#edit-progression-item');

            toggleEditButton(editButton, 'off');
            toggleEditPanel(editPanel);
        }
    }
    
}

const editProgressionItem = item => {

    // console.log(progressionKeyInput);
    // console.log(progressionChordQuality);
    // console.log(compatibleScaleSelect);
    let currentChordKey,
        currentChordName,
        currentScale;

    currentChordKey  = item.querySelector('.chord-name');
    currentChordName = item.querySelector('.chord-name');
    currentScale     = item.querySelector('.scale-name');
    

}

