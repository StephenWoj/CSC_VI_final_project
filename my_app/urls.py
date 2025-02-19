from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_page, name='index'),
    #path('login', views.login_required, name='login'),
    #path('register/', views.register, name='register'),
    #path('dashboard', views.dashboard, name='dashboard'),
    #path('create-task', views.createTask, name='create-task'),
]