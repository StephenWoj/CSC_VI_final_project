from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .forms import  CreateTask, UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
import json
# Create your views here.
def index_page(request):
    return render(request, 'index.html')

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Registration successful!')
            return HttpResponseRedirect(reverse('login'))
        else:
             messages.error(request, 'Registration failed. Please correct the errors below.')
             return render(request, 'registration.html', {'form': form})
    else:
        form = UserCreationForm()
    return render(request, 'registration.html', {'form': form})
@csrf_exempt
def login_view(request):
            if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                data = json.loads(request.body)
                username = data.get('username')
                password = data.get('password')
                user = authenticate(request, username=username, password=password)
        
                if user is not None:
                    login(request, user)
                    return JsonResponse({'success': True, 'redirect_url': '/'})
                else:
                    return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
            return render(request, 'myapp/login.html')
@login_required
def createTask(request):

    form = CreateTask()

    if request.method == 'POST':
        form = CreateTask(request.POST)

        if form.is_valid():
            form.save()
            return redirect('')
            
    context = {'form':form}
    return render(request, 'profile/create-task.html', context=context)
