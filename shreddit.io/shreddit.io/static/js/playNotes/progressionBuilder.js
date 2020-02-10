
let progressionKeyInput          = document.querySelector('.progression-builder #key-input'),
    progressionChordQuality      = document.querySelector('.progression-builder #chord-quality'),
    compatibleScaleSelect        = document.querySelector('#compatible-scales'),
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

const addProgressionItem = (scaleKey, scaleName, chordKey, chordQuality) => {
    let newItem = document.createElement('li');
        newRow = document.createElement('div'),
        progressionContainer = document.querySelector('#progression-items'),
        newDelete = '',
        chordName = `${chordKey}${chordQuality}`;

    console.log(`Original scale name: ${scaleName}`);
    
    let template = `
        <div class="col s12 l6 offset-l3 saved-progression-container">
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
                        <div class="card-link blue-grey darken-1 nav-link center-align">
                            <a href="#" id="edit-chord-scale">Edit</a>
                        </div>
                    </div>
                    <div class="col l3 s4">
                        <div class="card-link blue-grey darken-1 nav-link center-align">
                            <a href="#progression-items" id="delete">Delete</a>
                        </div>
                    </div>
                    <div class="col l1 s2">
                        <span class="card-title"><i class="material-icons right close blue-grey-text text-darken-4">close</i></span>
                    </div>
                </div>
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

    newItem.append(newRow);

    newItem.classList.add('progression-item')

    newItem.dataset.chordKey = chordKey.toLowerCase();
    newItem.dataset.chordQuality = chordQuality;
    newItem.dataset.scaleKey = scaleKey.toLowerCase();
    newItem.dataset.scaleName = scaleName;
    

    newDelete = newItem.querySelector('#delete');
    
    newDelete.addEventListener('click', (e) => {
        newItem.remove();

        updateProgression();
        console.log(currentProgressionData);
        
    });

    progressionContainer.append(newItem);
}



progressionKeyInput.addEventListener('change', () => {
    updateCompatibleScales();
});

progressionChordQuality.addEventListener('change', () => {
    updateCompatibleScales();
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

        console.log(progressionItems.length);


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

const updateProgression = () => {
    chordNamesField.value = '';
    currentProgressionField.value = '';

    let pairs = compileChordScaleObject();

    console.log(pairs);
    

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

updateCompatibleScales();


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

        }

    } catch (error){
        console.error(error, "No progression loaded.")
        return 
    }


}
displayLoadedProgression();




