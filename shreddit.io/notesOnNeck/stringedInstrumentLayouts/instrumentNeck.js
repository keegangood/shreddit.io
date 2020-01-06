class InstrumentNeck {
    constructor(instrument, tuning, startFret, endFret){
        this.instrument = instrument;
        this.tuning = tuning;
        this.startFret = startFret;
        this.endFret = endFret;
        this.inlays = [3,5,7,9,12,15];

        this.curKey = teoria.note('c');

        this.scaleOrChord = 'scale';

        this.scale = this.curKey.scale('ionian');
        this.markedNotes = this.scale.simple();

        this.container = document.querySelector('#neck');
        this.stringNames = this.getInstrumentTunings();
        this.totalStrings = this.stringNames.length;
        this.strings = this.drawStrings();
    }

    getInstrumentTunings(instrument='') {
        const instruments = {
            'guitar': {
                'standard': ['E2','A3','D3','G3','B4','E4'],
                'drop-d': ['D2','A3','D3','G3','B4','E4'],
                'dadgad': ['D2','A3','D3','G3','A4','D4'],
                'open-d': ['D2','A3','D3','F#3','A4','D4'],
            },
            'mandolin': {
                'standard': ['G2','D3','A3','E4'],
            },
            'ukulele': {
                'standard': ['G4', 'C4','E4','A4'],
            }
        }
        
        if(instrument == ''){
            // Returns string names 
            return instruments[this.instrument][this.tuning]
        } else if(instrument == 'all'){
            // returns instrument names
            return Object.keys(instruments)
        } else {
            // returns list of tuning names
            return instruments[instrument]
        }
    };
    
    drawStrings(){
        let strings = [];
        for(let i=0; i<this.stringNames.length + 1; i++){
            
            let stringNum = i;
            let string = new InstrumentString(this, stringNum, this.stringNames[i]);

            this.container.prepend(string.container);
            strings.push(string);
        }

        return strings
    }

    // adds enharmonic notes to this.marked notes
    // in order to mark all frets on neck, as some
    // are named with flats and some with sharps
    addEnharmonics(){
        let notes,
            note,
            i,j,
            enharmonics,
            enharmonic;

        notes = this.markedNotes.slice();

        for(i in notes){
            // console.log(notes[i]);
            note = teoria.note(notes[i])
            enharmonics = note.enharmonics().toString().replace(/[0-9]/g, '').split(','); 

            for(j in enharmonics){
                enharmonic = enharmonics[j];
                
                // if enharmonic is not double flat 'Dbb' 
                // or double sharp 'Cx', i.e. C, D#, Bb etc.
                // push to array
                if(enharmonic.length < 3 && !enharmonic.includes('x')){
                    notes.push(enharmonic);
                }
            }
        }
        return notes
    }

    placeNoteMarkers(){
        let markedNotes,
            markedNote,
            markedNoteName,
            matchingFrets,
            matchingFret,
            marker;

        markedNotes = this.addEnharmonics();
        // console.log(`markedNotes: ${markedNotes}`);
        
        // check each marked note to see if it matches
        // the name of any frets. If so, mark them, if not, 
        // try its enharmonic names. 
        for(let i=0; i<markedNotes.length; i++){
            markedNote = teoria.note(markedNotes[i])

            markedNoteName = markedNote.scientific().toLowerCase().slice(0,-1);

            matchingFrets = document.querySelectorAll(`[name="${markedNoteName}"]`);

            for(let i=0; i<matchingFrets.length; i++){
                matchingFret = matchingFrets[i];
                                
                //create new NoteMarker and place in matching fret
                marker = new NoteMarker(neck, matchingFret);
                // console.log(matchingFret);
                
                matchingFret.append(marker.container);
            }
        }
    }

    removeNoteMarkers(string='all',fret='all') {
        if(string=='all' && fret=='all') {
            let markers = document.querySelectorAll(`.note-marker`);
            
            for(let i=0; i<markers.length; i++){
                markers[i].remove();
            }

        } else {
            let marker = document.querySelector(`#string-${string} #fret-${fret} > .note-marker`);
            marker.remove();
        }
    }
};