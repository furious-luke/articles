from django import forms
from tao.forms import *

def Lightcone(TAOForm):
    GEOMETRY_CHOICES = [
        ('L', 'Lightcone'),
        ('B', 'Box'),
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

def SED(TAOForm):

    def exports(self):
        exps = ['total_spectra']
        if self.cleaned_data['enable_disk']:
            exps.append('disk_spectra')
        if self.cleaned_data['enable_bulge']:
            exps.append('bulge_spectra')
        return exps

def Filter(TAOForm):

    def requirements(self):
        reqs = ['total_spectra']
        if self.cleaned_data['enable_disk']:
            reqs.append('disk_spectra')
        if self.cleaned_data['enable_bulge']:
            reqs.append('bulge_spectra')
        return reqs
