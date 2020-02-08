from django.shortcuts import render, redirect
from . import views
from .models import ChordProgression
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
import json

def save_progression(request):
    if request.method == 'POST' :
        if request.POST['progression'] :
            chord_names = request.POST['chord-names'].split(' ')
            chord_names = [name.capitalize() for name in chord_names]
            chord_names = ' '.join(chord_names)

            progression = ChordProgression.objects.create(
                creator     = request.user,
                progression = request.POST['progression'],
                chord_names = chord_names
            )

            context = {
                'loaded_progression': progression,
                'chord_names': chord_names,
                'path': request.path_info.split('/')[1]
            }

        return redirect('pages-explore', id=progression.id)

def edit(request, id):
    if request.method == 'GET':
        context = {}
        try:
            obj = ChordProgression.objects.get(id=id)

            # print(f'progression: {progression.progression.chordScaleObjects}')
            progression = json.loads(obj.progression)
            print(type(progression))

            context = {
                'progression'        : progression,
                'id'                 : id,
                'chord_scale_objects': progression['chordScaleObjects'],
                'path'               : request.path_info.split('/')[1]
            }

        except ObjectDoesNotExist:
            messages.error(request, 'That chord progression does not exist. Try again.')
            
            return redirect('profile')

        return render(request, 'chord-progressions/edit.html', context)

    if request.method == 'POST':
        pass


def delete_progression(request, id):
    try:
        progression = ChordProgression.objects.get(id=id)

        progression.delete()
        messages.info(request, 'The progression was deleted successfully!')
        
        return redirect('profile')

    except ObjectDoesNotExist:
        messages.info(request, 'That chord progression does not exist. Try again.')

        return redirect(request.path)

    return redirect('pages-explore')