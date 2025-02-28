from django.urls import path
from .views import index, register, login_view, profile, logout_view

urlpatterns = [
    path('', index, name='index'),
    #path('about/', about, name='about'),
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('profile/', profile, name='profile'),
    path('logout/', logout_view, name='logout'),
]