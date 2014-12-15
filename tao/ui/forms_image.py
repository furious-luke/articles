from django import forms
from tao.forms import *

def Image(TAOForm):

    def validate_fov_ra(self):
        ra = self.tao_attributes['ra']
        x = self.cleaned_data['fov_ra']
        if 0.5*x > ra:
            raise ValidationError('Invalid RA field-of-vision: Larger than lightcone RA.')
