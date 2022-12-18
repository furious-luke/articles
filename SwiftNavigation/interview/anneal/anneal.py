from itertools import product

import numpy as np

X_RANGE = (0, 10.0)
Y_RANGE = (0, 10.0)
EPSILON = 1.0
SIGMA = 1.0


def lennard_jones(x):
    e = 0
    for i in range(len(x)):
        for j in range(i + 1, len(x)):
            e += lennard_jones_ij(x[i], x[j])
    return e


def lennard_jones_ij(a, b):
    r = ((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** (0.5)
    sigma_r_6 = (SIGMA / r) ** 6
    return 4.0 * EPSILON * (sigma_r_6 ** 6 - sigma_r_6)


def main():
    x = np.array(
        list(
            product(
                np.arange(X_RANGE[0], X_RANGE[1], 1.0),
                np.arange(Y_RANGE[0], Y_RANGE[1], 1.0),
            ),
        ),
    )
    e = lennard_jones(x)
    breakpoint()
    print('h')


if __name__ == '__main__':
    main()
