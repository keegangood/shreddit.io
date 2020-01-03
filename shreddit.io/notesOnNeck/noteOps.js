const noteToInt = (note, accidental='none') => {
    // returns note value 0-11
    // for given note/accidental pair

    const note_ = {
        'C':{
            'b':11,
            'none':0,
            '#':1,
        },
        'D':{
            'b': 1,
            'none':2,
            '#':3,
        },
        'E':{
            'b':3,
            'none':4,
            '#':5,
        },
        'F': {
            'b':4,
            'none':5,
            '#':6,
        },
        'G':{
            'b':6,
            'none':7,
            '#':8,
        },
        'A': {
            'b':8,
            'none':9,
            '#':10,
        },
        'B': {
            'b':10,
            'none':11,
            '#':0,
        },
    }


    return note_dict[note[0]][accidental]
}


const getNoteNames = (accidentals='#') => {
    // returns list of notes with selected accidentals
    const notesSharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const notesFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    if(accidentals == '#'){
        return notesSharps
    } else{
        return notesFlats
    }
}


const intToNote = (noteInt, accidental) => {
    // Grab list of note names based on accidental
    // return the note name at the index of noteInt

    let noteNames;
    
    if(accidental == '#'){
        // F uses flats
        if(noteInt == 5){
            noteNames = getNoteNames('b');
        } else{
            noteNames = getNoteNames('#');
        }
    } else if(accidental == 'b'){
        noteNames = getNoteNames('b');
    } else {
        // all natural key names get sharps, except F, which gets flats, above
        noteNames = getNoteNames('#');
    }
    
    return noteNames[noteInt]
}


const expandDoubleSharps = note => {
    // Convert double sharp symbol 'x' to two sharp symbols '##'
    // Example: expandDoubleSharps('Fx') => 'F##'
    for(let i=0; i<note.length; i++){
        if(note[i] == 'x'){
            note = note.replace(note[i],'##');
        }
    }
    return note
}


const reduceAccidentals = note => {
    // Convert all 'x's to '##'
    // Get number of note to be reduced, 
    // ++ or -- that value for each tailing # or b
    // Example: reduceAccidentals('B##') => 'C#', reduceAccidentals('Fb') => 'E'

    note = expandDoubleSharps(note);
    
    let noteVal,
        noteName,
        accidental;

    if(note.length > 1){
        noteName = note.substring(0,1);
        accidental = note.substring(1,2);
        
    } else if(note.length == 1){
        noteName = note;
        accidental = 'none';
    }
        // console.log(`notename: ${noteName} ${accidental}`);
        
        noteVal = noteToInt(noteName, accidental);

        // check remaining characters
        for(let i=2; i<note.length; i++){
            
            // raise note value if sharp
            if(note[i] == '#'){
                noteVal++;
                if(noteVal == 12){
                    noteVal = 0;
                }
            // lower note value if flat
            } else if(note[i] == 'b') {
                noteVal--;
                if(noteVal == -1) {
                    noteVal = 11;
                }
            }
        }
    
    return intToNote(noteVal, accidental)
}

// let n = 'B'
// console.log(`reduce(${n}): ${reduceAccidentals(n)}`);

// Loop for testing output of above functions:
//


// let accidental;
// for(let i=0; i<notes.length; i++){
//     if(notes[i].length>1){
//         accidental = notes[i][1];
//     } else {
//         accidental = 'none';
//     }
    
//     let n = notes[i];
//     let nInt = noteToInt(n, accidental);
//     let rn = reduceAccidentals(n, accidental);
//     console.log(`${notes[i]}:${noteToInt(notes[i], accidental)} => ${rn}`);
// }

// Other functions from Python's Mingus library:
//
// const isEnharmonic = (note1, note2) => {
//     //Test whether note1 and note2 are enharmonic, i.e. they sound the same.
//     return noteToInt(note1) == noteToInt(note2)
// }

// const isValidNote = note => {
//     // return true if note is a recognized format. False if not

//     note = expandDoubleSharps(note);

//     if(_note_dict[note[0]] == undefined){
//         return false
//     } else {
//         for(let i=1; i<note.length; i++){
//             if(note[i] !== 'b' && note[i] !== '#'){
//                 console.log(`invalid char: ${note[i]}`);

//                 return false
//             }
//         }
//         return true
//     }
// }



