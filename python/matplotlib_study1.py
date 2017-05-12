# -*- coding: utf-8 -*-
"""
Created on Fri May 12 14:01:21 2017

@author: user
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches


left, width = 0.25, 0.5
bottom, height = 0.25, 0.5
right = left + width
top = bottom + height

fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
p = patches.Rectangle(
        (left, bottom), width, height,
        fill = False, transform = ax.transAxes, clip_on = False
        )
ax.add_patch(p)

ax.text(left, bottom, 'left top',
        horizontalalignment = 'left',
        verticalalignment = 'top')
       # transform=ax.transAxes)
ax.text(left, bottom, 'left bottom',
        horizontalalignment = 'left',
        verticalalignment = 'bottom')
        # transform=ax.transAxes)
ax.text(right, top, 'right bottom',
        horizontalalignment = 'left',
        verticalalignment = 'bottom')
        # transform=ax.transAxes)
ax.text(right, top, 'right top',
        horizontalalignment = 'right',
        verticalalignment = 'top')
        # transform=ax.transAxes)
#plt.title(r'$\alpha>\beta$')
#plt.title(r'$\alpha_i>\beta_i$')
#plt.title(r'$\sum_{i=0}^\infty x_i$')
#plt.title(r'$\frac{3}{4} \binom{3}{4} \stackrel{3}{4}$')
#plt.title(r'$\frac{5-\frac{1}{x}}{4}$')
#plt.title(r'$\sqrt[3]{x}$')
plt.title(r'$s(t)=\mathcal{A}\mathrm{sin}(2\omega t)$')







