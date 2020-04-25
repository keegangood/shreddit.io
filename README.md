# Shreddit.io

Shreddit allows users to quickly and easily visualize chord progressions and compatible scales. Chords and scales can be played back and represented on the instrument of the user's choosing.

## Technologies

- HTML
- CSS
- Vanilla JS
- Django
- Django REST
- SQlite

### Libraries

- **Materialize CSS**
<http://materializecss.com/>

- **Sortable.js** for drag and drop rearrangement of progressions
<http://sortablejs.github.io/Sortable/>

- **Tone.js** for audio playback and DOM manipulation in musical time <https://tonejs.github.io/>

- **Teoria.js** for all music theory calculations
<https://github.com/saebekassebil/teoria>

## Features

- Interface for pairing chords with compatible scales

- Audio for user's chord-scale combinations generated in real time and displayed on the instrument of their choosing

- User profile with saved chord progressions

- Vertically oriented neck for vertical mobile displays

- Support for displaying chord formulas on neck

- Load saved progressions into explore/load/<int:id>

## Future Features

- Audio playback for scale/chord mode

- Identify chords based on user-placed markers

- Previous/Current/Next chord display on audio playback

- Fix breakpoints for med screens as well as portrait vs landscape orientations.

- Differently shaped markers for each interval for colorblind accessability

- Step sequencers for drum and chord rhythms

- Display probabilities of particular chords following user's selected chord

- Rebuild interface in React for better performance
