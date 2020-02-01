from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='pages-home'),
    path('explore/', views.explore, name='pages-explore'),
    path('save_progression/', views.save_progression, name='save-progression')
]