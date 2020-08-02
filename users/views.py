from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import  UserSignupForm, UserUpdateForm
from chord_progressions.models import ChordProgression
from .models import CustomUser
import json

def signup(request):
    if request.method == 'POST':
        form = UserSignupForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created! You can now login as {username}!')
            return redirect('login')
        else:
            print(form.errors)
    else:
        form = UserSignupForm()

    return render(request, 'users/signup.html', {'form':form})

@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)

        if u_form.is_valid():
            u_form.save()

            messages.success(request, f'Your account has been updated!')
            return redirect('profile')
    else:
        progressions = ChordProgression.objects.filter(creator=request.user)

        print(f'progressions*** {progressions}')

        u_form = UserUpdateForm(instance=request.user)

    context = {
        'u_form':u_form,
        'progressions': progressions,
    }
    return render(request, 'users/profile.html', context)
