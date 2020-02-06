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
