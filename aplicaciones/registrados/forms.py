from django import forms
from django.contrib.auth import authenticate
from .models import Usuario

class Registro_nuevo(forms.ModelForm):
    passw1=forms.CharField(label='Password',required=True,widget=forms.PasswordInput(
        attrs={'placeholder':'Enter password','class':'paswd'}
    ))
    passw2=forms.CharField(label='Confirm password',help_text='*Required from forms',required=True,widget=forms.PasswordInput(
        attrs={'placeholder':'Repeat your password','class':'paswd'}
    ))
    class Meta:
        model=Usuario
        fields=('email','name','last_name')
        labels={'email':'Email','name':'Name','last_name':'Last Name'}
        widgets={
            'email':forms.EmailInput(attrs={'placeholder':'I.E example@mail.com'})
        }

    def clean_passw2(self):
        if self.cleaned_data['passw1']!= self.cleaned_data['passw2']:
            self.add_error('passw2','Passwords are NOT the same')


class Verifyform(forms.Form):
    codigo=forms.CharField(required=True)

    def __init__(self,pk,*args,**kwargs):
        self.id_user=pk
        super(Verifyform, self).__init__(*args,**kwargs)

    def clean_codigo(self):
        code=self.cleaned_data['codigo']
        if len(code)==6:
            actv=Usuario.objects.code_validation(self.id_user,code)
            if not actv:
                raise forms.ValidationError('Incorrect verification Code')
        else:
            raise forms.ValidationError('Incorrect verification Code')

class Loginform(forms.Form):
    mail=forms.CharField(label='Email',required=True,widget=forms.EmailInput(attrs={'class':'log-inpt'}))
    passw=forms.CharField(label='Password',required=True,widget=forms.PasswordInput(attrs={'class':'log-inpt'}))

    def clean(self):
        # clean por si solo significa que es una validacion que debe hacerse primero, cuando tiene _ (barra baja)
        # validara el campo despues de la barra
        cleaned_data = super(Loginform, self).clean()
        email = self.cleaned_data['mail']
        passw = self.cleaned_data['passw']
        if not authenticate(email=email, password=passw):
            raise forms.ValidationError('Los datos de usuario no son correctos')
        return self.cleaned_data

class Updatepassf(forms.Form):
    passw1=forms.CharField(label='Actual Password',help_text='required',required=True,
                           widget=forms.PasswordInput(attrs={'placeholder':'**********','class':'updt-pss'}))
    passw2=forms.CharField(label='New Password',help_text='required',required=True,
                           widget=forms.PasswordInput(attrs={'placeholder':'**********','class':'updt-pss'}))

class Updateallform(forms.ModelForm):
    class Meta:
        model=Usuario
        fields=('email','name','last_name','country','gender','date_birth','photo')
        labels={'email':'Email:' ,'name':'Name:','last_name':'Last Name:','country':'Nacionality:',
                'gender':'Gender:','date_birth':'Date of Birth:','photo':'Picture/Avatar:'}
        widgets={
            'email':forms.EmailInput(attrs={'placeholder':'Enter Email','class':'em-upd-fm'}),
            'name':forms.TextInput(attrs={'placeholder':'Your Name Here','class':'nam-upd-fm'}),
            'last_name': forms.TextInput(attrs={'placeholder': 'Your LastName Here', 'class': 'lastn-upd-fm'}),
            'country': forms.TextInput(attrs={'placeholder': 'Where are you from?', 'class': 'count-upd-fm'}),
            'date_birth':forms.DateInput(format=('%d-%m-%Y'),
                               attrs={'class':'myDateClass',
                               'placeholder':'Select a date','type': 'date'}),
            'photo':forms.FileInput()
        }

