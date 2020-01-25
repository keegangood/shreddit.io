from django.shortcuts import render
from django.contrib import messages

def home(request):
    # messages.info(request, 'Welcome to the home page')
    return render(request, 'pages/home.html')

def scales_and_chords(request):
    return render(request, 'pages/scales-and-chords.html')

def progression_builder(request):
    pass