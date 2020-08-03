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
from os import mkdir
from os import path, remove
from shutil import move
from django.conf import settings


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

        u_form = UserUpdateForm(data=request.POST, instance=request.user, files=request.FILES)
        old_extension = request.user.profile_image.url.split('.')[-1]

        if u_form.is_valid():
            # if an image was uploaded,
            # resize if greater than 500px, 500px
            if request.FILES:
                old_file_name = request.user.profile_image.url
                print(old_file_name)
                
                old_image_path = path.join(
                    settings.MEDIA_ROOT,
                    'profile_images',
                    request.user.email,
                    f'profile_image.{old_extension}'.lower(),
                )
                
                remove(old_image_path)

                img_file = request.FILES.get('profile_image')
                img_name = img_file.name
                img = Image.open(img_file)
                img_extension = img_name.split('.')[-1]
                # print(img_extension)
                img_path = path.join(
                    settings.MEDIA_ROOT,
                    'profile_images',
                    request.user.email
                )

                if img.height > 500 or img.width > 500:
                    output_size = (500,500)
                    img.thumbnail(output_size)

                
                # rename image
                renamed_path = path.join(img_path, f'profile_image.{img_extension.lower()}')
                
                # save original path
                img.save(renamed_path)

                request.user.profile_image = renamed_path
                request.user.save()

            messages.success(request, f'Your account has been updated!')
            return redirect('profile')
        else:
            errors = u_form.errors
            print(errors)
    else:
        progressions = ChordProgression.objects.filter(creator=request.user)

        # print(f'progressions*** {progressions}')

        u_form = UserUpdateForm(instance=request.user)
    
    context = {
        'u_form':u_form,
        'progressions': progressions,
    }
    return render(request, 'users/profile.html', context)
