from django.shortcuts import render, redirect
from . import views
from .models import ChordProgression

def save_progression(request):
    if(request.method == 'POST'):
        if(request.POST['progression']):
            chord_names = request.POST['chord-names'].split(' ')
            chord_names = [name.capitalize() for name in chord_names]

            print(f'chord-names: {chord_names}')

            ChordProgression.objects.create(
                creator     = request.user,
                progression = request.POST['progression'],
                chord_names = chord_names
            )
        return redirect('pages-explore')

