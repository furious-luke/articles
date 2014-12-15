from django import forms
from tao.forms import *

def SED(TAOForm):

    def exports(self):
        exps = ['total_spectra']
        if self.cleaned_data['enable_disk']:
            exps.append('disk_spectra')
        if self.cleaned_data['enable_bulge']:
            exps.append('bulge_spectra')
        return exps
