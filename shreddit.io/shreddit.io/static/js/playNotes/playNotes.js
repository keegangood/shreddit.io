let progressionKeyInput = document.querySelector('.progression-builder #key-input'),
    progressionChordQuality = document.querySelector('.progression-builder #chord-quality'),
    compatibleScaleSelect = document.querySelector('#compatible-scales'),
    progressionItemDeleteButtons = document.querySelectorAll('.progression-builder .delete-button'),
    progressionAddButton = document.querySelector('.progression-builder .add-button');
    
    console.log(progressionKeyInput);
    console.log(progressionChordQuality);
    
const fullScaleNames = {
    'aeolian'           :'Aeolian',
    'blues'             :'Blues',
    'chromatic'         :'Chromatic',
    'doubleharmonic'    :'Double Harmonic',
    'harmonicminor'     :'Harmonic Minor',
    'dorian'            :'Dorian',
    'doubleharmonic'    :'Double Harmonic',
    'harmonicminor'     :'Harmonic Minor',
    'ionian'            :'Ionian',
    'locrian'           :'Locrian',
    'lydian'            :'Lydian',
    'majorpentatonic'   :'Major Pentatonic',
    'melodicminor'      :'Melodic Minor',
    'minorpentatonic'   :'Minor Pentatonic',
    'mixolydian'        :'Mixolydian',
    'phrygian'          :'Phrygian',
    'wholetone'         :'Whole Tone',
    'harmonicchromatic' :'Harmonic Chromatic',
    'minor'             :'Minor',
    'major'             :'Major',
    'flamenco'          :'Flamenco',
}



// DOM Manipulations
const updateCompatibleScales = () => {

    removeChildren(compatibleScaleSelect);

    let chordName,
        compatibleScales,
        i,
        key,
        option,
        scaleName;

    key = progressionKeyInput.value;
    neck.curKey = teoria.note(key);
    chordName = progressionChordQuality.value;

    neck.scale = neck.curKey.chord(chordName).voicing();//.toString().split(',');
    neck.markedNotes = neck.curKey.chord(chordName).simple();
    neck.chordName = neck.scale.toString();

    neck.findCompatibleScales();
    compatibleScales = neck.compatibleScales;

    for(i in compatibleScales){
        scaleName = `${compatibleScales[i].key} ${compatibleScales[i].name}`

        option = document.createElement('option');
        option.value = scaleName;
        option.innerText = `${compatibleScales[i].key[0].toUpperCase()}${compatibleScales[i].key.substring(1, compatibleScales[i].length)} ${fullScaleNames[compatibleScales[i].name]}`;
        
        compatibleScaleSelect.append(option);
    }
}

const addProgressionItem = () => {
    let compatibleScales = neck.compatibleScales,
        // scaleName = `${compatibleScales[i].key[0].toUpperCase()}${compatibleScales[i].key.substring(1, compatibleScales[i].length)} ${fullScaleNames[compatibleScales[i].name]}`,
        scaleName = compatibleScaleSelect.options[compatibleScaleSelect.selectedIndex].innerText,
        chordName = `${progressionKeyInput.value}${progressionChordQuality.value}`,
        newRow = document.createElement('div'),
        progressionContainer = document.querySelector('.current-progression'),
        newDelete;

    let template = `<div class="col s5 offset-s1 chord-name">${chordName}</div>
                    <div class="col s5 scale-name">${scaleName}</div>
                    <div class="col s1 delete-button"><span>&#10006;</span></div>`
    
    newRow.classList.add('row', 'progression-item');
    newRow.innerHTML = template;

    newDelete = newRow.lastChild.firstChild;
    newDelete.addEventListener('click', () => {
        newDelete.parentElement.parentElement.remove();
    });
    console.log(newDelete);
    
    progressionContainer.append(newRow);
}

progressionKeyInput.addEventListener('change', () => {
    updateCompatibleScales();
});

progressionChordQuality.addEventListener('change', () => {
    updateCompatibleScales();
});

// delete buttons for progression items X
for(let i=0; i<progressionItemDeleteButtons.length; i++){
    progressionItemDeleteButtons[i].addEventListener('click', target => {
        target.target.parentElement.parentElement.remove();
    });
}

// button to add new items to progression
progressionAddButton.addEventListener('click', () => {
    addProgressionItem();
});


updateCompatibleScales();
const playNotes = () => {

}

// playNotes("","")
