
let instrumentInput = document.querySelector('#instrument-input'),
    scaleInput = document.querySelector('#scale-formula-input'),
    keyInput = document.querySelector('#key-input'),
    chordQualityInput = document.querySelector('#chord-quality'),
    noteLegendType = document.querySelector('#note-legend-type'),
    scaleNameDisplay = document.querySelector('.scale-name'),
    keyDisplay = document.querySelector('.scale-key'),
    exploreModeInput = document.querySelector('#explore-mode-input'),
    tuningInput = document.querySelector('#tuning-input'),
    scalesAndChordsSection = document.querySelector('.scale-selects'),
    progressionBuilderSection = document.querySelector('.progression-builder'),
    progressionInfo = document.querySelector('.progression-info');

let instrumentNames,
    instrumentName,
    tunings,
    tuning,
    option,
    scaleName,
    key,
    chordName,
    noteLegend,
    noteLegendMarkers,
    exploreMode;


// window.addEventListener('load', () => {
    let neck = new InstrumentNeck('guitar', 'standard', 0, 13);

    instrumentNames = neck.getInstrumentTunings('all');
    tunings = neck.getInstrumentTunings('guitar');


    for(let i in instrumentNames){
        instrumentName = instrumentNames[i]; 

        option = document.createElement('option');
        option.value = instrumentName;
        option.innerText = `${instrumentName[0].toUpperCase()}${instrumentName.substring(1)}`;

        instrumentInput.append(option);

        // let elems = document.querySelectorAll('select');
        // M.FormSelect.init(instrumentInput);
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
    }

    // update input options to
    // selected instrument's tunings
    const updateTunings = (newInstrument) => {

        while(tuningInput.hasChildNodes()){
            tuningInput.removeChild(tuningInput.lastChild);
        }

        tunings = neck.getInstrumentTunings(newInstrument);

        for(tuning in tunings){

            option = document.createElement('option');
            option.value = tuning;
            option.innerText = `${tuning[0].toUpperCase()}${tuning.substring(1)}`;

            tuningInput.append(option);

            // M.FormSelect.init(tuningInput);
            let elems = document.querySelectorAll('select');
            let options = {class:'browser-default'}
            let instances = M.FormSelect.init(elems, options);
        }
    }

    updateTunings(neck.instrument);

// grabs current input for scale name and key,
// sends that info to the neck object
// then removes old markers and places new ones
const updateNoteMarkers = () => {
    key = keyInput.value;
    neck.curKey = teoria.note(key);

    if(neck.scaleOrChord == 'scale'){
        scaleName = scaleInput.value;
        neck.scale = neck.curKey.scale(scaleName);
        neck.markedNotes = neck.scale.simple();

    } else if(neck.scaleOrChord == 'chord'){
        // console.log(neck);

        chordName = chordQualityInput.value;
        neck.scale = neck.curKey.chord(chordName).voicing();//.toString().split(',');
        neck.markedNotes = neck.curKey.chord(chordName).simple();

        neck.chordName = chordName;
        neck.findCompatibleScales();


    }

    neck.removeNoteMarkers();
    neck.placeNoteMarkers();

}


// Update instrument neck 
// when input selection changes
const updateInstrument = () => {
    let newInstrument = instrumentInput.value;
    let newTuning = tuningInput.value;

    for(let i in neck.strings){
        neck.strings[i].container.remove();
    }

    neck.instrument = newInstrument;
    neck.tuning = newTuning;

    neck.stringNames = neck.getInstrumentTunings();

    neck.totalStrings = neck.stringNames.length;
    neck.strings = neck.drawStrings();

    updateNoteMarkers();
}

updateInstrument();

// update neck and change note legend orientation
// when screen size changes
let windowWidthChange = mediaQuery => {
    if(mediaQuery.matches){
        neck.orientation = 'horizontal';
        noteLegend = document.querySelector('.note-legend-horizontal .note-legend-markers')
        updateInstrument();
    } else {
        neck.orientation = 'vertical';
        noteLegend = document.querySelector('.note-legend-vertical .note-legend-markers')
        updateInstrument();
    }
}

// listen for screen width changes
const mediaQuery = window.matchMedia("(min-width: 768px)");
mediaQuery.addListener(windowWidthChange);
windowWidthChange(mediaQuery);

// remove all children nodes
const removeChildren = parent => {
    while(parent.hasChildNodes()){
        parent.removeChild(parent.lastChild);
    }
}

// clear old legend markers 
// and generate new ones
const updateNoteLegend = () => {
    let notes,
        noteLegendMarker,
        noteName,
        interval,
        intervals,
        displayType = noteLegendType.value;

    if(noteLegend.hasChildNodes()){
        while(noteLegend.hasChildNodes()){
            noteLegend.removeChild(noteLegend.lastChild);
        }
    }

    if(neck.scaleOrChord == 'scale'){
        notes = neck.markedNotes;
        intervals = neck.scale.scale;
    } else if(neck.scaleOrChord == 'chord'){
        notes = neck.markedNotes;
        intervals = neck.scale.toString().split(',');
    }


    // console.log('scaleOrChord: ',neck.scaleOrChord);
    // console.log('markedNotes: ', neck.markedNotes);
    

    if(notes){
        for(i in notes){

            noteLegendMarker = document.createElement('div');
            noteLegendMarker.classList.add('note-legend-marker');

            noteName = notes[i];
            interval = intervals[i];

            noteLegendMarker.dataset.noteName = noteName;
            noteLegendMarker.dataset.interval = interval;

            noteLegendMarker.style.backgroundColor = 
                'var(--' + teoria.interval(interval).simple() + '-color)';

            if(displayType == 'intervals'){
                noteLegendMarker.innerText = interval;
            } else {
                noteLegendMarker.innerText = noteName[0].toUpperCase() + noteName.substring(1, noteName.length);
            }
            noteLegend.append(noteLegendMarker);
        }
    }
}


const updateScaleOrChordInfo = () => {
    keyDisplay.innerText = keyInput.value;

    if(neck.scaleOrChord == 'scale'){
        scaleNameDisplay.innerText = scaleInput.options[scaleInput.selectedIndex].innerText;
    } else if(neck.scaleOrChord == 'chord'){
        scaleNameDisplay.innerText = chordQualityInput.options[chordQualityInput.selectedIndex].innerText;
    }
}

exploreMode = exploreModeInput.value;

neck.placeNoteMarkers();
updateScaleOrChordInfo();

updateNoteLegend();

const changeExploreMode = () => {
    exploreMode = exploreModeInput.value;

    // console.log("exploreMode: ", exploreMode);


    if(exploreMode == 'progression-builder'){
        scalesAndChordsSection.classList.add('hide');
        progressionBuilderSection.classList.remove('hide');
        progressionInfo.classList.remove('hide');
        neck.scale                 = '';
        neck.markedNotes           = '';
        keyDisplay.innerText       = '';
        scaleNameDisplay.innerText = '';

        neck.removeNoteMarkers();
        removeChildren(noteLegend);

    } else if(exploreMode == 'scales-and-chords') {

        progressionInfo.classList.add('hide');
        
        neck.curKey       = teoria.note(keyInput.value);
        neck.scale        = neck.curKey.scale(scaleInput.value);
        neck.markedNotes  = neck.scale.simple();
        
        keyDisplay.innerText       = keyInput.options[keyInput.selectedIndex].innerText;
        scaleNameDisplay.innerText = scaleInput.options[scaleInput.selectedIndex].innerText;

        neck.placeNoteMarkers();

        scalesAndChordsSection.classList.remove('hide');
        progressionBuilderSection.classList.add('hide');
    }
    
}

changeExploreMode();


// Event listeners
instrumentInput.addEventListener('change', function(){
    newInstrument = instrumentInput.value;
    
    updateTunings(newInstrument);
    updateInstrument();
    updateNoteLegend();
});


tuningInput.addEventListener('change', function(){
    updateInstrument();
    updateNoteLegend();
});


scaleInput.addEventListener('change', () => {
    // console.log(neck);

    neck.scaleOrChord = 'scale';
    updateNoteMarkers();
    updateNoteLegend();
    updateScaleOrChordInfo();
    // console.log(neck);

});


keyInput.addEventListener('change', () => {
    updateNoteMarkers();
    updateNoteLegend();
    updateScaleOrChordInfo();
});

chordQualityInput.addEventListener('change', () => {
    // console.log(neck);

    neck.scaleOrChord = 'chord';
    updateNoteMarkers();
    updateNoteLegend();
    updateScaleOrChordInfo();
    
    if(exploreMode == 'progression-builder'){
        updateCompatibleScales();
    }
    // console.log(neck);

});


noteLegendType.addEventListener('change', () => {
    updateNoteLegend();
    // console.log(neck);

});

exploreModeInput.addEventListener('change', () => {
    changeExploreMode();
});



