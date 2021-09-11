from django.shortcuts import render
from django.views.generic.edit import FormView
from django.views.generic import CreateView, View, ListView, UpdateView
from .models import Usuario
from .forms import Registro_nuevo, Verifyform, Loginform, Updatepassf, Updateallform
from .functions import code_gen
from django.core.mail import send_mail
from django.http import HttpResponseRedirect
from django.urls import reverse, reverse_lazy
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
# Create your views here.

class Registerview(FormView):
    template_name = 'usuarios/registro.html'
    form_class = Registro_nuevo
    success_url = '/'

    def form_valid(self, form):
        code_email=code_gen()
        registr=Usuario.objects.create_user(
            form.cleaned_data['email'],form.cleaned_data['passw1'],name=form.cleaned_data['name'],last_name=
            form.cleaned_data['last_name'],code_reg=code_email
        )
        asunto = 'Email verification'
        mensaje='Email confirmation code: {}'.format(code_email)
        email_remit='exordiumwebb@gmail.com'
        send_mail(asunto,mensaje,email_remit,[form.cleaned_data['email']])
        return HttpResponseRedirect(reverse('usuarios_app:verification',kwargs={'pk':registr.id}))

class Codeverify(FormView):
    template_name = 'usuarios/verify.html'
    form_class = Verifyform
    success_url = reverse_lazy('usuarios_app:login')
    
    def get_form_kwargs(self):
        kwargs=super(Codeverify, self).get_form_kwargs()
        kwargs.update(
            {'pk':self.kwargs['pk']}    
        )
        return kwargs
    
    def form_valid(self, form):
        Usuario.objects.filter(id=self.kwargs['pk']).update(is_active=True)
        return super(Codeverify, self).form_valid(form)

class Loginview(FormView):
    template_name = 'usuarios/login.html'
    form_class = Loginform
    success_url = '/'

    def form_valid(self, form):
        user= authenticate(email=form.cleaned_data['mail'],password=form.cleaned_data['passw'])
        login(self.request,user)
        return super(Loginview, self).form_valid(form)

class Logoutview(View):
    def get(self,request,*args,**kwargs):
        logout(request)
        return HttpResponseRedirect(reverse('usuarios_app:login'))



class Accountview(LoginRequiredMixin, ListView):
    template_name = 'usuarios/account.html'
    context_object_name = 'data'
    login_url = reverse_lazy('usuarios_app:login')

    def get_queryset(self):
        ide=self.request.user.id
        res = Usuario.objects.get(id=ide)
        return res

class Updateallview(LoginRequiredMixin, UpdateView):
    template_name = 'usuarios/updtall.html'
    model = Usuario
    form_class = Updateallform
    success_url = '/'
    login_url = reverse_lazy('usuarios_app:login')

    def get(self, request, *args, **kwargs):
        if self.request.user.id != int(self.kwargs['pk']):
            return HttpResponseRedirect(reverse('usuarios_app:account'))
        return super(Updateallview, self).get(request,*args,**kwargs)
    #--------------------------al cambiar de pk se puede editar cualquier usuario, no solo al que esta logeado
    #------------aqui tambien se puede cambiar el correo q es lo q se utiliza como usuario para login
    #------------------------YA ESTA RESUELTO----------------------------------------------

class Updatepass(LoginRequiredMixin, FormView):
    template_name = 'usuarios/updtpss.html'
    form_class = Updatepassf
    success_url = reverse_lazy('usuarios_app:login')
    login_url = reverse_lazy('usuarios_app:login')

    def form_valid(self, form):
        logeado=self.request.user
        user=authenticate(email=logeado.email,password=form.cleaned_data['passw1'])
        if user:
            newpass=form.cleaned_data['passw2']
            user.set_password(newpass)
            user.save()
        logout(self.request)
        return super(Updatepass, self).form_valid(form)
    #-------------------verificar su se debe user LOGEADO O USER---->SI FUNCIONA
