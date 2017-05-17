# -*- coding: utf-8 -*-
"""
Created on Wed May 17 09:35:50 2017

@author: user
"""

import matplotlib.pyplot as plt
import numpy as np
import mpl_toolkits.mplot3d # 3D 图库
import matplotlib.image as mplimg
import pandas as pd

fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(np.random.rand(10))

def onclick(event):
    print('button = %d, x=%d, y=%d, xdata=%f, ydata=%f'%(
            event.button, event.x, event.y,event.xdata, event.ydata))

cid = fig.canvas.mpl_connect('button_press_event', onclick)

# fig.canvas.mpl_disconnect(cid)