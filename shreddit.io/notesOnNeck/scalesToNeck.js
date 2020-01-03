const applyScaleToNeck = (scaleName, key) => {
    let tonic = teoria.note(key),
        scale = tonic.scale(`${scaleName}`).simple(),
        frets = document.querySelectorAll('.fret'),
        openFrets = document.querySelectorAll('.open-fret'),
        fretId,
        openFretId,
        indx,
        note,
        fretNote;

        for(let i=0; i<frets.length; i++){
            // console.log(`frets: ${frets[i].id}`);

        // console.log(fretId);
        
    }
    //

}

const scaleFormulaInput = document.querySelector('#scale-formula-input');
const keyInput = document.querySelector('#key-input')

scaleFormulaInput.addEventListener('change', () => {
    let tonic = keyInput.value;
    let scaleName = scaleFormulaInput.value; 

    applyScaleToNeck(scaleName, tonic);
});

keyInput.addEventListener('change', () => {
    let tonic = keyInput.value;
    let scaleName = scaleFormulaInput.value;

    applyScaleToNeck(scaleName, tonic);
});