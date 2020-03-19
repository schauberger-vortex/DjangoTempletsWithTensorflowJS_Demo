from django.shortcuts import render
from django.http import HttpResponse

def home(request):
	#return HttpResponse('<h1>home view</h1>')
	return render(request, 'signIn/index.html')

# Create your views here.
