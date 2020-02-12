
let progressionKeyInput          = document.querySelector('.progression-builder #key-input'),
    progressionChordQuality      = document.querySelector('.progression-builder #chord-quality'),
    compatibleScaleSelect        = document.querySelector('.progression-builder #compatible-scales'),
    progressionItemDeleteButtons = document.querySelectorAll('.progression-builder .delete-button'),
    progressionAddButton         = document.querySelector('.progression-builder .add-button'),
    playButton                   = document.querySelector('.play-button'),
    pauseButton                  = document.querySelector('.pause-button'),
    saveButton                   = document.querySelector('.save-button'),
    loadedProgressionField       = document.querySelector('#loaded-progression'),
    currentProgressionField      = document.querySelector('#current-progression'),
    chordNamesField              = document.querySelector('#chord-names'),
    loadedProgression            = document.querySelector('.loaded-progression'),
    currentProgressionData,
    chordNameData;


let progressionList = Sortable.create(document.querySelector('#progression-items'), {
    animation: 130,

    onEnd: () => {
        updateProgression();
    },
});


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
const updateCompatibleScales = (selectMenu, keyInput, chordQualityInput, selectedItem='') => {
    console.log(`selectMenu: ${selectMenu}` );
    console.log(`keyInput: ${keyInput}`);
    console.log(`chordQualityInput: ${chordQualityInput}`);
    
    
    let compatibleScaleSelect = selectMenu;

    console.log(compatibleScaleSelect);

    removeChildren(compatibleScaleSelect);

    let chordName,
        compatibleScales,
        i,
        key,
        option,
        scaleName;

    key = keyInput.value;

    console.log(`key: ${key}`);
    

    neck.curKey = teoria.note(key);
    chordName = chordQualityInput.value;

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

    if(selectedItem != ''){
        compatibleScaleSelect.value = selectedItem;
    }
}

const addProgressionItem = (scaleKey, scaleName, chordKey, chordQuality) => {
    let newProgressionItem   = document.createElement('li'),
        newRow               = document.createElement('div'),
        progressionContainer = document.querySelector('#progression-items'),
        newDelete,
        newEditButton,
        newCloseButton,
        newUpdateButton,
        newKeyInput,
        newChordQualityInput,
        newCompatibleScalesSelect,
        template,
        chordName            = `${chordKey}${chordQuality}`;

    console.log(`Original scale name: ${scaleName}`);
    
    template = `<div class="col s12 l6 offset-l3 saved-progression-container">
    <div class="card">
        <div class="card-content blue-grey lighten-2">
            <div class="title activator blue-grey lighten-3 text-darken-4">
            <i class="material-icons right">more_vert</i>
                <div class="row">
                    <div class="col s8">
                    <span class="chord-label">Chord:
                            <span class="chord-name">${chordName}</span>
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <span class="scale-label">Scale:
                        <span class="scale-name">&nbsp;${scaleName}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="card-reveal blue-grey lighten-2">
        <div class="row card-links">
            <div class="col l3 s1"></div>
            <div class="col l3 s4">
                <div id="edit-progression-item" class="card-link blue-grey darken-1 nav-link center-align">
                    <a href="javascript:;">Edit</a>
                </div>
            </div>
            <div class="col l3 s4">
                <div class="card-link blue-grey darken-1 nav-link center-align">
                    <a href="javascript:;" id="delete">Delete</a>
                </div>
            </div>
            <div class="col l1 s2">
                <span class="card-title"><i class="material-icons right close blue-grey-text text-darken-4">close</i></span>
            </div>
        </div>
    </div>
</div>
<div id="edit-panel" class="blue-grey darken-1">
    <div class="row choose-chord" id="choose-chord">
        <h4>Choose a chord: </h4>
        <div class="row">
            <div class="col s4">
                <select name="key" id="key-input" class="browser-default blue-grey-text text-darken-4 blue-grey">
                    <option value="C">C</option>
                    <option value="C#">C#</option>
                    <option value="Db">Db</option>
                    <option value="D">D</option>
                    <option value="D#">D#</option>
                    <option value="Eb">Eb</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="F#">F#</option>
                    <option value="Gb">Gb</option>
                    <option value="G">G</option>
                    <option value="G#">G#</option>
                    <option value="Ab">Ab</option>
                    <option value="A">A</option>
                    <option value="A#">A#</option>
                    <option value="Bb">Bb</option>
                    <option value="B">B</option>
                </select>
            </div>
            <div class="col s8">
                <select name="chord-quality" id="chord-quality" class="browser-default blue-grey-text text-darken-4 blue-grey">
                    <option value="">Major</option>
                    <option value="m">Minor</option>
                    <option value="6">6</option>
                    <option value="m6">m6</option>
                    <option value="6/9">6/9</option>
                    <option value="maj7">maj7</option>
                    <option value="7">7</option>
                    <option value="7b5">7b5</option>
                    <option value="7#5">7#5</option>
                    <option value="m7">m7</option>
                    <option value="m(maj7)">m(maj7)</option>
                    <option value="m7b5">m7b5</option>
                    <option value="aug7">aug7</option>
                    <option value="9">9</option>
                    <option value="9b5">9b5</option>
                    <option value="9#5">9#5</option>
                    <option value="maj9">maj9</option>
                    <option value="m9">m9</option>
                    <option value="m11">m11</option>
                    <option value="13">13</option>
                    <option value="maj13">maj13</option>
                    <option value="m13">m13</option>
                    <option value="sus4">sus4</option>
                    <option value="sus2">sus2</option>
                    <option value="7sus4">7sus4</option>
                    <option value="7sus2">7sus2</option>
                    <option value="9sus4">9sus4</option>
                    <option value="9sus2">9sus2</option>
                    <option value="aug">aug</option>
                    <option value="dim">dim</option>
                    <option value="dim7">dim7</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
    </div>
    <div class="row choose-scale">
        <div class="col s10 offset-s2 center">
                <h4>Choose a scale:</h4>
                <select name="compatible-scales" id="compatible-scales" class="browser-default blue-grey-text text-darken-4 blue-grey">
                    <!-- add options with JS -->
                </select>
        </div>
    </div>
    <div class="row">
        <div class="col s6 offset-s3">
            <div id="update-button" class="update-button blue-grey darken-2 blue-grey-text text-lighten-3 center">Update</div>
        </div>
    </div>
</div>`

    newRow.classList.add('row',
                         'blue-grey',
                         'lighten-4',
                         'blue-grey-text',
                         'text-darken-4');

    scaleName = scaleName.split(' ');

    if(scaleName.length > 2){
        scaleName = scaleName[1] + scaleName[2]
    } else if(scaleName.length > 1) {
        scaleName = scaleName[1]
    }
    scaleName = scaleName.toLowerCase();

    newRow.innerHTML = template;

    newProgressionItem.append(newRow);

    newProgressionItem.classList.add('progression-item')

    newProgressionItem.dataset.chordKey = chordKey.toLowerCase();
    newProgressionItem.dataset.chordQuality = chordQuality;
    newProgressionItem.dataset.scaleKey = scaleKey.toLowerCase();
    newProgressionItem.dataset.scaleName = scaleName;
    
    newEditButton = newProgressionItem.querySelector('#edit-progression-item');
    newEditButton.addEventListener('click', (event) => {

        let editButton = event.target;
        loadDefaultProgressionInfo(newProgressionItem);
        updateEditDisplay(editButton, newProgressionItem);
    })

    newCloseButton = newProgressionItem.querySelector('.close');
    newCloseButton.addEventListener('click', e => {
        updateEditDisplay(e.target, newProgressionItem);
        loadDefaultProgressionInfo(newProgressionItem);
    })

    newKeyInput = newProgressionItem.querySelector('#key-input');
    newKeyInput.addEventListener('change', () => {

        newCompatibleScalesSelect = newProgressionItem.querySelector('#compatible-scales')
        updateCompatibleScales(newCompatibleScalesSelect, newKeyInput, newChordQualityInput)
    })

    newChordQualityInput = newProgressionItem.querySelector('#chord-quality')
    newChordQualityInput.addEventListener('change', () => {


        newCompatibleScalesSelect = newProgressionItem.querySelector('#compatible-scales')
        updateCompatibleScales(newCompatibleScalesSelect, newKeyInput, newChordQualityInput)
    })

    newDelete = newProgressionItem.querySelector('#delete');
    newDelete.addEventListener('click', () => {

        newProgressionItem.remove();
        updateProgression();
    });

    newUpdateButton = newProgressionItem.querySelector('#update-button');
    newUpdateButton.addEventListener('click', () => {
        updateProgressionItem(newProgressionItem);
    })

    newCompatibleScalesSelect = newCompatibleScalesSelect = newProgressionItem.querySelector('#compatible-scales');
    newCompatibleScalesSelect.addEventListener('change', () => {
        // updateProgressionItem(newProgressionItem);
    })

    progressionContainer.append(newProgressionItem);
}


progressionKeyInput.addEventListener('change', () => {
    updateCompatibleScales(compatibleScaleSelect, progressionKeyInput, progressionChordQuality);
});

progressionChordQuality.addEventListener('change', () => {
    updateCompatibleScales(compatibleScaleSelect, progressionKeyInput, progressionChordQuality);
});





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

    for(let i=0; i<progressionItems.length; i++){

        chordScaleObject = {}
        progressionItem = progressionItems[i];

        chordKey = progressionItem.dataset.chordKey;
        chordQuality = progressionItem.dataset.chordQuality;
        scaleKey = progressionItem.dataset.scaleKey;
        scaleName = progressionItem.dataset.scaleName;


        chordNotes = teoria.note(chordKey).chord(chordQuality).notes();

        chordScaleObject["chord"] = 
            {
                "key":     chordKey, 
                "quality": chordQuality,
                "notes":   teoria.note(chordKey).chord(chordQuality).notes(),
            };
        chordScaleObject["scale"] = 
            {
                "key":   scaleKey, 
                "name":  scaleName,
                "notes": teoria.note(scaleKey).scale(scaleName).simple(),
            };
        
        chordScaleObjects.push(chordScaleObject);
    }


    return chordScaleObjects
    
}

const compileProgression = objects => {
    
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

const updateProgression = () => {

    console.log(currentProgressionData);
    

    chordNamesField.value = '';
    currentProgressionField.value = '';

    let pairs = compileChordScaleObject();

    currentProgressionData = compileProgression(pairs);

    chordNamesData = currentProgressionData['chordNames'].join(' ')

    chordNamesField.value         = chordNamesData;
    currentProgressionField.value = JSON.stringify(currentProgressionData);
    console.log(currentProgressionData);

}

// button to add new items to progression
progressionAddButton.addEventListener('click', () => {
    let scaleKey     = compatibleScaleSelect.options[compatibleScaleSelect.selectedIndex].value.split(' ')[0],
        scaleName    = compatibleScaleSelect.options[compatibleScaleSelect.selectedIndex].innerText,
        chordKey     = progressionKeyInput.value,
        chordQuality = progressionChordQuality.value;

    addProgressionItem(scaleKey, scaleName, chordKey, chordQuality);

    updateProgression();
});

updateCompatibleScales(compatibleScaleSelect, progressionKeyInput, progressionChordQuality);


const displayLoadedProgression = () => {
    
    try {
        let progression     = JSON.parse(loadedProgression.dataset.loadedProgression),
            chordsAndScales = progression.chordScaleObjects,
            chordKey, chordQuality, scaleKey, scaleName;

        console.log(progression);
        
        for(let i=0; i<chordsAndScales.length; i++) {
            chordKey     = chordsAndScales[i]['chord']['key'][0]
            chordKey     = chordKey.toUpperCase() + chordKey.slice(1);

            chordQuality = chordsAndScales[i]['chord']['quality'];

            scaleKey     = chordsAndScales[i]['scale']['key'];
            scaleKey     = scaleKey[0].toUpperCase();

            scaleName    = `${scaleKey} ${fullScaleNames[chordsAndScales[i]['scale']['name']]}`;
            
            
            // console.log(`chord: ${chordKey}${chordQuality}`);
            // console.log(`scale: ${scaleKey} ${scaleName}`);
            
            addProgressionItem(scaleKey, scaleName, chordKey, chordQuality);

            let pairs = compileChordScaleObject();

            currentProgressionData = compileProgression(pairs);

            console.log(`currentProgressionData: ${currentProgressionData}`)

            chordNamesData = currentProgressionData['chordNames'].join(' ')

            chordNamesField.value         = chordNamesData;
            
            currentProgressionField.value = JSON.stringify(currentProgressionData);
            loadedProgressionField.value  = JSON.stringify(currentProgressionData);
        
        }

    } catch (error){
        console.error(error, "No progression loaded.")
        return 
    }


}
displayLoadedProgression();




