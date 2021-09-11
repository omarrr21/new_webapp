from django.shortcuts import render
from django.views.generic import TemplateView,FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse, reverse_lazy
from geopy.geocoders import Nominatim

import datetime
import requests

import environ
env = environ.Env()
environ.Env.read_env()



api_code=env('clima_api_code')
# Create your views here.
geolocator = Nominatim(user_agent="mynamepr")
url='https://api.openweathermap.org/data/2.5/onecall?lat={}&lon={}&lang=en&units=metric&appid='+api_code
class Climaview(LoginRequiredMixin, TemplateView):
    template_name = 'clima/climaforecast.html'
    login_url = reverse_lazy('usuarios_app:login')

    def post(self,request,**kwargs):
        # print('post desde defpost')
        name=request.POST['busqueda_clima']
        loc = geolocator.geocode(name)
        # print(loc.raw)
        name=loc.raw['display_name']
        # --------------------prueba-------------------------------

        r = requests.get(url.format(loc.latitude,loc.longitude)).json()

        return render(request, 'clima/climaforecast.html',
                      {'wh': r,'name':name})



