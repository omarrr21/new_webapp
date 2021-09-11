from django.shortcuts import render
from django.views.generic import TemplateView
from geopy.geocoders import Nominatim

# Create your views here.

class Cronoview(TemplateView):
    template_name = 'crono/cronometro.html'

class Relojview(TemplateView):
    template_name = 'crono/reloj.html'

