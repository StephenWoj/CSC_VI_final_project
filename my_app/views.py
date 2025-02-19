from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponseRedirect
#from django.contrib import messages
from django.contrib.auth import authenticate, login
#from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, UserUpdateForm#, ProfileUpdateForm, CreateTask
#from django.views.decorators.csrf import csrf_exempt
#from django.urls import reverse

# Create your views here.
def index_page(request):
    return render(request, 'index.html')

def login(request):
    return render(request, 'login.html')

def register(request):
        if request.method == 'POST':
            form = UserRegisterForm(request.POST)
            if form.is_valid():
                user = form.save()
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password')
                user = authenticate(username=username, password=password)
                login(request, user)
                return JsonResponse({'status': 'success'})
            else:
                return JsonResponse({'status': 'error', 'errors': form.errors})
        else:
             form = UserRegisterForm()
        return render(request, 'register.html', {'form': form})
#@login_required
#def createTask(request):

    #form = CreateTask()

    #if request.method == 'POST':
        #form = CreateTask(request.POST)

        #if form.is_valid():
            #form.save()
            #return redirect('')
            
    #context = {'form':form}
    #return render(request, 'profile/create-task.html', context=context)
