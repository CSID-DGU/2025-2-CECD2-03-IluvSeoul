import matplotlib.pyplot as plt
import math

# Prepare data
n = list(range(0, 101))
nC4 = [math.comb(i, 4) if i >= 4 else 0 for i in n]
nC5 = [math.comb(i, 5) if i >= 5 else 0 for i in n]

# Plot
plt.figure()
plt.plot(n, nC4, label='nC4')
plt.plot(n, nC5, label='nC5')
plt.title('Binomial Coefficients nC4 and nC5 for n = 0 to 100')
plt.xlabel('n')
plt.ylabel('Value of nCm')
plt.legend()
plt.grid(True)
plt.show()
