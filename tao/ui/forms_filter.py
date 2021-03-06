from django import forms
from tao.forms import *
from tao.models import *

def Filter(TAOForm):
    filters = forms.ChoiceField(BandpassFilter)

    def requirements(self):
        reqs = ['total_spectra']
        if self.cleaned_data['enable_disk']:
            reqs.append('disk_spectra')
        if self.cleaned_data['enable_bulge']:
            reqs.append('bulge_spectra')
        return reqs

    def exports(self):
        exps = []
        for flt in self.cleaned_data['filters']:
            exps.append(flt)
        return exps
