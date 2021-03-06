from django import forms
from tao.forms import *

def Lightcone(TAOForm):
    GEOMETRY_CHOICES = [
        ('L', 'Lightcone'),
        ('B', 'Box'),
        ('P', 'Premade'),
    ]
    geometry = forms.CharField(max_length=1, choices=GEOMETRY_CHOICES)
    ra = forms.FloatField()
    dec = forms.FloatField()
    redshift = forms.FloatField()

    def exports(self):
        exps = self.cleaned_data['properties']
        return exps

    def validate_ra(self):
        if self.cleaned_data['geometry'] == 'L':
            x = self.cleaned_data['ra']
            if x < 0 or x > 360:
                raise ValidationError('Invalid RA: must be between 0 and 360.')

    def validate_dec(self):
        if self.cleaned_data['geometry'] == 'L':
            x = self.cleaned_data['dec']
            if x < -90 or x > 90:
                raise ValidationError('Invalid DEC: must be between -90 and 90.')
