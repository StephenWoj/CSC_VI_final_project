from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, update_session_auth_hash
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, ProfileUpdateForm
from .models import Profile
# Create your views here.
def index(request):
    return render(request, 'index.html')

#def about(request):
    #return render(request, 'about.html')

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            profile, created = Profile.objects.get_or_create(user=user)
            if not profile.image:
                profile.image = "default.jpg"
                profile.save()
                
            login(request, user)
            return JsonResponse({'success': True})  
        else:
            return JsonResponse({'success': False, 'error': form.errors.as_text()})
    form = UserRegisterForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return JsonResponse({'success': True, 'redirect_url': '/'})  
        else:
            return JsonResponse({'success': False})  
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

@login_required
def profile(request):
    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = request.user
        user.username = username

        if password:
            user.set_password(password)
            update_session_auth_hash(request, user)  

        if form.is_valid():
            form.save()

        user.save()
        return render(request, 'profile.html', {'form': form, 'message': 'Profile has been updated successfully!'})

    else:
        form = ProfileUpdateForm(instance=request.user.profile)

    return render(request, 'profile.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('index')