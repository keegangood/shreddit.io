
// console.log(navInstrumentInput);
settingsIcon.addEventListener('click', () => {
    settingsIcon.classList.toggle('settings-icon-active')

    navSettingsMenu.classList.toggle('settings-menu-active');
})

updateInstrument(navInstrumentInput, navTuningInput);
updateTunings(neck.instrument, navTuningInput);

navInstrumentInput.addEventListener('change', function(e, otherNavInput=mobileInstrumentInput){
    newInstrument = navInstrumentInput.value;
    
    // console.log(newInstrument);
    

    updateTunings(newInstrument, navTuningInput);
    updateTunings(newInstrument, otherNavInput);

    updateInstrument(navInstrumentInput, navTuningInput);
    // updateNoteLegend();

    otherNavInput.value = newInstrument;
    
    navSettingsMenu.classList.remove('settings-menu-active');

});


navTuningInput.addEventListener('change', function(e, otherTuningInput=mobileTuningInput){
    updateInstrument(navInstrumentInput, navTuningInput);
    updateInstrument(navInstrumentInput, otherTuningInput);
    // updateNoteLegend();

    otherTuningInput.value = navTuningInput.value;
    navSettingsMenu.classList.remove('settings-menu-active');
});


navExploreModeInput.addEventListener('change', (e, otherExploreModeInput=mobileExploreModeInput) => {
    changeExploreMode(navExploreModeInput);
    otherExploreModeInput.value = navExploreModeInput.value;
    
    navSettingsMenu.classList.remove('settings-menu-active');

});