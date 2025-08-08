from django.urls import path
from . import views

urlpatterns = [
    path('event_list_create', views.event_list, name='event_list_create'),
    path('event_detail/<uuid:pk>/', views.event_detail, name='event_detail'),
]