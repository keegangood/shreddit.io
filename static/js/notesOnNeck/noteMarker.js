class NoteMarker {
    constructor(neck, fret){
        this.neck = neck;
        this.fret = fret; // HTML fret div
        this.scaleFormula = neck.scale;
        this.scale = neck.markedNotes;
        // console.log(`fret: ${fret}`);
        this.container = this.draw();
        this.intervalFromTonic = this.getIntervalFromTonic();
        this.selectColor();

        // console.log(`interval: ${this.intervalFromTonic}`);
    }

    draw(){
        let newMarker = document.createElement('div');
        newMarker.classList.add('note-marker');

        return newMarker
    }

    selectColor() {
        const colors = {
            'P1':'--P1-color',
            'm2':'--m2-color',
            'M2':'--M2-color',
            'm3':'--m3-color',
            'M3':'--M3-color',
            'P4':'--P4-color',
            'A4':'--d5-color',
            'd5':'--d5-color',
            'P5':'--P5-color',
            'A5':'--m6-color',
            'm6':'--m6-color',
            'M6':'--M6-color',
            'A6':'--m7-color',
            'm7':'--m7-color',
            'M7':'--M7-color',
        }
        
        this.container.style.backgroundColor = `var(${colors[this.intervalFromTonic]})`
    }

    getIntervalFromTonic(){
        // if note is in scale,
        // get interval from the tonic to that note
        // otherwise, find enharmonic notes and check them

        let note = teoria.note(`${this.fret.getAttribute('name')}${this.fret.dataset.octave}`),
            enharmonics = note.enharmonics().toString().replace(/[0-9]/g, '').split(','),
            enharmonic,
            tonic = teoria.note(`${this.scale[0]}`),
            intervalFromTonic;

        if(this.scale.includes(note.toString().slice(0,-1))){

            intervalFromTonic = tonic.interval(teoria.note(note.toString().slice(0,-1)));
            this.container.dataset.interval = intervalFromTonic;

        } else {

            for(let i in enharmonics){
                enharmonic = teoria.note(enharmonics[i]);
                
                // if enharmonic name is in scale, find interval from tonic
                if(this.scale.includes(enharmonic.toString().slice(0,-1))){
                    intervalFromTonic = 
                        tonic.interval(
                        teoria.note(
                            enharmonic.toString().slice(0,-1)));
                        }
                    }
                }

            // invert descending intervals caused by varying octaves
            if(intervalFromTonic.toString().indexOf('-') != -1){
                intervalFromTonic = intervalFromTonic.invert();
            }
            this.container.dataset.interval = intervalFromTonic;

        return intervalFromTonic
    }
}