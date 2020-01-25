let neck = new InstrumentNeck('guitar', 'standard', 0, 13);

let instrumentInput = document.querySelector('#instrument-input'),
    instruments = neck.getInstrumentTunings('all'),
    instrument,
    tuningInput = document.querySelector('#tuning-input'),
    tunings = neck.getInstrumentTunings('guitar'),
    tuning,
    option,
    scaleInput = document.querySelector('#scale-formula-input'),
    scaleName,
    keyInput = document.querySelector('#key-input'),
    key,
    chordQualityInput = document.querySelector('#chord-quality'),
    chordName,
    noteLegend,
    noteLegendMarkers,
    noteLegendType = document.querySelector('#note-legend-type');

for(let i in instruments){
    instrument = instruments[i]; 

    option = document.createElement('option');
    option.value = instrument;
    option.innerText = `${instrument[0].toUpperCase()}${instrument.substring(1)}`;

    instrumentInput.append(option);
}

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
        chordName = chordQualityInput.value;
        neck.scale = neck.curKey.chord(chordName).voicing();//.toString().split(',');
        neck.markedNotes = neck.curKey.chord(chordName).simple();
        neck.chordName = chordName;
        neck.findCompatibleScales();
    }

    neck.removeNoteMarkers();
    neck.placeNoteMarkers();
    
}
neck.placeNoteMarkers();


neck.placeNoteMarkers();


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

// update neck when screen size changes
let windowWidthChange = mediaQuery => {
    if(mediaQuery.matches){
        neck.orientation = 'horizontal';
        updateInstrument();
        noteLegend = document.querySelector('.note-legend-horizontal .note-legend-markers')
    } else {
        neck.orientation = 'vertical';
        updateInstrument();
        noteLegend = document.querySelector('.note-legend-vertical .note-legend-markers')
    }
}

// DOM listeners below
const mediaQuery = window.matchMedia("(min-width: 768px)");

mediaQuery.addListener(windowWidthChange);

windowWidthChange(mediaQuery);


// update DOM to display compatible 
// scales for selected chord/key
const updateCompatibleScales = () => {
    
}

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
    neck.scaleOrChord = 'scale';
    updateNoteMarkers();
    updateNoteLegend();

});


keyInput.addEventListener('change', () => {
    updateNoteMarkers();
    updateNoteLegend();

});


chordQualityInput.addEventListener('change', () => {
    neck.scaleOrChord = 'chord';
    updateNoteMarkers();
    updateNoteLegend();

});


noteLegendType.addEventListener('change', () => {
    updateNoteLegend();
});

const updateNoteLegend = () => {
    let notes,
        noteLegendMarker,
        noteName,
        interval,
        intervals,
        displayType = noteLegendType.value;

    while(noteLegend.hasChildNodes()){
        noteLegend.removeChild(noteLegend.lastChild);
    }

    

    if(neck.scaleOrChord == 'scale'){
        notes = neck.markedNotes;
        intervals = neck.scale.scale;
    } else {
        notes = neck.markedNotes;
        intervals = neck.scale.toString().split(',');
    }


    for(i in notes){

        noteLegendMarker = document.createElement('div');
        noteLegendMarker.classList.add('note-legend-marker');

        noteName = notes[i];
        interval = intervals[i];

        console.log("noteName: ", noteName);
        console.log("interval: ", interval);
        
        

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

updateNoteLegend();

// let n1 = teoria.note('cb');
// console.log(n1);

// let n2 = teoria.note('');

// console.log(n1.enharmonics().toString());

// console.log(n1.interval(n2).toString());
// console.log(n1.scale('locrian').scale);

