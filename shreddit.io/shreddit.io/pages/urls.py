from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='pages-home'),
    path('scales-and-chords/', views.scales_and_chords, name='pages-scales-and-chords'),
    path('progression-builder/', views.progression_builder, name='pages-progression-builder')
]