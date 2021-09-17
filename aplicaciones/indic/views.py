from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.views.generic import TemplateView,FormView
from .forms import Contactform
from django.urls import reverse_lazy

# Create your views here.

class Index(TemplateView):
    template_name = 'indic/index.html'

    def get_context_data(self, **kwargs):
        context = super(Index, self).get_context_data(**kwargs)
        if self.request.GET.get('mensajes',''):
            context['mensajes'] = self.request.GET.get('mensajes','')
        return context






class Aboutus(TemplateView):
    template_name = 'indic/about.html'

class contacto(FormView):
    template_name = 'indic/contacto.html'
    form_class = Contactform
    success_url = '/'

    def form_valid(self, form):
        mail=form.cleaned_data['email']
        asunt=form.cleaned_data['subject']
        messag=form.cleaned_data['message']
        send_mail(asunt,messag+' '+mail,mail,['omarramirezq@hotmail.com',])
        return redirect('/?mensajes=mensaje+enviado')
        # return reverse_lazy('indic_app:index',Kwargs={'mensajes':'mensaje enviado bien'})
