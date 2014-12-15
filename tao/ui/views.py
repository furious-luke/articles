from tao import forms

def catalogue(self):
    forms = [
        forms.Lightcone(),
        forms.SED(),
        forms.Filter(),
        forms.Image(),
    ]
    return render('catalogue.html', ctx={'forms': forms})
