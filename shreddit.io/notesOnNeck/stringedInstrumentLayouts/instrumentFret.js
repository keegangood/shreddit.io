class InstrumentFret {
    constructor(neck, string, fretNum) {
        this.neck = neck;
        this.string = string;
        this.id = fretNum;
        this.container = this.draw();
    }

    draw() {
        let newFret = document.createElement('div'),
            fretNoteName = this.getFretName(),
            noteName,
            noteOctave;

        if(fretNoteName != 'no-note'){
        
            noteName = fretNoteName.slice(0,-1);
            newFret.setAttribute('name', noteName);

            noteOctave = fretNoteName.slice(fretNoteName.length-1, fretNoteName.length);
            newFret.dataset.octave = noteOctave;
            newFret.id = `fret-${this.id}`;

            // note = teoria.note(fretNoteName.slice(0,-1));
            
            if(this.id == 0){
                newFret.classList.add('open-fret')
                if(this.string.container.classList.contains('invisible-string')){

                    newFret.classList.add('invisible-open-fret');
                } else {

                    newFret.classList.add('inlay-fret');
                }
            } else {

                newFret.classList.add('fret');
                if(this.string.container.classList.contains('invisible-string')){

                    newFret.classList.add('invisible-fret');
                } else {

                    newFret.classList.add('regular-fret');

                    // change BG color of fret if it has an inlay in neck.inlays
                    let newFretNum = parseInt(newFret.id.replace('fret-',''));
                    if(this.string.neck.inlays.includes(newFretNum)){
                        
                        newFret.classList.add('inlay-fret');
                    }
                }
            }
        }
        return newFret
    }

    getFretName(){
        const intervalsWithAug4 = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7'];
        const intervalsWithDim5 = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'D5', 'P5', 'm6', 'M6', 'm7', 'M7'];

        let curString, curInterval, fretName;

        // top string is 'invisible'
        if(this.string.name != 'invisible'){
            curString = teoria.note(this.string.name);

            // intervals with 'A4' vs 'd5' (mainly for lydian vs locrian)
            if(this.neck.markedNotes.includes('d5')){

                // name of interval from open note to current fret
                curInterval =  intervalsWithDim5[this.id%12];
            } else {
                curInterval = intervalsWithAug4[this.id%12];
            }

            // actual interval object from open note to current fret
            fretName = curString.interval(curInterval);

            
            // raise octave of 12th fret to avoid modulus making id=0
            if(this.id === 12){
                fretName = `${fretName.toString().slice(0,-1)}${fretName.octave()+1}`

            } else {
                fretName = fretName.toString();
            }

            return fretName

        } else {

            // if string.name == 'invisible'
            return 'no-note'
        }
    }
}

