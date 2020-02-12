
const updateDisplay = data => {
    // console.log(`${data.chordKey}${data.chordQuality}`);
    let chordKey = data.chordKey,
        chord    = data.chordQuality,
        scaleKey = teoria.note(data.scaleKey),
        scale    = scaleKey.scale(data.scaleName);

        neck.scaleOrChord = 'scale';
        neck.scale =         scale;
        neck.markedNotes =   scale.simple();

        neck.removeNoteMarkers();
        neck.placeNoteMarkers();
}



const playNotes = (progressionObject) => {
    console.log(progressionObject);

    let instrument = SampleLibrary.load({
        instruments: 'guitar-acoustic', //['piano', 'bass-electric', 'bassoon', 'cello', 'clarinet', 'contrabass', 'flute', 'french-horn', 'guitar-acoustic', 'guitar-electric','guitar-nylon', 'harmonium', 'harp', 'organ', 'saxophone', 'trombone', 'trumpet', 'tuba', 'violin', 'xylophone'],
        baseUrl: "http://localhost:8000/static/js/playNotes/tonejs-instruments/samples/",
        minify: true,
    });

    Tone.Buffer.on('load', (data=progressionObject) => {
        // console.log("called");
        
        instrument.toMaster();

        // instrument.triggerAttack(data.chordLoop[0].chord, '2n');
        chordLoop = data.chordLoop;

        const chordPart = new Tone.Part(function(time, event, progObject=data){
            instrument.triggerAttackRelease(event.chord, '1m', time, event.velocity);
            instrument.humanize = true;

            Tone.Draw.schedule(function(data=event){
                updateDisplay(data);
                // console.log(`time: ${time}`);
                
            }, time)

        }, chordLoop).start(1);
    
        chordPart.loop = true;
        chordPart.loopEnd = `${chordLoop.length}m` // 2 chords => '2m', 6 chords => '6m'
    
    })
}

playButton.addEventListener('click', () => {
    // console.log("play button clicked");

    let pairs = compileChordScaleObject();
    let progression = compileProgression(pairs);

    playNotes(progression);

    Tone.Transport.start();
    // Tone.Transport.start();
})

pauseButton.addEventListener('click', () => {
    Tone.Transport.stop();
})

// const kickLoops = {
//     0:[["C2", ["C2","C2"], "C2", "C2"]],
// }

// const highHatLoops = {
//     0:[['C4','C4'],['C4','C4'],['C4','C4'],['C4','C4']],
// };

// const snareLoops = {
//     0:[[null, null,'C4', null]],
// };





// Tone.Buffer.on('load', function(){
//     // console.log('called');
    
    
// });




// // playNotes("","")
