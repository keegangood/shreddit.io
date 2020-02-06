
let progressionKeyInput = document.querySelector('.progression-builder #key-input'),
    progressionChordQuality = document.querySelector('.progression-builder #chord-quality'),
    compatibleScaleSelect = document.querySelector('#compatible-scales'),
    progressionItemDeleteButtons = document.querySelectorAll('.progression-builder .delete-button'),
    progressionAddButton = document.querySelector('.progression-builder .add-button'),
    playButton = document.querySelector('.play-button'),
    pauseButton = document.querySelector('.pause-button'),
    saveButton = document.querySelector('.save-button'),
    currentProgressionData,
    currentProgressionField = document.querySelector('#current-progression'),
    chordNameData,
    chordNamesField = document.querySelector('#chord-names');
    

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
    let scaleName = compatibleScaleSelect.options[compatibleScaleSelect.selectedIndex].innerText,
        chordName = `${progressionKeyInput.value}${progressionChordQuality.value}`,
        newRow = document.createElement('div'),
        progressionContainer = document.querySelector('.current-progression'),
        newDelete;

    let template = `<div class="col s5 chord-name">${chordName}</div>
                    <div class="col s5 offset-s1 scale-name">${scaleName}</div>
                    <div class="col s1 delete-button"><span>&#10006;</span></div>`

    newRow.classList.add('row',
                         'progression-item',
                         'blue-grey',
                         'lighten-1',
                         'blue-grey-text',
                         'text-darken-4');

    newRow.innerHTML = template;

    newRow.dataset.chordKey = progressionKeyInput.value.toLowerCase();
    newRow.dataset.chordQuality = progressionChordQuality.value;
    newRow.dataset.scaleKey = compatibleScaleSelect.options[compatibleScaleSelect.selectedIndex].value.split(' ')[0];
    newRow.dataset.scaleName = compatibleScaleSelect.options[compatibleScaleSelect.selectedIndex].value.split(' ')[1];
    
    newDelete = newRow.lastChild.firstChild;
    newDelete.addEventListener('click', () => {
        newDelete.parentElement.parentElement.remove();
    });

    progressionContainer.append(newRow);
}

progressionKeyInput.addEventListener('change', () => {
    updateCompatibleScales();
});

progressionChordQuality.addEventListener('change', () => {
    updateCompatibleScales();
});

// // delete buttons for progression items X
// for(let i=0; i<progressionItemDeleteButtons.length; i++){
//     progressionItemDeleteButtons[i].addEventListener('click', target => {
//         target.target.parentElement.parentElement.remove();
//     });
// }

// button to add new items to progression
progressionAddButton.addEventListener('click', () => {
    addProgressionItem();

    let pairs = compileChordScaleObject();

    currentProgressionData = compileProgression(pairs);
    chordNamesData = currentProgressionData['chordNames'].join(' ')

    chordNamesField.value         = chordNamesData;
    currentProgressionField.value = JSON.stringify(currentProgressionData);

});

updateCompatibleScales();

























//**** Prepare chord progression for saving/playing ****/

// Collects all user-generated
// progression-item divs and creates
// an object based on their dataset values for chords/scales
const compileChordScaleObject = () => {
    let progressionItems = document.querySelectorAll('.progression-item'),
        progressionItem,
        chordKey,
        chordQuality,
        chordNotes,
        scaleKey,
        scaleName,
        chordScaleObject = {},
        chordScaleObjects = [];

        // console.log(progressionItems.length);


    for(let i=0; i<progressionItems.length; i++){

        chordScaleObject = {}
        progressionItem = progressionItems[i];

        chordKey = progressionItem.dataset.chordKey;
        chordQuality = progressionItem.dataset.chordQuality;
        scaleKey = progressionItem.dataset.scaleKey;
        scaleName = progressionItem.dataset.scaleName;

        chordNotes = teoria.note(chordKey).chord(chordQuality).notes();
        // for(let i in chordNotes){
        //     console.log(`note: ${chordNotes[i]}`);
        // }

        chordScaleObject['chord'] = 
            {
                'key':     chordKey, 
                'quality': chordQuality,
                'notes':   teoria.note(chordKey).chord(chordQuality).notes(),
            };
        chordScaleObject['scale'] = 
            {
                'key':   scaleKey, 
                'name':  scaleName,
                'notes': teoria.note(scaleKey).scale(scaleName).simple(),
            };
        
        chordScaleObjects.push(chordScaleObject);
    }

    return chordScaleObjects
    
}

const compileProgression = objects => {

    // console.log(objects);
    
    let progression = {},
        chord,
        chordLoop,
        chordKey,
        chordQuality,
        obj;

    progression['chordScaleObjects'] = objects;

    chordNames = [];
    chordLoop  = [];
    for(let i=0; i<objects.length;i++){
        obj = objects[i];

        chordKey     = obj.chord.key;
        chordQuality = obj.chord.quality;
        
        chordNames.push(`${chordKey}${chordQuality}`);

        chord = obj.chord.notes;
        for(let j in chord){
            chord[j] = chord[j].scientific();
        }

        scaleKey  = obj.scale.key;
        scaleName = obj.scale.name;

        chordLoop.push(
            {
                'chord'       :  chord,
                'chordKey'    :  chordKey,
                'chordQuality':  chordQuality,
                'scaleKey'    :  scaleKey,
                'scaleName'   :  scaleName,
                'time'        : `${i*2}`,
                'velocity'    :  0.1,
            }
        ) 
    }

    progression['chordNames'] = chordNames;

    progression['chordLoop']  = chordLoop;

    progression['rhythm'] = [];

    return progression
}

playButton.addEventListener('click', () => {
    playNotes(currentProgressionData);
})


