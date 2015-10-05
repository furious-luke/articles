import math
import numpy as np
import matplotlib.pyplot as plt

from mpltools import style
from mpltools import layout

style.use('ggplot')

figsize = layout.figaspect(scale=1.2)
fig, axes = plt.subplots(ncols=1, nrows=1, figsize=figsize)

r = 3.675
e = math.exp(1.0)
a_func = lambda x: r/(e*e*e - 1.0/(e*e))*math.pow(x/1.479, 0.4) - 1.0/(math.pow(e, 5.0) - 1.0) + 0.06
def k_func(x):
    if x <= 6300.0:
        return 2.659*(-2.156 + 1.5098e4/x - 1.98e7/(x*x) + 1.1e10/(x*x*x)) + r
    else:
        return 2.659*(-1.857 + 1.04e4/x) + r
E_func = lambda x,s: math.pow(10.0, -0.4*k_func(x)*a_func(s)/r)

x = np.linspace(1.0, 10000.0)
y = np.vectorize(k_func)(x)
axes.plot(x, y)

plt.show()
