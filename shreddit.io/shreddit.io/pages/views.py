from django.shortcuts import render
from django.contrib import messages

def home(request):
    messages.info(request, 'Welcome to the home page')
    return render(request, 'pages/home.html')

