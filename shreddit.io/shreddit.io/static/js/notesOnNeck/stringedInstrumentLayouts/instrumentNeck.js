class InstrumentNeck {
    constructor(instrument, tuning, startFret, endFret){
        
        this.allKeys = [
            'Cb', 'C', 'C#', 'Db',
            'D', 'D#', 'E', 'F',
            'F#', 'Gb', 'G', 'G#',
            'Ab', 'A', 'A#', 'Bb', 'B'
        ]

        this.instrument = instrument;
        this.tuning = tuning;
        this.startFret = startFret;
        this.endFret = endFret;
        this.inlays = [3,5,7,9,12,15];

        this.curKey = teoria.note('c');

        this.scaleOrChord = 'scale';

        this.chordName = '';
        this.compatibleScales = [];
        
        this.scale = this.curKey.chord('');
        this.markedNotes = this.scale.simple();

        this.container = document.querySelector('#instrument-container');
        this.orientation = '';

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
            
            if(this.orientation == 'vertical'){
                
                // console.log("< 400px");
                
                this.container.append(string.container);
            } else if(this.orientation == 'horizontal') {
                // console.log("> 400px");
                
                this.container.prepend(string.container);
            }
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

    // Given a chord, return a list of scales 
    // that contain all the chord's tones
    findCompatibleScales(){
        let tempKey,
            knownScales = teoria.Scale.KNOWN_SCALES,
            scale,
            chord = this.scale.toString().split(','), // Major => ['P1', 'M3', 'M5']
            chordInterval,
            chordIntervalInt,
            noteAtInterval,
            noteMatches = [],
            compatibleScales = [],
            i,j,k,l;

        // reset array
        this.compatibleScales = [];

        // reduce compound intervals into simple ones:
        // 'P11' => 'P4', 'M13' => 'M6'
        for(i in chord){
            chordInterval = chord[i]; 

            if(chordInterval == 'd7'){
                chord[i] = 'm7';
            }

            chordIntervalInt = parseInt(chord[i].substring(1, chordInterval.length));
            if(chordIntervalInt > 7){
                chord[i] = teoria.interval(chord[i]).simple();
            }
        }

        for(j in this.allKeys){
            tempKey = teoria.note(this.allKeys[j]);
            
            for(k in knownScales){
                scale = tempKey.scale(knownScales[k]).simple(); // array of scale's note names

                // check each the note at eachchord interval in the 
                // current key to see if they are in the current scale
                noteMatches = [];
                for(l in chord){
                    chordInterval = chord[l];
                    noteAtInterval = this.curKey.interval(chordInterval).toString().slice(0,-1);
                    
                    if(scale.includes(noteAtInterval)){
                        noteMatches.push(noteAtInterval);
                    }
                }

                // if all notes in chord are in the scale
                // add scale name to compatible scale array 
                if(noteMatches.length == chord.length){
                    this.compatibleScales.push(
                        {
                            'key':tempKey.toString().slice(0,-1),
                            'name':knownScales[k],
                        }
                    );
                }
            }
        }

        console.log(`${this.compatibleScales.length} compatible scales found for ${this.curKey.scientific().toString().slice(0,-1)}${this.chordName}`);
        
        for(let x in this.compatibleScales){
            console.log(`key: ${this.compatibleScales[x].key}, scale: ${this.compatibleScales[x].name}`);
        }
    }

    placeNoteMarkers(){
        let markedNotes,
            markedNote,
            markedNoteName,
            matchingFrets,
            matchingFret,
            marker,
            neck = this;

        markedNotes = this.addEnharmonics();
        
        // check each marked note to see if it matches
        // the name of any frets. If so, mark them, if not, 
        // try its enharmonic names. 
        for(let i=0; i<markedNotes.length; i++){
            markedNote = teoria.note(markedNotes[i])

            markedNoteName = markedNote.scientific().toLowerCase().slice(0,-1);

            matchingFrets = document.querySelectorAll(`[name="${markedNoteName}"]`);

            for(let i=0; i<matchingFrets.length; i++){
                matchingFret = matchingFrets[i];

                // if fret doesn't already have a marker,
                // create new NoteMarker and place in matching fret
                if(!matchingFret.hasChildNodes()){

                    marker = new NoteMarker(neck, matchingFret);
                    matchingFret.append(marker.container);
                }
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