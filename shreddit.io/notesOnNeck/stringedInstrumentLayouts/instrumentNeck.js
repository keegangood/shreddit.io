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

        this.scale = this.curKey.chord('');
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

    // Given a chord, return a list of scales 
    // that contain all the chord's tones


    // Needs to calculate scale and chord
    // notes in the given key 
    // rather than raw intervals

    // find scale in note names
    // find each note in chord from tonic to its interval
    // if that note is in the scale, add to list

    findCompatibleScales(){
        let tempKey,
            knownScales = teoria.Scale.KNOWN_SCALES,
            scale,
            chord = this.scale.toString().split(','),
            chordInterval,
            chordIntervalInt,
            noteAtInterval,
            noteMatches = [],
            compatibleScales = [],
            i,j,k,l;

        console.log();
        console.log();
        console.log(`chord: ${chord}`);

        // subtract 7 from all intervals above M7
        // 'P11' => 'P4', 'M13' => 'M6'
        for(i in chord){
            chordInterval = chord[i]; 

            if(chordInterval == 'd7'){
                chord[i] = 'm7';
            }
            console.log(chord[i]);
            console.log(this.curKey.interval(chord[i]).toString().slice(0,-1));
            
            chordIntervalInt = parseInt(chord[i].substring(1, chordInterval.length));
            if(chordIntervalInt > 7){
                chord[i] = teoria.interval(chord[i]).simple();
                // chord[i] = `${chordInterval[0]}${chordIntervalInt - 7}`
            }
        }

        console.log(`chord: ${chord}`);

        for(j in this.allKeys){
            tempKey = teoria.note(this.allKeys[j]);
            
            for(k in knownScales){
                scale = tempKey.scale(knownScales[k]).simple(); // array of scale's note names
                
                console.log();
    
                console.log(`scaleName: ${knownScales[k]}`);
                console.log(`scale: ${scale}`);
                
                noteMatches = [];
                for(l in chord){
                    chordInterval = chord[l];
                    noteAtInterval = this.curKey.interval(chordInterval).toString().slice(0,-1);
                    console.log(`chordInterval: ${chordInterval} - noteAtInterval: ${noteAtInterval}`);
                    if(scale.includes(noteAtInterval)){
                        
                        noteMatches.push(noteAtInterval);
                    }
                }
                console.log(`noteMatches: ${noteMatches}`);
                if(noteMatches.length == chord.length){
                    compatibleScales.push(
                        {
                            'key':tempKey.toString().slice(0,-1),
                            'name':knownScales[k],
                        }
                        );
                }
            }
        }

        console.log(`${compatibleScales.length} compatible scales found for ${chord}`);
        
        for(let x in compatibleScales){
            console.log(`key: ${compatibleScales[x].key}, scale: ${compatibleScales[x].name}`);
        }
        
    }
            
    //         noteMatches = [];

    //         for(l in chord){
    //             chordInterval = chord[k];
    //             console.log(`chordInterval: ${chordInterval}`);

    //             noteAtInterval = neck.curKey.interval(chordInterval).toString().slice(0,-1);
    //             console.log(`noteAtInterval: ${noteAtInterval}`);
                
    //             if(scale.includes(noteAtInterval)){
    //                 console.log(`match: ${noteAtInterval}`);
                    
    //                 noteMatches.push(noteAtInterval);
    //             }
                
    //         }

    //         console.log(`noteMatches: ${noteMatches}`);
            
    //         if(noteMatches.length == chord.length){
    //             compatibleScales.push(knownScales[j]);
    //         }
    //     }
    //     return compatibleScales

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