

const playNotes = () => {

    let instrument = SampleLibrary.load({
        instruments: 'piano', //['piano', 'bass-electric', 'bassoon', 'cello', 'clarinet', 'contrabass', 'flute', 'french-horn', 'guitar-acoustic', 'guitar-electric','guitar-nylon', 'harmonium', 'harp', 'organ', 'saxophone', 'trombone', 'trumpet', 'tuba', 'violin', 'xylophone'],
        baseUrl: "tonejs-instruments/samples/",
        minify: true,
    });

    Tone.Buffer.on('load', () => {
        console.log('called');
        
        instrument.toMaster();
        instrument.triggerAttackRelease(['C','E','G','B'], '8n');
    })
}

playButton.addEventListener('click', () => {
    let pairs = compileChordScaleObject();

    compileProgression(pairs);
    playNotes();
})


const kickLoops = {
    0:[["C2", ["C2","C2"], "C2", "C2"]],
}

const highHatLoops = {
    0:[['C4','C4'],['C4','C4'],['C4','C4'],['C4','C4']],
};

const snareLoops = {
    0:[[null, null,'C4', null]],
};





Tone.Buffer.on('load', function(){
    console.log('called');
    
    
});




// playNotes("","")
