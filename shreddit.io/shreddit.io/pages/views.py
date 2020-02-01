from django.shortcuts import render, redirect
from django.contrib import messages
from chord_progressions.models import ChordProgression
# from django.contrib.


def home(request):
    # messages.info(request, 'Welcome to the home page')
    return render(request, 'pages/home.html')

def explore(request):
    return render(request, 'pages/explore.html')

def save_progression(request):
    if(request.method == 'POST'):
        messages.info(request, 'Progression saved!')
        return redirect('pages-home')