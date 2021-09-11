from django.urls import path
from . import views

app_name='clima_app'
urlpatterns = [
    path('busqueda/',views.Climaview.as_view(),name='clima'),
]