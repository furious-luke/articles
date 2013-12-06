#!/usr/bin/env python2.7

import math
from scipy.integrate import quad as integrate

if __name__ == '__main__':
    print integrate(lambda x: math.exp(-x)*(2.99792458e18/(x*x)), 1.0, 2.0)
    print integrate(lambda x: 2.0*(math.sin(10.0*x) + 1.0), 1.0, 2.0)
