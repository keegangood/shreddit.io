






const playNotes = (progressionObject) => {
    // console.log(`progression: ${progressionObject}`);

    let instrument = SampleLibrary.load({
        instruments: 'piano', //['piano', 'bass-electric', 'bassoon', 'cello', 'clarinet', 'contrabass', 'flute', 'french-horn', 'guitar-acoustic', 'guitar-electric','guitar-nylon', 'harmonium', 'harp', 'organ', 'saxophone', 'trombone', 'trumpet', 'tuba', 'violin', 'xylophone'],
        baseUrl: "http://localhost:8000/static/js/playNotes/tonejs-instruments/samples/",
        minify: true,
    });

    Tone.Buffer.on('load', (data=progressionObject) => {
        
        console.log(`data: `, data);

        instrument.toMaster();

        // instrument.triggerAttack(data.chordLoop[0].chord, '2n');
        chordLoop = data.chordLoop;

        const chordPart = new Tone.Part(function(time, event){
            instrument.triggerAttackRelease(event.chord, '1m', time, event.velocity);
            instrument.humanize = true;
            console.log(event);
        }, chordLoop).start(1);
    
        chordPart.loop = true;
        chordPart.loopEnd = `${chordLoop.length}m` // 2 chords => '2m', 6 chords => '6m'
    
    })
}

playButton.addEventListener('click', () => {
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
