from django import forms

class Contactform(forms.Form):
    email=forms.EmailField(label='Email',help_text='*Required',required=True,
                           widget=forms.EmailInput(attrs={'placeholder':'Required','class':'cont mail'}))
    subject=forms.CharField(label='Subject',help_text='What do you want to talk about',required=True,
                            widget=forms.TextInput(attrs={'placeholder':'i.e. Bug founded','class':'cont subj'}))
    message=forms.CharField(label='Message',required=True,widget=forms.Textarea(
        attrs={'cols':'40','rows':'10','class':'cont messag','placeholder':'What do you Think?'}))