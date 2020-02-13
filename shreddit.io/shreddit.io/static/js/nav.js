
console.log(navInstrumentInput);
settingsIcon.addEventListener('click', () => {
    settingsIcon.classList.toggle('settings-icon-active')

    navSettingsMenu.classList.toggle('settings-menu-active');
})

updateInstrument(navInstrumentInput, navTuningInput);
updateTunings(neck.instrument, navTuningInput);

navInstrumentInput.addEventListener('change', function(e, otherNavInput=mobileInstrumentInput){
    newInstrument = navInstrumentInput.value;
    
    updateTunings(newInstrument, navInstrumentInput);
    updateTunings(newInstrument, otherNavInput);

    updateInstrument(navInstrumentInput, navTuningInput);
    updateNoteLegend();

    otherNavInput.value = newInstrument;
    
});


navTuningInput.addEventListener('change', function(e, otherTuningInput=mobileTuningInput){
    updateInstrument(navInstrumentInput, navTuningInput);
    updateInstrument(navInstrumentInput, otherTuningInput);
    updateNoteLegend();

    otherTuningInput.value = navTuningInput.value;
});


navExploreModeInput.addEventListener('change', (e, otherExploreModeInput=mobileExploreModeInput) => {
    changeExploreMode(navExploreModeInput);
    otherExploreModeInput.value = navExploreModeInput.value;
    
});