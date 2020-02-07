from django.shortcuts import render, redirect
from . import views
from .models import ChordProgression
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages


def save_progression(request):
    if(request.method == 'POST'):
        if(request.POST['progression']):
            chord_names = request.POST['chord-names'].split(' ')
            chord_names = [name.capitalize() for name in chord_names]
            chord_names = ' '.join(chord_names)

            progression = ChordProgression.objects.create(
                creator     = request.user,
                progression = request.POST['progression'],
                chord_names = chord_names
            )

            context = {
                'progression': progression,
                'chord_names': chord_names
            }

        return render(request, 'pages/explore.html', context)

def explore_progression(request, id, return_url):
    if id:
        try:
            progression = ChordProgression.objects.get(id=id)

            print(f'id: {progression.id}')

            context = {
                'progression'        : progression,
                'chord_scale_objects': progression.chordScaleObjects
            }
            
            return render(request, 'pages/explore.html', context)

        except ObjectDoesNotExist:
            messages.error(request, 'That chord progression does not exist. Try again.')
            
            return redirect(request.path)
    else:
        return render(request, 'pages/explore.html')


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