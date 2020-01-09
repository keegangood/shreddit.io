
let synth = new Tone.Synth();
let poly = new Tone.PolySynth(3, Tone.Synth).toMaster();

let kick = new Tone.MembraneSynth().toMaster();

let startButton = document.querySelector('#start');
let stopButton = document.querySelector('#stop');


const kickLoop = [[0, "C2"], ["0:1", "C2"], ["0:2", "C2"],["0:3","C2"]];

const part1 = new Tone.Part(function(time, event){
    kick.triggerAttackRelease(event, '8n', time);
    
}, kickLoop).start(0);

const chordLoop = [
    {
        'time': '0',
        'chord': ['C4', 'E4', 'G4'],
        'velocity': '.5',
    },
    {
        'time': '2',
        'chord': ['E4', 'B4', 'G4'],
        'velocity': '.3',
    },
    {
        'time': '4',
        'chord': ['G4', 'B4', 'D4'],
        'velocity': '.3',
    },
    {
        'time': '6',
        'chord': ['E4', 'G4', 'B4'],
        'velocity': '.3',
    },
]

let count = 0;
const part2 = new Tone.Part(function(time, event){
    poly.triggerAttackRelease(event.chord, '2n', time, event.velocity);
    
    console.log(event);
    

    // count++;
    console.log(`event: ${event.chord}`);
}, chordLoop).start(0);

// const part1 = new Tone.Part(function(time, event){
//     console.log("hello world");
//     // poly.triggerAttackRelease(['A3','C3','E3'], '8n', time)
//     // poly.triggerAttackRelease(event.chord, event.duration, time);
    
// }, chordLoop).start(0);

startButton.addEventListener('click', () => {

    part1.loop = true;
    part1.loopStart = '0:0';

    part2.loop = true;
    part2.loopStart = '0:0';
    part2.loopEnd = `${chordLoop.length}m` // 2 chords => '2m'

    Tone.Transport.bpm.value = 110;
    Tone.Transport.start();
});

stopButton.addEventListener('click', () => {
    Tone.Transport.stop();
});