from django.shortcuts import render, redirect
from django.contrib import messages
from chord_progressions.models import ChordProgression
import json
from django.http import HttpResponse


def home(request):
    # messages.info(request, 'Welcome to the home page')
    return render(request, 'pages/home.html')

def explore(request):
    return render(request, 'pages/explore.html')

def save_progression(request):
    if(request.method == 'POST'):
        print(f'request.POST: {request.POST}')

        context = {
            'progression' : json.dumps(request.POST['progression']),
            'chord_names' : request.POST['chord-names'],
        }
        

        return render(request, 'pages/home.html', context)