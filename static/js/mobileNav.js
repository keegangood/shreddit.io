let toggleActiveNav = mediaQuery => {
    let navBars = document.querySelectorAll('.navigation'),
        navBar;
        
    if(mediaQuery.matches){
        navBar = navBars[1];
        navBar.classList.toggle('active-nav');

    } else {
        navBar = navBars[0];
        navBar.classList.toggle('active-nav');
    }


}

// listen for screen width changes
// mediaQuery = window.matchMedia("(min-width: 400px)");
// mediaQuery.addListener(toggleActiveNav);
// let activeNav = toggleActiveNav(mediaQuery);

// console.log(activeNav);

    

burger.addEventListener('click', () => {
    mainContent.classList.toggle('no-scroll');

    mobileNavMenuContent.classList.toggle('content-inactive');

    topBun.classList.toggle('top-bun-active');
    burger.classList.toggle('mobile-nav-icon-active');
    meat.classList.toggle('meat-active');
    bottomBun.classList.toggle('bottom-bun-active');

    cover.classList.toggle('content-cover-active');
    mobileNavMenu.classList.toggle('mobile-menu-active');
    settingsMenuContent.classList.toggle('hidden');

    mobileScettingsIcon.classList.toggle('hidden');
    
});

mobileSettingsIcon.addEventListener('click', () => {
    mobileSettingsIcon.classList.toggle('mobile-nav-icon-active');
    mobileSettingsIcon.classList.toggle('mobile-settings-icon-active')
    mobileNavMenuContent.classList.toggle('hidden');

    burger.classList.toggle('hidden');

    cover.classList.toggle('content-cover-active');
    mobileNavMenu.classList.toggle('mobile-menu-active');
});

mobileInstrumentInput.addEventListener('change', function(e, otherNavInput=navInstrumentInput){
    newInstrument = mobileInstrumentInput.value;
    
    updateTunings(newInstrument, mobileTuningInput);
    updateTunings(newInstrument, otherNavInput);

    updateInstrument(mobileInstrumentInput, mobileTuningInput);
    // updateNoteLegend();

    otherNavInput.value = newInstrument;
    
});


mobileTuningInput.addEventListener('change', function(e, otherTuningInput=navTuningInput){
    updateInstrument(mobileInstrumentInput, mobileTuningInput);
    updateInstrument(mobileInstrumentInput, otherTuningInput);
    updateNoteLegend();

    otherTuningInput.value = mobileTuningInput.value;
});


mobileExploreModeInput.addEventListener('change', (e, otherExploreModeInput=navExploreModeInput) => {
    changeExploreMode(mobileExploreModeInput);
    
    otherExploreModeInput.value = mobileExploreModeInput.value;
});

document.addEventListener('DOMContentLoaded', function() {
    
    let elems = document.querySelectorAll('select');
    let options = {class:'browser-default'}
    let instances = M.FormSelect.init(elems, options);

});