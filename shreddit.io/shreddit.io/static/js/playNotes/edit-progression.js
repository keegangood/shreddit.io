
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
    
    if(button.nodeName == 'DIV' || button.nodeName == 'A') {
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

    let currentChordKey,
        currentChordQuality,
        currentScaleKey,
        currentScaleName,
        chordKeySelect = item.querySelector('#key-input'),
        chordQualitySelect = item.querySelector('#chord-quality');

    currentChordKey     = item.dataset.chordKey;
    currentChordQuality = item.dataset.chordQuality;
    currentScaleKey     = item.dataset.scaleKey;
    currentScaleName    = item.dataset.scaleName;
    
    if(currentChordKey.length > 1){
        currentChordKey = currentChordKey[0].toUpperCase() + currentChordKey[1]
    } else {
        currentChordKey = currentChordKey.toUpperCase();
    }
    chordKeySelect.value = currentChordKey;
    chordQualitySelect.value = currentChordQuality;
    console.log(`chordKey: ${currentChordKey}`);
    console.log(`chordName: ${currentChordQuality}`);
    console.log(`currentScaleKey: ${currentScaleKey}`);
    console.log(`currentScalName: ${currentScaleName}`);

}

