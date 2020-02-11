const updateEditDisplay = (button, progressionItem) => {

    let editStatus = document.querySelector('#edit-status');
    console.log(editStatus);

    if(button.innerText == 'Edit'){
        editProgressionItem(progressionItem);

        editStatus.classList.add('show');

        button.innerText = 'Editing...';

        button.classList.remove('blue-grey-text');
        button.classList.remove('text-lighten-5');

        button.classList.add('red-text');
        button.classList.add('text-darken-1');
    } else if(button.innerText == 'Editing...'){
        button.innerText = 'Edit';

        button.classList.remove('red-text');
        button.classList.remove('text-darken-1');

        button.classList.add('blue-grey-text');
        button.classList.add('text-lighten-5');

    }
    
}

const editProgressionItem = item => {
    item.querySelector('#edit-progression-item').innerText = 'Editing...';

    // console.log(progressionKeyInput);
    // console.log(progressionChordQuality);
    // console.log(compatibleScaleSelect);
    let currentChordKey,
        currentChordName,
        currentScale;

    currentChordKey  = item.querySelector('.chord-name');
    currentChordName = item.querySelector('.chord-name');
    currentScale     = item.querySelector('.scale-name');

    console.log(item.querySelector('.close'));
    
    item.querySelector('.close').addEventListener('click', (e, i=item) => {
        let button = item.querySelector('#edit-progression-item');
        console.log(e.target);
        console.log(item);

        button.innerText = 'Edit';
        
        button.classList.remove('red-text');
        button.classList.remove('text-darken-1');

        button.classList.add('blue-grey-text');
        button.classList.add('text-lighten-5');
    })

    // item.querySelector('.close').dispatchEvent(new Event('click'));


    console.log(`current chord: `);
    
}

