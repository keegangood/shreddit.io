from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='pages-home'),
    path('explore/<int:id>', views.explore, name='pages-explore'),
]