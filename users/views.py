from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import (
    UserSignupForm,
    UserUpdateForm,
    ProfileImageUpdateForm
)
from chord_progressions.models import ChordProgression
from .models import CustomUser
import json
from PIL import Image

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

        if request.FILES:            
            img_name = request.FILES.get('profile_image')            
            img = Image.open(img_name)

            if img.height > 500 or img.width > 500:
                output_size = (500,500)
                img.thumbnail(output_size)
                # img.save(f'media/{}')
        u_form = UserUpdateForm(data=request.POST, instance=request.user, files=request.FILES)

        print('u_form:', u_form)

        if u_form.is_valid():
            
           
            
            request.user.save()
            messages.success(request, f'Your account has been updated!')
            return redirect('profile')
        else:
            errors = u_form.errors
            print(errors)
    else:
        progressions = ChordProgression.objects.filter(creator=request.user)

        print(f'progressions*** {progressions}')

        u_form = UserUpdateForm(instance=request.user)
    
    context = {
        'u_form':u_form,
        'progressions': progressions,
    }
    return render(request, 'users/profile.html', context)
