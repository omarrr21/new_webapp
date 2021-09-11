"""web_exordium URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/',include('aplicaciones.registrados.urls',namespace='usuarios_app')),
    path('',include('aplicaciones.indic.urls',namespace='indic_app')),
    path('clima/',include('aplicaciones.clima.urls',namespace='clima_app')),
    path('stopwatch/', include('aplicaciones.crono.urls', namespace='crono_app')),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
