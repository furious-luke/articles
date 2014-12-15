from django import forms
from tao.forms import *

def Dust(TAOForm):

    def requirements(self):
        reqs = ['total_spectra']
        if self.cleaned_data['enable_disk']:
            reqs.append('disk_spectra')
        if self.cleaned_data['enable_bulge']:
            reqs.append('bulge_spectra')
        return reqs
