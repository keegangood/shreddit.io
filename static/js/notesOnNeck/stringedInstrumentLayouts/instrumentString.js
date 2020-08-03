class InstrumentString{
    constructor(neck, stringNum, stringName='invisible'){
        this.neck = neck;
        this.id = stringNum;
        this.name = stringName;
        this.container = this.draw();
        this.label = this.createLabel();
        this.frets = this.createFrets();
    }

    draw(){
        let totalStrings = this.neck.totalStrings;
        let newString = document.createElement('div');
        
        newString.id = `string-${this.id}`;
        
        newString.setAttribute('name', this.name);

        newString.classList.add('string');
        if(this.id == 0 || this.id == this.neck.totalStrings) {
            newString.classList.add('invisible-string');
        }

        return newString
    }

    createLabel() {
        let label = document.createElement('div');
        if(this.name !== 'invisible'){
            label.innerText = this.name.slice(0, this.name.length-1);
            label.id=(`${this.name}-string-label`);
            label.classList.add('string-label', 'blue-grey');
            this.container.prepend(label);
        }
    }


    createFrets() {

        let frets = [];
        for(let i=this.neck.startFret; i<this.neck.endFret; i++){
            let fretNum = i;

            let fret = new InstrumentFret(this.neck, this, fretNum);

            this.container.append(fret.container);

            fret.draw();
            frets.push(fret.container);
        }
        return frets
    };
};