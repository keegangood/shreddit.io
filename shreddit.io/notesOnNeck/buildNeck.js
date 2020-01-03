
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
    key;

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
const updateScale = () => {
    scaleName = scaleInput.value;
    key = keyInput.value;

    neck.curKey = teoria.note(key);
    neck.scale = neck.curKey.scale(scaleName);
    neck.markedNotes = neck.scale.simple()

    neck.removeNoteMarkers();

    neck.placeNoteMarkers();
}
neck.placeNoteMarkers();


const updateInstrument = () => {
    let newInstrument = instrumentInput.value;
    let newTuning = tuningInput.value;
    
    // tuningInput.selectedIndex = newTuning;

    for(let i in neck.strings){
        neck.strings[i].container.remove();
    }

    neck.instrument = newInstrument;
    neck.tuning = newTuning;

    neck.stringNames = neck.getInstrumentTunings();

    neck.totalStrings = neck.stringNames.length;
    neck.strings = neck.drawStrings();
    
    updateScale();
}

instrumentInput.addEventListener('change', function(){
    newInstrument = instrumentInput.value;
    
    updateTunings(newInstrument);
    updateInstrument();
});

tuningInput.addEventListener('change', function(){
    updateInstrument();
});

scaleInput.addEventListener('change', updateScale);
keyInput.addEventListener('change', updateScale);

let n1 = teoria.note('cb');
// let n2 = teoria.note('');

// console.log(n1.enharmonics().toString());

// console.log(n1.interval(n2).toString());
// console.log(n1.scale('locrian').scale);

