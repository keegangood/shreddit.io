profileImageInput.addEventListener('change', () => {
    let value = profileImageInput.value;
    let lastIndex = 0;
    let filename = '';


    // forward slashes for unix,
    // backslashes for windows
    if(value.includes('/')){
        slash = '/';
    } else if (value.includes('\\')){
        slash = '\\';
    }

    value = value.split(slash);
    lastIndex = value.length - 1;

    filename = value[lastIndex];

    newImageUrl.innerText = filename;

});