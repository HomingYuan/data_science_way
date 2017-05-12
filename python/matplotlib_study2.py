# -*- coding: utf-8 -*-
"""
Created on Fri May 12 20:29:53 2017

@author: hongming
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib 
#fig = plt.figure()
#ax = fig.add_subplot(2, 1, 1)
#t = np.arange(0, 1.0, 0.01)
#s = np.sin(2 * np.pi * t)
#line = ax.plot(t, s, color='blue', lw=2)
#
##fig2 = plt.figure()
##ax2 = fig2.add_axes([0.15,0.1,0.7,0.3]) # (left,bottom,width,height)
#xtext = ax.set_xlabel('my xdata')
#ytext = ax.set_ylabel('my ydata')
##matplotlib.artist.getp(fig.patch)
#==============================================================================
# fig =plt.figure()
# ax1= fig.add_subplot(211) #创建图
# ax2 = fig.add_axes([0.1,0.1,0.7,0.3]) #创建图
# for ax in fig.axes:
#     ax.grid(True) # 添加网格
#==============================================================================

#==============================================================================
# fig = plt.figure()
# l1 = matplotlib.lines.Line2D([0,1],[0,1],transform =fig.transFigure,figure=fig)
# l2 = matplotlib.lines.Line2D([0,1],[1,0],transform =fig.transFigure,figure=fig)
# fig.lines.extend([l1,l2])
# fig.canvas.draw()
#=============================================================================
fig = plt.figure()
#==============================================================================
fig =plt.figure()
rect = fig.patch
rect.set_facecolor('lightgoldenrodyellow')
ax1 = fig.add_axes([0.1,0.3,0.4,0.4])
rect =ax1.patch
rect.set_facecolor('lightslategray')

for label in ax1.xaxis.get_ticklabels():# 获取坐标
    label.set_color('red')
    label.set_rotation(45)
    label.set_fontsize(16)

for line in ax1.yaxis.get_ticklines():
    line.set_color('green')
    line.set_markersize(25)
    line.set_markeredgewidth(3)
plt.savefig('exerise1.png')