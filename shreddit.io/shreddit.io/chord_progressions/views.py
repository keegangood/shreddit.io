from django.shortcuts import render, redirect
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
from django.utils import timezone

from .models import ChordProgression
from . import views
import json

def save_progression(request):
    if request.method == 'POST' :
        new_progression    = request.POST['progression'] # populated from DOM element contents
        old_progression    = request.POST['loaded-progression'] # progression loaded from id

        if request.POST['loaded-progression-id']:
            old_progression_id = int(request.POST['loaded-progression-id'])
            print(type(old_progression_id))

        if request.POST['save-or-update'] == 'update':
            if old_progression == new_progression:
                messages.info(request, "There were no changes to save.")
                return redirect('pages-explore', id=old_progression_id)
            elif new_progression == '':
                messages.info(request, "Progression cannot be blank.")
                return redirect('pages-explore', id=old_progression_id)
            else:
                progression = ChordProgression.objects.get(id=old_progression_id)
                progression.progression = new_progression
                progression.edited_at = timezone.now
                
                progression.save()

                messages.success(request, "Progression updated successfully.")
                return redirect('pages-explore', id=progression.id)

        # 
        elif request.POST['save-or-update'] == 'save':
            if new_progression == '':
                messages.info(request, "Progression cannot be blank.")
                return redirect('pages-explore', id=0)
            else:
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
                messages.success(request, 'Progression saved!')

                return redirect('pages-explore', id=progression.id)
        else:
            return redirect('pages-explore', id=0)

    else:
        return redirect('pages-expolore', id=0)

        
def update(request):
    pass
    # if request.method == 'GET':
    #     context = {}
    #     try:
    #         obj = ChordProgression.objects.get(id=id)

    #         # print(f'progression: {progression.progression.chordScaleObjects}')
    #         progression = json.loads(obj.progression)
    #         print(type(progression))

    #         context = {
    #             'progression'        : progression,
    #             'id'                 : id,
    #             'chord_scale_objects': progression['chordScaleObjects'],
    #             'path'               : request.path_info.split('/')[1]
    #         }

    #     except ObjectDoesNotExist:
    #         messages.error(request, 'That chord progression does not exist. Try again.')
            
    #         return redirect('profile')

    #     return render(request, 'chord-progressions/edit.html', context)

    # if request.method == 'POST':
    #     pass


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