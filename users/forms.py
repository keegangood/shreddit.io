from django import forms
from users.models import CustomUser
from django.contrib.auth.forms import UserCreationForm

class UserSignupForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ['email', 'password1', 'password2']

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['profile_image']

class ProfileImageUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['profile_image']